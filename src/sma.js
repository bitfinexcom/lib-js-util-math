'use strict'

const { nBN, validateBN } = require('./bn')

/**
 * @param {any[]} values
 * @param {(a) => string|number} selector Optional selector lambda, if not provided item will be used as value
 * @returns {string}
 */
const SMA = (values, selector = null) => {
  // SMA = SUM(values[i]) / count(values)
  if (values.length === 0) throw new Error('ERR_NO_VALUES_PROVIDED')
  values.forEach(value => validateBN(selector ? selector(value) : value))

  return values.reduce(
    (sum, curr) => sum.plus(selector ? selector(curr) : curr),
    nBN(0)
  ).dividedBy(values.length).toString()
}

module.exports = SMA
