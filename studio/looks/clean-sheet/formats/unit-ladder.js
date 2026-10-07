// STUB: replace with the real "unit-ladder" format (see ../README.md "Writing a format").
import { h } from '../../../runtime/core.js'
import { durationOf } from '../lib.js'

export const css = `
.stub-unit-ladder { left: 84px; width: 856px; display: flex; align-items: center; justify-content: center;
  font: 400 64px/1.1 'Archivo Black', 'Inter Full', sans-serif; color: #6B7280; text-align: center; }
`

export default function (spec, ctx) {
  const P = ctx.page
  const el = h('div', { class: 'stub-unit-ladder', text: 'TODO unit-ladder' })
  el.style.top = P.top + 'px'
  el.style.height = (P.bottom - P.top) + 'px'
  P.layer.append(el)
  return { duration: durationOf(spec, 4), seek() {} }
}
