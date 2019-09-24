'use strict'

const bn = require('./src/bn')
const vwap = require('./src/vwap')
const stdDeviation = require('./src/std-deviation')

module.exports = {
  ...bn,
  ...vwap,
  ...stdDeviation
}
