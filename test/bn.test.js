'use strict'

const { BigNumber } = require('bignumber.js')
const chai = require('chai')
  .use(require('dirty-chai'))
const { expect } = chai
const { BN, nBN, validateBN } = require('../src/bn')

module.exports = () => {
  describe('# bn-tests', () => {
    it('BN - should return BigNumber constructor', () => {
      return expect(BN() === BigNumber).to.be.true
    })

    it('nBN - should fail on invalid string as number', () => {
      return expect(nBN.bind(null, '12a')).to.throw()
    })

    it('nBN - should fail on invalid string as NaN', () => {
      return expect(nBN.bind(null, 'NaN')).to.throw()
    })

    it('nBN - should fail on NaN type', () => {
      return expect(nBN.bind(null, NaN)).to.throw()
    })

    it('nBN - should fail on null type', () => {
      return expect(nBN.bind(null, null)).to.throw()
    })

    it('nBN - should fail on "null" value', () => {
      return expect(nBN.bind(null, 'null')).to.throw()
    })

    it('nBN - should fail on bool value', () => {
      return expect(nBN.bind(null, true)).to.throw()
    })

    it('nBN - should fail on infinite value', () => {
      return expect(nBN.bind(null, Infinity)).to.throw('ERR_NUM_INFINITE')
    })

    it('nBN - should fail on -infinite value', () => {
      return expect(nBN.bind(null, -Infinity)).to.throw('ERR_NUM_INFINITE')
    })

    it('nBN - should fail on infinity string value', () => {
      return expect(nBN.bind(null, 'Infinity')).to.throw('ERR_NUM_INFINITE')
    })

    it('nBN - should work fail undefined input', () => {
      return expect(nBN.bind(null)).to.throw()
    })

    it('nBN - should return BigNumber instance on valid input', () => {
      return expect(nBN(33) instanceof BigNumber).to.be.true
    })

    it('nBN - should return BigNumber instance on valid BigNumber input', () => {
      return expect(nBN(new BigNumber(0)) instanceof BigNumber).to.be.true
    })

    it('nBN - should return BigNumber instance on 0 input', () => {
      return expect(nBN(0) instanceof BigNumber).to.be.true
    })

    it('nBN - should return BigNumber instance on string number input', () => {
      return expect(nBN('3332') instanceof BigNumber).to.be.true
    })

    it('nBN - should return BigNumber instance on exponential number input', () => {
      return expect(nBN(10e-2) instanceof BigNumber).to.be.true
    })

    it('nBN - should return BigNumber instance on exponential string number input', () => {
      return expect(nBN('32.33e+2') instanceof BigNumber).to.be.true
    })

    it('nBN - should return BigNumber instance on decimal input', () => {
      return expect(nBN(0.333) instanceof BigNumber).to.be.true
    })

    it('nBN - should return BigNumber instance on negative number input', () => {
      return expect(nBN(-33) instanceof BigNumber).to.be.true
    })

    it('nBN - should return BigNumber instance on negative string number input', () => {
      return expect(nBN('-33.323') instanceof BigNumber).to.be.true
    })

    it('validateBN - should fail on invalid string as NaN', () => {
      return expect(
        validateBN.bind(null, 'NaN')
      ).to.throw()
    })

    it('validateBN - should fail on NaN type', () => {
      return expect(
        validateBN.bind(null, NaN)
      ).to.throw()
    })

    it('validateBN - should fail on null type', () => {
      return expect(
        validateBN.bind(null, null)
      ).to.throw()
    })

    it('validateBN - should fail on "null" value', () => {
      return expect(
        validateBN.bind(null, 'null')
      ).to.throw()
    })

    it('validateBN - should fail on bool value', () => {
      return expect(
        validateBN.bind(null, true)
      ).to.throw()
    })

    it('validateBN - should fail on infinite value', () => {
      return expect(
        validateBN.bind(null, Infinity)
      ).to.throw('ERR_NUM_INFINITE')
    })

    it('validateBN - should fail on -infinite value', () => {
      return expect(
        validateBN.bind(null, -Infinity)
      ).to.throw('ERR_NUM_INFINITE')
    })

    it('validateBN - should fail on infinity string value', () => {
      return expect(
        validateBN.bind(null, 'Infinity')
      ).to.throw('ERR_NUM_INFINITE')
    })

    it('validateBN - should throw ERR_NUM_NAN on invalid number', () => {
      return expect(
        validateBN.bind(null, 'aa')
      ).to.throw('ERR_NUM_NAN')
    })

    it('validateBN - should throw ERR_NUM_NOT_POS on negative number when restricted', () => {
      return expect(
        validateBN.bind(null, '-33', { allowNegative: false, allowZero: true, allowDecimals: true })
      ).to.throw('ERR_NUM_NOT_POS')
    })

    it('validateBN - should throw ERR_NUM_ZERO on zero when restricted', () => {
      return expect(
        validateBN.bind(null, 0, { allowNegative: true, allowZero: false, allowDecimals: true })
      ).to.throw('ERR_NUM_ZERO')
    })

    it('validateBN - should throw ERR_NUM_WITH_PRECISION on decimal number when restricted', () => {
      expect(
        validateBN.bind(null, '2e-7', { allowNegative: true, allowZero: true, allowDecimals: false })
      ).to.throw('ERR_NUM_WITH_PRECISION')
      return expect(
        validateBN.bind(null, '0.33', { allowNegative: true, allowZero: true, allowDecimals: false })
      ).to.throw('ERR_NUM_WITH_PRECISION')
    })

    it('validateBN - should work on any valid number with no restriction (default)', () => {
      return expect(
        validateBN.bind(null, '-0.33')
      ).not.to.throw()
    })
  })
}
