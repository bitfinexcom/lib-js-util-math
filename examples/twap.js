'use strict'

const { typicalPrice, kline, TWAP } = require('..')

const primitiveData = ['10002', '10001', '10000']
const complexData = [
  { price: '10003', ts: 1578499254526 },
  { price: '10001', ts: 1578499255526 },
  { price: '10000', ts: 1578499256526 }
]

console.log(kline(primitiveData)) // { close: '10002', high: '10002', low: '10000', open: '10000' }
console.log(kline(complexData, (a) => a.price)) // { close: '10003', high: '10003', low: '10000', open: '10000' }

console.log(typicalPrice(primitiveData)) // 10001
console.log(typicalPrice(complexData, (a) => a.price)) // 10001.5

const now = Date.now()
const prices = [
  { price: '10001', ts: now },
  { price: '10000', ts: now - 1000 },
  { price: '10001', ts: now - 2000 },
  { price: '10002', ts: now - 3000 },
  { price: '10003', ts: now - 9000 },
  { price: '10000', ts: now - 4000 },
  { price: '10003', ts: now - 6000 },
  { price: '10001', ts: now - 5000 },
  { price: '10003', ts: now - 8000 }
]
const twap = TWAP(prices, 3000, (a) => a.ts, (a) => a.price)
console.log(twap) // 10001.625
