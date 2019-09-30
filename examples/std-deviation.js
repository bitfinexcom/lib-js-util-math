'use strict'

const { stdDeviation, filterStdDeviated, nBN } = require('../')

const simple = [10500, 10700, 11500, '12300', 5000, 5100]
let dev = stdDeviation(simple)
let filtered = filterStdDeviated(simple, 1)

console.log(dev.toFixed()) // 2980.16591633568094682823
console.log(filtered) // [ 10500, 10700, 11500 ]

const complex = [
  { x: nBN(10500), y: 'jan' },
  { x: nBN(10700), y: 'feb' },
  { x: nBN(11500), y: 'mar' },
  { x: nBN('12300'), y: 'apr' },
  { x: nBN(5000), y: 'may' },
  { x: nBN(5100), y: 'jun' }
]

dev = stdDeviation(complex, a => a.x)
filtered = filterStdDeviated(complex, 1, a => a.x)
console.log(dev.toFixed()) // 2980.16591633568094682823
console.log(filtered.map(a => a.x.toFixed())) // [ '10500', '10700', '11500' ]
