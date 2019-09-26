'use strict'

const number = require('./src/number')
const bn = require('./src/bn')
const vwap = require('./src/vwap')
const stdDeviation = require('./src/std-deviation')

module.exports = {
  ...number,
  ...bn,
  ...vwap,
  ...stdDeviation
}
