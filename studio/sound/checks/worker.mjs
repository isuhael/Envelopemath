// Worker thread for the acceptance harness (run.mjs pool): one job at a time, the result posted back as a plain object.
import { parentPort } from 'node:worker_threads'
import { checkSpec, runUnits, specUnitsOnly } from './run.mjs'

parentPort.on('message', async job => {
  try {
    const r = job.type === 'units' ? await runUnits(job) : job.type === 'specUnits' ? await specUnitsOnly(job) : await checkSpec(job)
    parentPort.postMessage({ ok: true, r })
  } catch (e) {
    parentPort.postMessage({ ok: false, error: e.stack || String(e) })
  }
})
