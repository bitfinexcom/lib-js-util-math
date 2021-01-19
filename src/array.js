'use strict'

const { BN, nBN, validateBN } = require('./bn')

const ROUND_FLOOR = BN().ROUND_FLOOR
const ROUND_CEIL = BN().ROUND_CEIL

/**
 * @param {any[]} values
 * @param {(a) => string|number} selector Optional selector lambda, if not provided item will be used as value
 * @returns {string}
 */
const avg = (values, selector = null) => {
  // AVG = SUM(values[i]) / count(values)
  if (values.length === 0) throw new Error('ERR_NO_VALUES_PROVIDED')
  values.forEach(value => validateBN(selector ? selector(value) : value))

  return values.reduce(
    (sum, curr) => sum.plus(selector ? selector(curr) : curr),
    nBN(0)
  ).dividedBy(values.length).toString()
}

/**
 * @param {any[]} values
 * @param {(a) => string|number} selector Optional selector lambda, if not provided item will be used as value
 * @returns {string}
 */
const max = (values, selector = null) => {
  // AVG = SUM(values[i]) / count(values)
  if (values.length === 0) throw new Error('ERR_NO_VALUES_PROVIDED')
  values.forEach(value => validateBN(selector ? selector(value) : value))

  return values.reduce(
    (max, curr) => {
      const candidate = selector ? selector(curr) : curr
      return max.isLessThan(candidate) ? nBN(candidate) : max
    },
    nBN(selector ? selector(values[0]) : values[0])
  ).toString()
}

/**
 * @param {any[]} values
 * @param {(a) => string|number} selector Optional selector lambda, if not provided item will be used as value
 * @returns {string}
 */
const min = (values, selector = null) => {
  // AVG = SUM(values[i]) / count(values)
  if (values.length === 0) throw new Error('ERR_NO_VALUES_PROVIDED')
  values.forEach(value => validateBN(selector ? selector(value) : value))

  return values.reduce(
    (min, curr) => {
      const candidate = selector ? selector(curr) : curr
      return min.isGreaterThan(candidate) ? nBN(candidate) : min
    },
    nBN(selector ? selector(values[0]) : values[0])
  ).toString()
}

/**
 * @param {any[]} values
 * @param {(a) => string|number} selector Optional selector lambda, if not provided item will be used as value
 */
const median = (values, selector = null) => {
  if (values.length === 0) throw new Error('ERR_NO_VALUES_PROVIDED')

  const sorted = [...values].sort((a, b) => {
    const res = nBN(selector ? selector(a) : a)
      .minus(selector ? selector(b) : b)
      .lt(0)
    return res ? -1 : 1
  })
  const middleIndex = nBN(sorted.length).minus(1).div(2)

  if (middleIndex.isInteger()) {
    const value = sorted[middleIndex.toNumber()]
    return nBN(selector ? selector(value) : value)
  }

  const a = sorted[middleIndex.dp(0, ROUND_FLOOR).toNumber()]
  const b = sorted[middleIndex.dp(0, ROUND_CEIL).toNumber()]

  return nBN(selector ? selector(a) : a)
    .plus(selector ? selector(b) : b)
    .div(2)
}

/**
 * @param {any[]} values
 * @param {string|number} threshold
 * @param {(a) => string|number} selector Optional selector lambda, if not provided item will be used as value
 */
const filterMedian = (values, threshold = 1, selector = null) => {
  if (values.length === 0) throw new Error('ERR_NO_VALUES_PROVIDED')

  const mean = avg(values, selector)
  const med = median(values, selector)
  const diff = med.minus(mean).abs().div(med)

  if (diff.lte(threshold)) return values // no need to filter outliners

  const outliner = nBN(med.lt(mean) ? max(values, selector) : min(values, selector))
  const _values = values.filter(value => !outliner.eq(selector ? selector(value) : value))

  return filterMedian(_values, threshold, selector)
}

module.exports = {
  avg,
  max,
  min,
  median,
  filterMedian
}
