'use strict'

const { expect } = require('chai')
const SMA = require('../src/sma')

module.exports = () => {
  describe('# sma-tests', () => {

    it('SMA - it should fail with non numeric values', () => {
      const values = ['10161', 'a10261.235']

      return expect(
        SMA.bind(null, values)
      ).to.throw()
    })

    it('SMA - it should fail with no values', () => {
      return expect(
        SMA.bind(null, [])
      ).to.throw('ERR_NO_VALUES_PROVIDED')
    })

    it('SMA - it should match the expected value', () => {
      const values = ['10161', '10261.235', '10324.2567', 10724, '10232', '10510.25847', '10261.826']

      const res = SMA(values)
      return expect(res).to.be.equal('10353.51088142857142857143')
    })

    it('SMA - it should work with selector', () => {
      const values = [
        { price: '10161', volume: '1' },
        { price: '10261.235', volume: '1' },
        { price: '10324.2567', volume: '1' },
        { price: 10724, volume: '1' },
        { price: '10232', volume: '1' },
        { price: '10510.25847', volume: '1' },
        { price: '10261.826', volume: '1' }
      ]

      const res = SMA(values, (a) => a.price)
      return expect(res).to.be.equal('10353.51088142857142857143')
    })

    it('SMA - it should work with negatives', () => {
      const values = [
        { price: '-10161', volume: '1' },
        { price: '-10261.235', volume: '1' },
        { price: '-10324.2567', volume: '1' },
        { price: '-10724', volume: '1' },
        { price: '-10232', volume: '1' },
        { price: '-10510.25847', volume: '1' },
        { price: '-10261.826', volume: '1' }
      ]

      const res = SMA(values, (a) => a.price)
      return expect(res).to.be.equal('-10353.51088142857142857143')
    })

  })
}
