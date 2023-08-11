'use strict'

const { BigNumber } = require('bignumber.js')

BigNumber.config({ EXPONENTIAL_AT: [-20, 40] })

const BN = () => BigNumber

/**
 * @param {string|number|BigNumber} value
 */
const nBN = (value) => {
  let bn
  try {
    bn = new BigNumber(value)
  } catch (err) {
    throw new Error('ERR_NUM_NAN')
  }

  if (bn.isNaN()) throw new Error('ERR_NUM_NAN')
  if (!bn.isFinite()) throw new Error('ERR_NUM_INFINITE')

  return bn
}

/**
 * @param {string|number|BigNumber} value
 * @param {object} [opts]
 * @param {boolean} [opts.allowNegative=true]
 * @param {boolean} [opts.allowZero=true]
 * @param {boolean} [opts.allowDecimals=true]
 */
const validateBN = (value, opts = { allowNegative: true, allowZero: true, allowDecimals: true }) => {
  const n = nBN(value)
  if (n.isNaN()) throw new Error('ERR_NOT_NUM')
  if (opts.allowZero === false && n.isZero()) throw new Error('ERR_NUM_ZERO')
  if (opts.allowNegative === false && n.isNegative()) throw new Error('ERR_NUM_NOT_POS')
  if (opts.allowDecimals === false && !n.isInteger()) throw new Error('ERR_NUM_WITH_PRECISION')
}

module.exports = {
  BN,
  nBN,
  validateBN
}
