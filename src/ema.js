'use strict'

const { nBN, validateBN } = require('./bn')

/**
 * @param {string|number} timePeriods
 */
const multiplier = (timePeriods) => {
  // 2 / (timePeriods + 1)
  return nBN(2).dividedBy(nBN(timePeriods).plus(1)).toString()
}

/**
 * @param {string|number} closePrice
 * @param {string|number} prevEMA
 * @param {string|number} multiplier
 */
const EMA = (closePrice, prevEMA, multiplier) => {
  // EMA = (close - prevEMA) x multiplier + prevEMA
  //     = close x multiplier + prevEMA x (1 - multiplier).
  const res = nBN(closePrice).minus(prevEMA).multipliedBy(multiplier).plus(prevEMA)
  validateBN(res)

  return res.toString()
}

module.exports = {
  EMA,
  multiplier
}
