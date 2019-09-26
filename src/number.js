'use strict'

const { Decimal } = require('decimal.js')

const DC = () => Decimal

/**
 * @param {string|number|Decimal} value
 */
const nDC = (value) => {
  if (Number.isNaN(value) || value === 'NaN') throw new Error('ERR_NUM_NAN')
  if (typeof value !== 'string' && typeof value !== 'number' &&
    !(value instanceof Decimal)) throw new Error('ERR_NUM_NAN')
  if (value === 'Infinity' || value === '-Infinity' ||
    value === Infinity || value === -Infinity) throw new Error('ERR_NUM_INFINITE')

  try {
    return new Decimal(value)
  } catch (err) {
    throw new Error('ERR_NUM_NAN')
  }
}

/**
 * @param {string|number|Decimal} value
 */
const validateDC = (value, opts = { allowNegative: true, allowZero: true, allowDecimals: true }) => {
  const n = nDC(value)
  if (opts.allowZero === false && n.isZero()) throw new Error('ERR_NUM_ZERO')
  if (opts.allowNegative === false && n.isNegative()) throw new Error('ERR_NUM_NOT_POS')
  if (opts.allowDecimals === false && /e|\./.test(n.toString())) throw new Error('ERR_NUM_WITH_PRECISION')
}

/**
 * @param {...(string|number|Decimal)} values
 * @returns {Decimal}
 */
const safeSumDC = (...values) => {
  if (values.length < 2) throw new Error('ERR_LEN_LESS_THAN_2')

  return values.reduce((acc, curr) => acc.plus(nDC(curr)), nDC(0))
}

/**
 * @param {...(string|number|Decimal)} values First elem is subtracted by others
 * @returns {Decimal}
 */
const safeSubDC = (...values) => {
  if (values.length < 2) throw new Error('ERR_LEN_LESS_THAN_2')

  return values.slice(1).reduce(
    (acc, curr) => acc.minus(nDC(curr)),
    nDC(values[0])
  )
}

/**
 * @param {...(string|number|Decimal)} values
 * @returns {Decimal}
 */
const safeMulDC = (...values) => {
  if (values.length < 2) throw new Error('ERR_LEN_LESS_THAN_2')

  return values.reduce(
    (acc, curr) => acc.mul(nDC(curr)),
    nDC(1)
  )
}

/**
 * @param {...(string|number|Decimal)} values First elem is divided by others
 * @returns {Decimal}
 */
const safeDivDC = (...values) => {
  if (values.length < 2) throw new Error('ERR_LEN_LESS_THAN_2')
  validateDC(values[0])

  const dividers = values.slice(1)
  dividers.forEach(value => validateDC(value, { allowZero: false }))

  return dividers.reduce(
    (acc, curr) => acc.div(nDC(curr)),
    nDC(values[0])
  )
}

const safeParseInt = (value) => {
  validateDC(value)
  let num
  if (/e/.test(value.toString())) {
    num = parseInt(nDC(value).toNumber(), 10)
  } else {
    num = parseInt(value, 10)
  }

  if (Number.isNaN(num)) throw new Error('ERR_NUM_NAN')
  return num
}

module.exports = {
  DC,
  nDC,
  validateDC,
  safeSumDC,
  safeSubDC,
  safeMulDC,
  safeDivDC,
  safeParseInt
}
