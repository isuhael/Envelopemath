// The master-WAV baseline (test/fixtures/sound-baseline.sha256): `sha256sum` format, "<hash>  <id>.wav" per line, so
// `cd <dir> && sha256sum -c <file>` works too. A changed hash means the audio changed: intended (report it, then rewrite
// the file with `node src/cli.mjs verify --write-baseline test/fixtures/sound-baseline.sha256`) or a regression.
import fs from 'node:fs'
import crypto from 'node:crypto'

export const sha256File = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')
/** -> { id: sha256 } */
export function readBaseline(file) {
  const out = {}
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = /^([0-9a-f]{64})\s+\*?(.+)\.wav\s*$/.exec(line.trim())
    if (m) out[m[2]] = m[1]
  }
  return out
}
export function writeBaseline(file, map) {
  fs.writeFileSync(file, Object.keys(map).sort().map(id => `${map[id]}  ${id}.wav`).join('\n') + '\n')
}
