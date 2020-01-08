'use strict'

const { expect } = require('chai')
const { nBN } = require('../src/bn')
const { groupBySize, kline, typicalPrice, TWAP } = require('../src/twap')

module.exports = () => {
  it('groupBySize - it should fail with empty array', () => {
    return expect(
      groupBySize.bind(null, [], 100)
    ).to.throw()
  })

  it('groupBySize - it should fail with interval <= 0', () => {
    return expect(
      groupBySize.bind(null, [123], 0)
    ).to.throw()
  })

  it('groupBySize - it should fail with mixed positive/negative values', () => {
    return expect(
      groupBySize.bind(null, [-123, 123], 100)
    ).to.throw()
  })

  it('groupBySize - it should fail with invalid values', () => {
    return expect(
      groupBySize.bind(null, ['-a123', 123], 100)
    ).to.throw()
  })

  it('groupBySize - it should work with just one item', () => {
    const res = groupBySize(['123'], 300)
    expect(res).to.be.an('array')
    expect(res.length).to.be.equal(1)
    expect(res[0]).to.be.an('array')
    expect(res[0].length).to.be.equal(1)
    return expect(res[0][0]).to.be.equal('123')
  })

  it('groupBySize - it should work with primitive types', () => {
    const res = groupBySize([100, 200, 300, 400, 500, 600, 1000, 1100, 1200], 300)
    expect(res).to.be.an('array')
    expect(res.length).to.be.equal(4)
    const expected = [[100, 200, 300], [400, 500, 600], [], [1000, 1100, 1200]]
    res.forEach((g, i) => {
      const e = expected[i]
      expect(g.length).to.be.equal(e.length)
      g.forEach((item, j) => {
        expect(item).to.be.equal(e[j])
      })
    })
  })

  it('groupBySize - it should work with negative prices', () => {
    const res = groupBySize([-100, -200, -300, -400, -500, -600, -1000, -1100, -1200], 300)
    expect(res).to.be.an('array')
    expect(res.length).to.be.equal(4)
    const expected = [[-1200, -1100, -1000], [], [-600, -500, -400], [-300, -200, -100]]
    res.forEach((g, i) => {
      const e = expected[i]
      expect(g.length).to.be.equal(e.length)
      g.forEach((item, j) => {
        expect(item).to.be.equal(e[j])
      })
    })
  })

  it('groupBySize - it should work with complex types', () => {
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
    expect(res.length).to.be.equal(2)
    res.forEach((g, i) => {
      const e = expected[i]
      expect(g.length).to.be.equal(e.length)
      g.forEach((item, j) => {
        expect(item.ts).to.be.equal(e[j].ts)
      })
    })
  })

  describe('# twap-tests', () => {
    it('kline - it should fail with empty array', () => {
      return expect(kline.bind(null, [])).to.throw()
    })

    it('kline - it should fail with invalid numbers', () => {
      expect(kline.bind(null, ['abc123', 123, 333, 44])).to.throw()
      return expect(kline.bind(null, [123, 123, 'aaa333', 44])).to.throw()
    })

    it('kline - it should return expected value', () => {
      const prices = ['10001', 10002, nBN(10003)]
      const res = kline(prices)

      expect(res.close).to.be.equal('10001')
      expect(res.high).to.be.equal('10003')
      expect(res.low).to.be.equal('10001')
      expect(res.open).to.be.equal('10003')
    })

    it('kline - it should work with complex types', () => {
      const now = Date.now()
      const prices = [
        { price: 10001, ts: now },
        { price: 10002, ts: now - 1000 },
        { price: 10003, ts: now - 2000 }
      ]
      const res = kline(prices, (a) => a.price)

      expect(res.close).to.be.equal('10001')
      expect(res.high).to.be.equal('10003')
      expect(res.low).to.be.equal('10001')
      expect(res.open).to.be.equal('10003')
    })

    it('typicalPrice - it should fail with empty array', () => {
      return expect(typicalPrice.bind(null, [])).to.throw()
    })

    it('typicalPrice - it should fail with invalid numbers', () => {
      expect(typicalPrice.bind(null, ['abc123', 123, 333, 44])).to.throw()
      return expect(typicalPrice.bind(null, [123, 123, 'aaa333', 44])).to.throw()
    })

    it('typicalPrice - it should return expected value', () => {
      const prices = ['10001', 10002, nBN(10003)]
      const res = typicalPrice(prices)
      return expect(res).to.be.equal('10002')
    })

    it('typicalPrice - it should work with complex types', () => {
      const now = Date.now()
      const prices = [
        { price: 10001, ts: now },
        { price: 10002, ts: now - 1000 },
        { price: 10003, ts: now - 2000 }
      ]
      const res = typicalPrice(prices, (a) => a.price)
      return expect(res).to.be.equal('10002')
    })

    it('twap - it should fail with empty array', () => {
      return expect(TWAP.bind(null, [], 3000, (a) => a.ts, (a) => a.price)).to.throw()
    })

    it('twap - it should fail with interval <= 0', () => {
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
      return expect(TWAP.bind(null, prices, -3000, (a) => a.ts, (a) => a.price)).to.throw()
    })

    it('twap - it should fail with invalid numbers', () => {
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
      return expect(TWAP.bind(null, prices, 3000, (a) => a.ts, (a) => a.price)).to.throw()
    })

    it('twap - it should return expected value', () => {
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
      return expect(res).to.be.equal('10001.625')
    })

    it('twap - it should filter empty slots', () => {
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
      return expect(res).to.be.equal('10001.25')
    })
  })
}
