'use strict'

const bn = require('./bn.test')
const vwap = require('./vwap.test')
const stdDeviation = require('./std-deviation.test')

describe('*** Unit testing! ***', () => {
  bn()
  vwap()
  stdDeviation()
})
