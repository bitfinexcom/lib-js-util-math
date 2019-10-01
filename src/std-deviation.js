'use strict'

const { nBN, validateBN } = require('./bn')

/**
 * @param {any[]} values
 * @param {(a) => string|number} selector Optional selector lambda, if not provided item will be used as value
 */
const stdDeviation = (values, selector = null) => {
  if (values.length === 0) throw new Error('ERR_NO_VALUES_PROVIDED')
  values.forEach(value => validateBN(selector ? selector(value) : value))

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
const filterStdDeviated = (values, threshold = 1, selector = null) => {
  const dev = stdDeviation(values, selector)
  if (dev.isZero()) return values

  const mean = values.reduce(
    (sum, curr) => sum.plus(selector ? selector(curr) : curr),
    nBN(0)
  ).dividedBy(values.length)

  return values.filter(value =>
    zScore(selector ? selector(value) : value, mean, dev)
      .abs().isLessThanOrEqualTo(threshold))
}

/**
 * @param {string|number} value i-th value
 * @param {string|number} mean Average of values
 * @param {string|number} dev Standard deviation
 */
const zScore = (value, mean, dev) => {
  const calc = nBN(value).minus(mean).dividedBy(dev)
  return nBN(calc) // validates result
}

module.exports = {
  stdDeviation,
  filterStdDeviated,
  zScore
}
