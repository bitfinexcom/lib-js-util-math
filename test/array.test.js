'use strict'

const chai = require('chai')
  .use(require('dirty-chai'))
const { expect } = chai
const { nBN } = require('../src/bn')
const { avg, max, min, median, filterMedian } = require('../src/array')

module.exports = () => {
  describe('# array-tests', () => {
    it('avg - it should fail with non numeric values', () => {
      const values = ['10161', 'a10261.235']

      return expect(
        avg.bind(null, values)
      ).to.throw()
    })

    it('avg - it should fail with no values', () => {
      return expect(
        avg.bind(null, [])
      ).to.throw('ERR_NO_VALUES_PROVIDED')
    })

    it('avg - it should match the expected value', () => {
      const values = ['10161', '10261.235', '10324.2567', 10724, '10232', '10510.25847', '10261.826']

      const res = avg(values)
      return expect(res).to.be.equal('10353.51088142857142857143')
    })

    it('avg - it should work with just one element', () => {
      const values = ['10161']

      const res = avg(values)
      return expect(res).to.be.equal('10161')
    })

    it('avg - it should work with selector', () => {
      const values = [
        { price: '10161', volume: '1' },
        { price: '10261.235', volume: '1' },
        { price: '10324.2567', volume: '1' },
        { price: 10724, volume: '1' },
        { price: nBN('10232'), volume: '1' },
        { price: '10510.25847', volume: '1' },
        { price: '10261.826', volume: '1' }
      ]

      const res = avg(values, (a) => a.price)
      return expect(res).to.be.equal('10353.51088142857142857143')
    })

    it('avg - it should work with negatives', () => {
      const values = [
        { price: '-10161', volume: '1' },
        { price: '-10261.235', volume: '1' },
        { price: '-10324.2567', volume: '1' },
        { price: '-10724', volume: '1' },
        { price: '-10232', volume: '1' },
        { price: '-10510.25847', volume: '1' },
        { price: '-10261.826', volume: '1' }
      ]

      const res = avg(values, (a) => a.price)
      return expect(res).to.be.equal('-10353.51088142857142857143')
    })

    it('avg - it should fail with non numeric values', () => {
      const values = ['10161', 'a10261.235']

      return expect(
        avg.bind(null, values)
      ).to.throw()
    })

    it('max - it should fail with no values', () => {
      return expect(
        max.bind(null, [])
      ).to.throw('ERR_NO_VALUES_PROVIDED')
    })

    it('max - it should match the expected value', () => {
      const values = ['10161', '10261.235', '10324.2567', 10724, '10232', '10510.25847', '10261.826']

      const res = max(values)
      return expect(res).to.be.equal('10724')
    })

    it('max - it should work with just one element', () => {
      const values = ['10161']

      const res = max(values)
      return expect(res).to.be.equal('10161')
    })

    it('max - it should work with selector', () => {
      const values = [
        { price: '10161', volume: '1' },
        { price: '10261.235', volume: '1' },
        { price: '10324.2567', volume: '1' },
        { price: 10724, volume: '1' },
        { price: nBN('10232'), volume: '1' },
        { price: '10510.25847', volume: '1' },
        { price: '10261.826', volume: '1' }
      ]

      const res = max(values, (a) => a.price)
      return expect(res).to.be.equal('10724')
    })

    it('max - it should work with negatives', () => {
      const values = [
        { price: '-10161', volume: '1' },
        { price: '-10261.235', volume: '1' },
        { price: '-10324.2567', volume: '1' },
        { price: '-10724', volume: '1' },
        { price: '-10232', volume: '1' },
        { price: '-10510.25847', volume: '1' },
        { price: '-10261.826', volume: '1' }
      ]

      const res = max(values, (a) => a.price)
      return expect(res).to.be.equal('-10161')
    })

    it('min - it should fail with no values', () => {
      return expect(
        min.bind(null, [])
      ).to.throw('ERR_NO_VALUES_PROVIDED')
    })

    it('min - it should match the expected value', () => {
      const values = ['10161', '10261.235', '10324.2567', 10724, '10232', '10510.25847', '10261.826']

      const res = min(values)
      return expect(res).to.be.equal('10161')
    })

    it('min - it should work with just one element', () => {
      const values = ['10161']

      const res = min(values)
      return expect(res).to.be.equal('10161')
    })

    it('min - it should work with selector', () => {
      const values = [
        { price: '10161', volume: '1' },
        { price: '10261.235', volume: '1' },
        { price: '10324.2567', volume: '1' },
        { price: 10724, volume: '1' },
        { price: nBN('10232'), volume: '1' },
        { price: '10510.25847', volume: '1' },
        { price: '10261.826', volume: '1' }
      ]

      const res = min(values, (a) => a.price)
      return expect(res).to.be.equal('10161')
    })

    it('min - it should work with negatives', () => {
      const values = [
        { price: '-10161', volume: '1' },
        { price: '-10261.235', volume: '1' },
        { price: '-10324.2567', volume: '1' },
        { price: '-10724', volume: '1' },
        { price: '-10232', volume: '1' },
        { price: '-10510.25847', volume: '1' },
        { price: '-10261.826', volume: '1' }
      ]

      const res = min(values, (a) => a.price)
      return expect(res).to.be.equal('-10724')
    })

    it('median - it should fail with empty array', () => {
      return expect(
        median.bind(null, [])
      ).to.throw('ERR_NO_VALUES_PROVIDED')
    })

    it('median - it should select middle element in case of odd array', () => {
      const values = [
        '10161',
        10261.235,
        10324.2567,
        '10724',
        '10232',
        10510.25847,
        10261.826
      ]

      const res = median(values)
      return expect(res.toString()).to.be.equal('10261.826')
    })

    it('median - it should select avg from middle element in case of even array', () => {
      const values = [
        '10161',
        10261.235,
        10324.2567,
        '10724',
        '10232',
        10261.826
      ]

      const res = median(values)
      return expect(res.toString()).to.be.equal('10261.5305')
    })

    it('median - it should work with just one item', () => {
      const values = ['10161']
      const res = median(values)
      return expect(res.toString()).to.be.equal('10161')
    })

    it('median - it should work with selector', () => {
      const values = [
        { price: '10161', volume: '1' },
        { price: '10261.235', volume: '1' },
        { price: '10324.2567', volume: '1' },
        { price: '10724', volume: '1' },
        { price: '10232', volume: '1' },
        { price: '10510.25847', volume: '1' },
        { price: '10261.826', volume: '1' }
      ]

      const res = median(values, (a) => a.price)
      return expect(res.toString()).to.be.equal('10261.826')
    })

    it('median - it should work with negative numbers', () => {
      const values = [
        '-10161',
        -10261.235,
        -10324.2567,
        '-10724',
        '-10232',
        -10510.25847,
        -10261.826
      ]

      const res = median(values)
      return expect(res.toString()).to.be.equal('-10261.826')
    })

    it('filterMedian - it should fail with empty array', () => {
      return expect(
        median.bind(null, [])
      ).to.throw('ERR_NO_VALUES_PROVIDED')
    })

    it('filterMedian - it should filter expected values', () => {
      const samples = [
        ['0.0161545', '0.0161565', '0.0161415', '0.056355'], // filter highest
        ['0.0161545', '0.0161565', '0.0361415', '0.056355'], // filter multiple outliners
        ['0.0161545', '0.0161565', '0.0161415', '0.006355'], // filter lowest
        ['0.0161545', '0.0161565', '0.0161415', '0.016355'] // keep all
      ]

      const expected = [
        ['0.0161545', '0.0161565', '0.0161415'],
        ['0.0161545', '0.0161565'],
        ['0.0161545', '0.0161565', '0.0161415'],
        ['0.0161545', '0.0161565', '0.0161415', '0.016355']
      ]

      const filtered = samples.map(values => filterMedian(values, '0.02'))
      filtered.every((f, i) => {
        expect(f).to.be.eqls(expected[i])
      })
    })
  })
}
