'use strict'

const { VWAP, EWVWAP } = require('../src/vwap')

const values = [
  { price: '10161', volume: '1', weightType: 'bfx' },
  { price: '10261.235', volume: '0.33', weightType: 'kraken' },
  { price: '10324.2567', volume: '2.13', weightType: 'kraken' },
  { price: '10724', volume: '5.26', weightType: 'bitstamp' },
  { price: '10232', volume: '0.77', weightType: 'kraken' },
  { price: '10510.25847', volume: '1.52', weightType: 'bfx' },
  { price: '10261.826', volume: '13.22', weightType: 'bfx' }
]

const vwap = VWAP(values)
console.log(vwap) // prints 10378.1133683615352868345

const evwap = EWVWAP(values, { bfx: 0.6, bitstamp: 0.2, kraken: 0.2 })
console.log(evwap) // prints 10333.90347
