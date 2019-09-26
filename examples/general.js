'use strict'

const { stdDeviation, nBN, VWAP } = require('..')

const data = [
  { price: nBN(10500), y: 'jan', volume: '1' },
  { price: nBN(10700), y: 'feb', volume: '0.33' },
  { price: nBN(11500), y: 'mar', volume: '2.13' },
  { price: nBN('12300'), y: 'apr', volume: '5.26' },
  { price: nBN(5000), y: 'may', volume: '0.77' },
  { price: nBN(5100), y: 'jun', volume: '1.52' }
]

const vwap = VWAP(data) // nDC is not supported here
console.log(vwap) // 10429.24613987284287011807

const dev = stdDeviation(data, a => a.price) // nDC is not supported here
console.log(dev.toFixed()) // 2980.16591633568094682823
