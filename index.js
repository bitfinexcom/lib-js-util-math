'use strict'

const bn = require('./src/bn')
const vwap = require('./src/vwap')
const stdDeviation = require('./src/std-deviation')
const sma = require('./src/sma')
const ema = require('./src/ema')

module.exports = {
  ...bn,
  ...vwap,
  ...stdDeviation,
  EMA: ema.EMA,
  emaMultiplier: ema.multiplier,
  SMA: sma
}
