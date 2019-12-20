'use strict'

const bn = require('./bn.test')
const vwap = require('./vwap.test')
const stdDeviation = require('./std-deviation.test')
const sma = require('./sma.test')
const ema = require('./ema.test')

describe('*** Unit testing! ***', () => {
  bn()
  vwap()
  stdDeviation()
  sma()
  ema()
})
