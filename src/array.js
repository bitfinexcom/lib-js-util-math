'use strict'

const { nBN, validateBN } = require('./bn')

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

module.exports = {
  avg,
  max,
  min
}
