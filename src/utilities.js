import Vue from 'vue'
import slugify from 'slugify'
import truncate from 'truncate-html'

Vue.prototype.$slugify = (...args) => slugify(...args)
Vue.prototype.$truncate = (...args) => truncate(...args)

Vue.prototype.$fraction = (val) => {
  let ext = null
  let frc = parseFloat(val)
  if (Number.isInteger(frc)) {
    return frc
  }
  const gcd = (a, b) => {
    if (b < 0.0000001) return a
    return gcd(b, Math.floor(a % b))
  }
  if (frc > 1) {
    ext = Math.floor(frc)
    frc -= ext
  }
  const len = frc.toString().length - 2
  let den = 10 ** len
  let num = frc * den
  const div = gcd(num, den)
  num /= div
  den /= div
  return [ext, [Math.floor(num), Math.floor(den)].join('/')].join(' ')
}
