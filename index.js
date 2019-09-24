'use strict'

const bn = require('./src/bn')
const vwap = require('./src/vwap')

module.exports = {
  ...bn,
  ...vwap
}
