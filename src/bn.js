'use strict'

const { BigNumber } = require('bignumber.js')

BigNumber.config({ EXPONENTIAL_AT: [-20, 40] })
BigNumber.DEBUG = true // Use true to throw on NAN initialization

const BN = () => BigNumber

/**
 * @param {string|number|BigNumber} value
 */
const nBN = (value) => {
  if (Number.isNaN(value) || value === 'NaN') throw new Error('ERR_NUM_NAN')
  if (typeof value !== 'string' && typeof value !== 'number' &&
    !(value instanceof BigNumber)) throw new Error('ERR_NUM_NAN')
  if (value === 'Infinity' || value === '-Infinity' ||
    value === Infinity || value === -Infinity) throw new Error('ERR_NUM_INFINITE')

  if ((value instanceof BigNumber) &&
    (value.isNaN() || !value.isFinite())) {
    throw new Error('ERR_NUM_NAN')
  }

  try {
    return new BigNumber(value)
  } catch (err) {
    throw new Error('ERR_NUM_NAN')
  }
}

/**
 * @param {string|number|BigNumber} value
 */
const validateBN = (value, opts = { allowNegative: true, allowZero: true, allowDecimals: true }) => {
  const n = nBN(value)
  if (opts.allowZero === false && n.isZero()) throw new Error('ERR_NUM_ZERO')
  if (opts.allowNegative === false && n.isNegative()) throw new Error('ERR_NUM_NOT_POS')
  if (opts.allowDecimals === false && /e|\./.test(n.toString())) throw new Error('ERR_NUM_WITH_PRECISION')
}

module.exports = {
  BN,
  nBN,
  validateBN
}
