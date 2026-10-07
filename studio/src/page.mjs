// Open a look kit in Chromium and mount a spec on it.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const LOOKS = path.join(ROOT, 'looks')

export function readSpec(file) {
  const spec = JSON.parse(fs.readFileSync(file, 'utf8'))
  if (!spec.id) spec.id = path.basename(file, '.json')
  for (const k of ['look', 'format']) if (!spec[k]) throw new Error(`${file}: spec needs "${k}"`)
  return spec
}

export function lookPage(look) {
  const p = path.join(LOOKS, look, 'index.html')
  if (!fs.existsSync(p)) throw new Error(`no look kit at ${path.relative(ROOT, p)}`)
  return p
}

export async function launch() {
  return chromium.launch({ args: ['--font-render-hinting=none', '--disable-lcd-text', '--force-color-profile=srgb'] })
}

// Kit pages use ES modules, which Chromium refuses over file://. Every request to this fake origin is
// answered from the studio folder instead, so no server is needed and nothing leaves the machine.
export const ORIGIN = 'http://studio.local'
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.otf': 'font/otf', '.ttf': 'font/ttf' }
async function serveStudio(page) {
  await page.route(ORIGIN + '/**', route => {
    const rel = decodeURIComponent(new URL(route.request().url()).pathname)
    const file = path.join(ROOT, path.normalize(rel))
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return route.fulfill({ status: 404, body: 'not found: ' + rel })
    return route.fulfill({ status: 200, path: file, contentType: MIME[path.extname(file)] || 'application/octet-stream' })
  })
}

/**
 * Load the kit page for spec.look, mount the spec, wait for fonts.
 * Returns { page, info: { duration, fps, sfx }, errors }.
 */
export async function openSpec(browser, spec) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 })
  const errors = []
  page.on('pageerror', e => errors.push(String(e && e.stack || e)))
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
  page.on('requestfailed', r => errors.push(`request failed: ${r.url()}`))
  await serveStudio(page)
  lookPage(spec.look)
  await page.goto(`${ORIGIN}/looks/${spec.look}/index.html`, { waitUntil: 'load' })
  await page.waitForFunction(() => window.STUDIO, null, { timeout: 15000 }).catch(() => {
    throw new Error(`look "${spec.look}" never defined window.STUDIO${errors.length ? ':\n' + errors.join('\n') : ''}`)
  })
  await page.evaluate(() => document.fonts.ready)
  let info
  try {
    info = await page.evaluate(sp => window.STUDIO.mount(sp), spec)
  } catch (e) {
    throw new Error(`${spec.id}: mount failed: ${e.message}${errors.length ? '\n' + errors.join('\n') : ''}`)
  }
  // fonts requested by the mounted DOM finish loading before the first frame
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(() => window.STUDIO.seek(0))
  return { page, info, errors }
}

export async function seek(page, t) {
  await page.evaluate(x => window.STUDIO.seek(x), t)
}

/**
 * Frame grabber. CDP's captureScreenshot with optimizeForSpeed is ~1.5x faster than page.screenshot;
 * jpeg at q 95 is invisible after x264. Returns (async) => Buffer.
 */
export async function grabber(page, { format = 'jpeg', quality = 95 } = {}) {
  const cdp = await page.context().newCDPSession(page)
  return async () => {
    const r = await cdp.send('Page.captureScreenshot', { format, ...(format === 'jpeg' ? { quality } : {}), optimizeForSpeed: true, captureBeyondViewport: false })
    return Buffer.from(r.data, 'base64')
  }
}
