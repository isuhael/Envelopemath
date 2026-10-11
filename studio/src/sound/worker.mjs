// Worker thread for batch renders (batch.mjs runPool): one job at a time, posted back as a plain object.
import { parentPort } from 'node:worker_threads'
import { runJob } from './batch.mjs'

parentPort.on('message', async job => {
  try {
    const r = await runJob(job)
    parentPort.postMessage(r)
  } catch (e) {
    parentPort.postMessage({ id: job.rec && job.rec.id, error: e.stack || String(e) })
  }
})
