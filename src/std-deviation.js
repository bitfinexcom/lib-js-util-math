'use strict'

const { nBN } = require('./bn')

/**
 * @param {any[]} values
 * @param {(a) => string|number} selector Optional selector lambda, if not provided item will be used as value
 * @returns {BigNumber}
 */
const stdDeviation = (values, selector = null) => {
  const avg = values.reduce(
    (sum, curr) => sum.plus(selector ? selector(curr) : curr),
    nBN(0)
  ).dividedBy(values.length)

  const squareDiffs = values.map(a => nBN(selector ? selector(a) : a).minus(avg))
    .map(a => a.pow(2))
  const avgSquareDiff = squareDiffs.reduce(
    (sum, curr) => sum.plus(curr),
    nBN(0)
  ).dividedBy(squareDiffs.length)
  return avgSquareDiff.sqrt()
}

/**
 * @param {any[]} values
 * @param {string|number} threshold
 * @param {(a) => string|number} selector Optional selector lambda, if not provided item will be used as value
 */
const filterStdDeviated = (values, threshold, selector) => {
  const dev = stdDeviation(values, selector)
  if (dev.isLessThanOrEqualTo(threshold)) return values

  const devVector = {}
  for (let i = 0; i < values.length; i++) {
    const a = selector ? selector(values[i]) : values[i]
    for (let j = 0; j < values.length; j++) {
      if (i === j) continue
      const b = selector ? selector(values[j]) : values[j]
      const diff = nBN(a).minus(b).abs()
      devVector[i] = (devVector[i] || 0) + (diff.isGreaterThan(dev) ? 1 : 0)
    }
  }

  let max = 0
  for (const key in devVector) {
    if (devVector[key] > max) max = devVector[key]
  }

  return max === 0 ? values
    : values.filter((p, i) => devVector[i] !== max)
}

module.exports = {
  stdDeviation,
  filterStdDeviated
}
