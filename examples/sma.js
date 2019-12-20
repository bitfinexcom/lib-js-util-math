'use strict'

const { SMA, nBN } = require('../')

const values = [
  { price: '10161', volume: '1' },
  { price: '10261.235', volume: '0.33' },
  { price: '10324.2567', volume: '2.13' },
  { price: '10724', volume: '5.26' },
  { price: 10232, volume: '0.77' },
  { price: nBN('10510.25847'), volume: '1.52' },
  { price: '10261.826', volume: '13.22' }
]

const sma = SMA(values, (a) => a.price)
console.log(sma) // prints 10353.51088142857142857143

const primitiveSMA = SMA([11, 12, 13, 14, 15])
console.log(primitiveSMA) // prints 13
