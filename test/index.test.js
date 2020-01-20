'use strict'

const bn = require('./bn.test')
const vwap = require('./vwap.test')
const stdDeviation = require('./std-deviation.test')
const array = require('./array.test')
const ema = require('./ema.test')
const twap = require('./twap.test')
const impactMidPriceTests = require('./impact-mid-price.test')

describe('*** Unit testing! ***', () => {
  bn()
  vwap()
  stdDeviation()
  array()
  ema()
  twap()
  impactMidPriceTests()
})
