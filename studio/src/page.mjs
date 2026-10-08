// Open a look kit in Chromium and mount a spec on it.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const LOOKS = path.join(ROOT, 'looks')
export const BRAND_DIR = path.join(ROOT, 'brand')

/**
 * Read a spec and attach the channel brand (spec.brand) from studio/brand/brand.json.
 * opts.brand: true (default) | false (no brand: the teaser renders exactly as it did before the brand layer)
 *           | { config, logo } (another brand.json, and/or a logo file overriding brand.logo; for tests and one-offs)
 * A spec can opt out with "brand": false. The brand never comes from the spec itself.
 */
export function readSpec(file, { brand = true } = {}) {
  const spec = JSON.parse(fs.readFileSync(file, 'utf8'))
  if (!spec.id) spec.id = path.basename(file, '.json')
  for (const k of ['look', 'format']) if (!spec[k]) throw new Error(`${file}: spec needs "${k}"`)
  spec.brand = spec.brand === false || brand === false ? null : loadBrand(typeof brand === 'object' ? brand : {})
  return spec
}

// ---------- brand ----------
export const BRAND_SHAPES = ['circle', 'rounded', 'square']
// logo files outside the studio folder (an absolute brand.logo, or --logo) are served under a hashed virtual path
const EXTERNAL = new Map()

/**
 * The resolved brand config, or null when there is none (no brand.json, or "enabled": false).
 * opts: { config: path to a brand.json (default studio/brand/brand.json), logo: a logo file overriding brand.logo }
 * Returns { name, handle, logoShape, logoBackground, logo, logoFile, logoUrl, cta: { line, kicker, dur } | null, enabled: true }.
 * logoUrl is null when the logo file does not exist: the look then keeps its own mark.
 */
export function loadBrand({ config = path.join(BRAND_DIR, 'brand.json'), logo } = {}) {
  config = path.resolve(config)
  if (!fs.existsSync(config)) return null
  let b
  try { b = JSON.parse(fs.readFileSync(config, 'utf8')) } catch (e) { throw new Error(`${path.relative(process.cwd(), config)}: ${e.message}`) }
  if (b.enabled === false) return null
  const where = path.relative(process.cwd(), config)
  const shape = b.logoShape || 'circle'
  if (!BRAND_SHAPES.includes(shape)) throw new Error(`${where}: logoShape "${shape}" must be one of ${BRAND_SHAPES.join(', ')}`)
  let cta = null
  if (b.cta) {
    const { line, kicker = '', dur = 2.5 } = b.cta
    if (!line || typeof line !== 'string') throw new Error(`${where}: cta.line is required`)
    if (!(dur >= 1.5 && dur <= 5)) throw new Error(`${where}: cta.dur ${dur} must be 1.5-5 s`)
    cta = { line, kicker: String(kicker || ''), dur: +dur }
  }
  const logoRef = logo || b.logo || ''
  const logoFile = logoRef ? path.resolve(logo ? process.cwd() : path.dirname(config), logoRef) : null
  const has = !!logoFile && fs.existsSync(logoFile) && fs.statSync(logoFile).isFile()
  return {
    enabled: true,
    name: String(b.name || ''),
    handle: String(b.handle || ''),
    cta,
    logo: logoRef || null,
    logoShape: shape,
    logoBackground: b.logoBackground || null,
    logoFile: has ? logoFile : null,
    logoUrl: has ? logoUrlFor(logoFile) : null,
  }
}

function logoUrlFor(file) {
  const rel = path.relative(ROOT, file)
  if (!rel.startsWith('..') && !path.isAbsolute(rel)) return ORIGIN + '/' + rel.split(path.sep).map(encodeURIComponent).join('/')
  const key = `/__brand/${crypto.createHash('sha1').update(file).digest('hex').slice(0, 10)}/${path.basename(file)}`
  EXTERNAL.set(key, file)
  return ORIGIN + key.split('/').map(encodeURIComponent).join('/')
}

/** one line for the console: what the brand layer will do */
export function brandSummary(brand) {
  if (!brand) return 'brand: off'
  const logo = brand.logoFile ? path.relative(process.cwd(), brand.logoFile) || brand.logoFile : `none (${brand.logo || 'no logo set'} not found: the look keeps its own mark)`
  return `brand: ${brand.cta ? `end card ${brand.cta.dur} s` : 'no end card'}, logo ${logo}${brand.logoFile ? ` (${brand.logoShape})` : ''}`
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
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.otf': 'font/otf', '.ttf': 'font/ttf' }
async function serveStudio(page) {
  await page.route(ORIGIN + '/**', route => {
    const rel = decodeURIComponent(new URL(route.request().url()).pathname)
    const ext = EXTERNAL.get(rel)
    const file = ext || path.join(ROOT, path.normalize(rel))
    if ((!ext && !file.startsWith(ROOT + path.sep)) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return route.fulfill({ status: 404, body: 'not found: ' + rel })
    return route.fulfill({ status: 200, path: file, contentType: MIME[path.extname(file)] || 'application/octet-stream' })
  })
}

/**
 * Load the kit page for spec.look, mount the spec, wait for fonts and images (the brand logo is decoded before
 * frame 0, like the fonts).
 * Returns { page, info: { duration, base, fps, sfx, brand }, errors }. duration includes the brand end card.
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
  // load every declared face before mount, so text measured inside mount (fitText, column widths) uses real metrics
  await page.evaluate(() => Promise.all([...document.fonts].map(f => f.load().catch(() => null))))
  await page.evaluate(() => document.fonts.ready)
  let info
  try {
    info = await page.evaluate(sp => window.STUDIO.mount(sp), spec)
  } catch (e) {
    throw new Error(`${spec.id}: mount failed: ${e.message}${errors.length ? '\n' + errors.join('\n') : ''}`)
  }
  // fonts requested by the mounted DOM finish loading before the first frame; so does every image (the brand logo)
  await page.evaluate(() => document.fonts.ready)
  // (img.decode() waits for the load, then for the decoded pixels: no frame ever shows a half-loaded logo)
  await page.evaluate(() => Promise.all([...document.images].map(i => i.decode().catch(() => null))))
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
