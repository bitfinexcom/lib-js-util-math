'use strict'

const chai = require('chai')
  .use(require('dirty-chai'))
const { expect } = chai
const { VWAP, EWVWAP } = require('../src/vwap')

module.exports = () => {
  describe('# vwap-tests', () => {
    it('VWAP - it should fail with non numeric values', () => {
      const values = [
        { price: '10161', volume: '1' },
        { price: 'a10261.235', volume: '1' }
      ]

      return expect(
        VWAP.bind(null, values)
      ).to.throw()
    })

    it('VWAP - it return 0 with no values', () => {
      return expect(VWAP([])).to.be.equal('0')
    })

    it('VWAP - it should match the expected value', () => {
      const values = [
        { price: '10161', volume: '1' },
        { price: '10261.235', volume: '1' },
        { price: '10324.2567', volume: '1' },
        { price: '10724', volume: '1' },
        { price: '10232', volume: '1' },
        { price: '10510.25847', volume: '1' },
        { price: '10261.826', volume: '1' }
      ]

      const res = VWAP(values)
      return expect(res).to.be.equal('10353.51088142857142857143')
    })

    it('EWVWAP - it should fail with non numeric values', () => {
      const values = [
        { price: '10161', weightType: 'bfx' },
        { price: 'a10261.235', weightType: 'bitstamp' },
        { price: '10261.826', weightType: 'kraken' }
      ]

      return expect(
        EWVWAP.bind(null, values, { bfx: 0.6, bitstamp: 0.2, kraken: 0.2 })
      ).to.throw()
    })

    it('EWVWAP - it should fail with NaN values', () => {
      const values = [
        { price: '10161', weightType: 'bfx' },
        { price: NaN, weightType: 'bitstamp' },
        { price: '10261.826', weightType: 'kraken' }
      ]

      return expect(
        EWVWAP.bind(null, values, { bfx: 0.6, bitstamp: 0.2, kraken: 0.2 })
      ).to.throw()
    })

    it('EWVWAP - it should fail with invalid config', () => {
      const values = [
        { price: '10161', weightType: 'bfx' },
        { price: '10261.235', weightType: 'bitstamp' },
        { price: '10261.826', weightType: 'kraken' }
      ]

      return expect(
        EWVWAP.bind(null, values, { bfx: 0.33, bitstamp: 0.33, kraken: 0.33 })
      ).to.throw('ERR_INVALID_WEIGHT_CONF')
    })

    it('EWVWAP - it should throw with wrong weightType in values', async () => {
      const values = [
        { price: '10161', weightType: 'bfx' },
        { price: '10232', weightType: 'bitstamp' },
        { price: '10510.25847', weightType: 'binance' },
        { price: '10261.826', weightType: 'kraken' }
      ]

      return expect(
        EWVWAP.bind(null, values, { bfx: 0.6, bitstamp: 0.2, kraken: 0.2 })
      ).to.throw('ERR_INVALID_WEIGHT_TYPE')
    })

    it('EWVWAP - it should throw with multiple weights of same type', async () => {
      const values = [
        { price: '10161', weightType: 'bfx' },
        { price: '10261.235', weightType: 'bfx' },
        { price: '10324.2567', weightType: 'bfx' },
        { price: '10724', weightType: 'bfx' },
        { price: '10510.25847', weightType: 'bitstamp' },
        { price: '10261.826', weightType: 'kraken' }
      ]

      return expect(
        EWVWAP.bind(null, values, { bfx: 0.6, bitstamp: 0.2, kraken: 0.2 })
      ).to.throw('ERR_DUP_WEIGHT_PRICES')
    })

    it('EWVWAP - it return 0 with no values', async () => {
      return expect(
        VWAP([], { bfx: 0.6, bitstamp: 0.2, kraken: 0.2 })
      ).to.be.equal('0')
    })

    it('EWVWAP - it should match the expected value', async () => {
      const values = [
        { price: '10161', weightType: 'bfx' },
        { price: '10510.25847', weightType: 'bitstamp' },
        { price: '10261.826', weightType: 'kraken' }
      ]

      const res = EWVWAP(values, { bfx: 0.6, bitstamp: 0.2, kraken: 0.2 })
      return expect(res).to.be.equal('10251.016894')
    })
  })
}
