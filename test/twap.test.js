'use strict'

const test = require('brittle')
const { nBN } = require('../src/bn')
const { groupBySize, kline, typicalPrice, TWAP } = require('../src/twap')

test('groupBySize - it should fail with empty array', (t) => {
  t.exception.all(
    groupBySize.bind(null, [], 100)
  )
})

test('groupBySize - it should fail with interval <= 0', (t) => {
  t.exception.all(
    groupBySize.bind(null, [123], 0)
  )
})

test('groupBySize - it should fail with mixed positive/negative values', (t) => {
  t.exception.all(
    groupBySize.bind(null, [-123, 123], 100)
  )
})

test('groupBySize - it should fail with invalid values', (t) => {
  t.exception.all(
    groupBySize.bind(null, ['-a123', 123], 100)
  )
})

test('groupBySize - it should work with just one item', (t) => {
  const res = groupBySize(['123'], 300)
  t.ok(Array.isArray(res))
  t.is(res.length, 1)
  t.ok(Array.isArray(res[0]))
  t.is(res[0].length, 1)
  t.is(res[0][0], '123')
})

test('groupBySize - it should work with primitive types', (t) => {
  const res = groupBySize([100, 200, 300, 400, 500, 600, 1000, 1100, 1200], 300)
  t.ok(Array.isArray(res))
  t.is(res.length, 4)
  const expected = [[100, 200, 300], [400, 500, 600], [], [1000, 1100, 1200]]
  res.forEach((g, i) => {
    const e = expected[i]
    t.is(g.length, e.length)
    g.forEach((item, j) => {
      t.is(item, e[j])
    })
  })
})

test('groupBySize - it should work with negative prices', (t) => {
  const res = groupBySize([-100, -200, -300, -400, -500, -600, -1000, -1100, -1200], 300)
  t.ok(Array.isArray(res))
  t.is(res.length, 4)
  const expected = [[-1200, -1100, -1000], [], [-600, -500, -400], [-300, -200, -100]]
  res.forEach((g, i) => {
    const e = expected[i]
    t.is(g.length, e.length)
    g.forEach((item, j) => {
      t.is(item, e[j])
    })
  })
})

test('groupBySize - it should work with complex types', (t) => {
  const now = Date.now()
  const prices = [
    { price: '10003', ts: now - 9000 },
    { price: '10000', ts: now - 4000 },
    { price: '10003', ts: now - 6000 },
    { price: '10001', ts: now - 5000 },
    { price: '10003', ts: now - 8000 }
  ]
  const expected = [
    [{ price: '10003', ts: now - 9000 }, { price: '10003', ts: now - 8000 }],
    [{ price: '10003', ts: now - 6000 }, { price: '10001', ts: now - 5000 }, { price: '10000', ts: now - 4000 }]
  ]

  const res = groupBySize(prices, 3000, (a) => a.ts)
  t.is(res.length, 2)
  res.forEach((g, i) => {
    const e = expected[i]
    t.is(g.length, e.length)
    g.forEach((item, j) => {
      t.is(item.ts, e[j].ts)
    })
  })
})

test('kline - it should fail with empty array', (t) => {
  t.exception.all(kline.bind(null, []))
})

test('kline - it should fail with invalid numbers', (t) => {
  t.exception.all(kline.bind(null, ['abc123', 123, 333, 44]))
  t.exception.all(kline.bind(null, [123, 123, 'aaa333', 44]))
})

test('kline - it should return expected value', (t) => {
  const prices = ['10001', 10002, nBN(10003)]
  const res = kline(prices)

  t.is(res.open, '10001')
  t.is(res.high, '10003')
  t.is(res.low, '10001')
  t.is(res.close, '10003')
})

test('kline - it should work with complex types', (t) => {
  const now = Date.now()
  const prices = [
    { price: 10001, ts: now - 2000 },
    { price: 10002, ts: now - 1000 },
    { price: 10003, ts: now }
  ]
  const res = kline(prices, (a) => a.price)

  t.is(res.open, '10001')
  t.is(res.high, '10003')
  t.is(res.low, '10001')
  t.is(res.close, '10003')
})

test('typicalPrice - it should fail with empty array', (t) => {
  t.exception.all(typicalPrice.bind(null, []))
})

test('typicalPrice - it should fail with invalid numbers', (t) => {
  t.exception.all(typicalPrice.bind(null, ['abc123', 123, 333, 44]))
  t.exception.all(typicalPrice.bind(null, [123, 123, 'aaa333', 44]))
})

test('typicalPrice - it should return expected value', (t) => {
  const prices = ['10001', 10002, nBN(10003)]
  const res = typicalPrice(prices)
  t.is(res, '10002')
})

test('typicalPrice - it should work with complex types', (t) => {
  const now = Date.now()
  const prices = [
    { price: 10001, ts: now },
    { price: 10002, ts: now - 1000 },
    { price: 10003, ts: now - 2000 }
  ]
  const res = typicalPrice(prices, (a) => a.price)
  t.is(res, '10002')
})

test('twap - it should fail with empty array', (t) => {
  t.exception.all(TWAP.bind(null, [], 3000, (a) => a.ts, (a) => a.price))
})

test('twap - it should fail with interval <= 0', (t) => {
  const now = Date.now()
  const prices = [
    { price: '10001', ts: now },
    { price: '10000', ts: now - 1000 },
    { price: '10001', ts: now - 2000 },
    { price: 10002, ts: now - 3000 },
    { price: '10003', ts: now - 9000 },
    { price: nBN('10000'), ts: now - 4000 },
    { price: '10003', ts: now - 6000 },
    { price: '10001', ts: now - 5000 },
    { price: '10003', ts: now - 8000 }
  ]
  t.exception.all(TWAP.bind(null, prices, -3000, (a) => a.ts, (a) => a.price))
})

test('twap - it should fail with invalid numbers', (t) => {
  const now = Date.now()
  const prices = [
    { price: '10001', ts: now },
    { price: '10000', ts: now - 1000 },
    { price: '10001', ts: now - 2000 },
    { price: 10002, ts: now - 3000 },
    { price: '10003', ts: now - 9000 },
    { price: nBN('10000'), ts: now - 4000 },
    { price: 'ab10003', ts: now - 6000 },
    { price: '10001', ts: now - 5000 },
    { price: '10003', ts: now - 8000 }
  ]
  t.exception.all(TWAP.bind(null, prices, 3000, (a) => a.ts, (a) => a.price))
})

test('twap - it should return expected value', (t) => {
  const now = Date.now()
  const prices = [
    { price: '10001', ts: now },
    { price: '10000', ts: now - 1000 },
    { price: '10001', ts: now - 2000 },
    { price: 10002, ts: now - 3000 },
    { price: '10003', ts: now - 9000 },
    { price: nBN('10000'), ts: now - 4000 },
    { price: '10003', ts: now - 6000 },
    { price: '10001', ts: now - 5000 },
    { price: '10003', ts: now - 8000 }
  ]
  const res = TWAP(prices, 3000, (a) => a.ts, (a) => a.price)
  t.is(res, '10001.625')
})

test('twap - it should filter empty slots', (t) => {
  const now = Date.now()
  const prices = [
    { price: '10001', ts: now },
    { price: '10000', ts: now - 1000 },
    { price: '10001', ts: now - 2000 },
    { price: 10002, ts: now - 3000 },
    { price: '10003', ts: now - 12000 },
    { price: nBN('10000'), ts: now - 4000 }
  ]
  const res = TWAP(prices, 3000, (a) => a.ts, (a) => a.price)
  t.is(res, '10001.25')
})
