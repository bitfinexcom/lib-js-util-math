'use strict'

const { avg, max, min, nBN } = require('..')

const primiteveArray = [13, 15, 11, 12, 14]

const complexArray = [
  { price: '10261.235', volume: '0.33' },
  { price: '10324.2567', volume: '2.13' },
  { price: '10724', volume: '5.26' },
  { price: '10161', volume: '1' },
  { price: 10232, volume: '0.77' },
  { price: nBN('10510.25847'), volume: '1.52' },
  { price: '10261.826', volume: '13.22' }
]

const primitiveAvg = avg(primiteveArray)
console.log(primitiveAvg) // prints 13
const complexAvg = avg(complexArray, (a) => a.price)
console.log(complexAvg) // prints 10353.51088142857142857143

const primitiveMin = min(primiteveArray)
console.log(primitiveMin) // prints 11
const complexMin = min(complexArray, (a) => a.price)
console.log(complexMin) // 10161

const primitiveMax = max(primiteveArray)
console.log(primitiveMax) // prints 15
const complexMax = max(complexArray, (a) => a.price)
console.log(complexMax) // 10724
