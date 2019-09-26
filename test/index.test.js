'use strict'

const number = require('./number.test')
const bn = require('./bn.test')
const vwap = require('./vwap.test')
const stdDeviation = require('./std-deviation.test')

describe('*** Unit testing! ***', () => {
  number()
  bn()
  vwap()
  stdDeviation()
})
