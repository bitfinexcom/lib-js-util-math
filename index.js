'use strict'

const bn = require('./src/bn')
const vwap = require('./src/vwap')
const stdDeviation = require('./src/std-deviation')
const array = require('./src/array')
const ema = require('./src/ema')
const twap = require('./src/twap')
const impactMidPrice = require('./src/impact-mid-price')

module.exports = {
  ...bn,
  ...vwap,
  ...stdDeviation,
  EMA: ema.EMA,
  emaMultiplier: ema.multiplier,
  SMA: array.avg,
  ...array,
  TWAP: twap.TWAP,
  typicalPrice: twap.typicalPrice,
  kline: twap.kline,
  impactMidPrice
}
