'use strict'

const { BigNumber } = require('bignumber.js')

BigNumber.config({ EXPONENTIAL_AT: [-20, 40] })
BigNumber.DEBUG = true // Use true to throw on NAN initialization

const BN = () => BigNumber

/**
 * @param {string|number|BigNumber} value
 */
const nBN = (value) => new BigNumber(value)

/**
 * @param {string|number|BigNumber} value
 */
const validateBN = (value, opts = { allowNegative: true, allowZero: true, allowDecimals: true }) => {
  /** @type {BigNumber} */
  let n
  try {
    n = nBN(value)
  } catch (err) {
    throw new Error('ERR_NUM_NAN')
  }

  if (opts.allowZero === false && n.isZero()) throw new Error('ERR_NUM_ZERO')
  if (opts.allowNegative === false && n.isNegative()) throw new Error('ERR_NUM_NOT_POS')
  if (opts.allowDecimals === false && /e|\./.test(n.toString())) throw new Error('ERR_NUM_WITH_PRECISION')
}

module.exports = {
  BN,
  nBN,
  validateBN
}
