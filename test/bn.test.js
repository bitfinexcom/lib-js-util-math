'use strict'

const { BigNumber } = require('bignumber.js')
const { expect } = require('chai')
const { BN, nBN, validateBN, safeDivBN, safeMulBN, safeSubBN, safeSumBN } = require('../src/bn')

module.exports = () => {
  describe('# bn-tests', () => {
    it('BN - should return BigNumber constructor', () => {
      return expect(BN() === BigNumber).to.be.true
    })

    it('nBN - should fail on invalid string as number', () => {
      return expect(nBN.bind(null, 'aa')).to.throw()
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

    it('safeSumBN - it should fail on non number values', () => {
      return expect(
        safeSumBN.bind(null, 0, 'a', '-3')
      ).to.throw()
    })

    it('safeSumBN - it should fail on NaN values', () => {
      return expect(
        safeSumBN.bind(null, 0, NaN)
      ).to.throw()
    })

    it('safeSumBN - it should fail on less then two values', () => {
      return expect(
        safeSumBN.bind(null, 5)
      ).to.throw()
    })

    it('safeSumBN - it should produce right result for 0.1 + 0.2', () => {
      const value = safeSumBN(0.1, 0.2)
      return expect(value.toNumber()).to.be.equal(0.3)
    })

    it('safeSumBN - it should work with mixed values of string, number and BigNumber', () => {
      const value = safeSumBN(3, '2.5', -1, nBN(33))
      return expect(value.toNumber()).to.be.equal(37.5)
    })

    it('safeSubBN - it should fail on non number values', () => {
      return expect(
        safeSubBN.bind(null, 0, 'a', '-3')
      ).to.throw()
    })

    it('safeSubBN - it should fail on NaN values', () => {
      return expect(
        safeSubBN.bind(null, 0, NaN)
      ).to.throw()
    })

    it('safeSubBN - it should fail on less then two values', () => {
      return expect(
        safeSubBN.bind(null, 5)
      ).to.throw()
    })

    it('safeSubBN - it should work with mixed values of string, number and BigNumber', () => {
      const value = safeSubBN(3, '2.5', -1, nBN(33))
      return expect(value.toNumber()).to.be.equal(-31.5)
    })

    it('safeMulBN - it should fail on non number values', () => {
      return expect(
        safeMulBN.bind(null, 2, 'a', '-3')
      ).to.throw()
    })

    it('safeMulBN - it should fail on NaN values', () => {
      return expect(
        safeMulBN.bind(null, 1, NaN)
      ).to.throw()
    })

    it('safeMulBN - it should fail on less then two values', () => {
      return expect(
        safeMulBN.bind(null, 5)
      ).to.throw()
    })

    it('safeMulBN - it should work with mixed values of string, number and BigNumber', () => {
      const value = safeMulBN(3, '2.5', -1, nBN(33))
      return expect(value.toNumber()).to.be.equal(-247.5)
    })

    it('safeDivBN - it should fail on non number values', () => {
      return expect(
        safeDivBN.bind(null, 3, 'a', '-3')
      ).to.throw()
    })

    it('safeDivBN - it should fail on NaN values', () => {
      return expect(
        safeDivBN.bind(null, 3, NaN)
      ).to.throw()
    })

    it('safeDivBN - it should fail on less then two values', () => {
      return expect(
        safeDivBN.bind(null, 5)
      ).to.throw()
    })

    it('safeDivBN - it should fail with zero as divider', () => {
      return expect(
        safeDivBN.bind(null, 25, 5, 0)
      ).to.throw()
    })

    it('safeDivBN - it should work with mixed args', () => {
      const value = safeDivBN(4, nBN('2.5'))
      return expect(value.toNumber()).to.be.equal(1.6)
    })

    it('safeDivBN - it should work 0 as first arg', () => {
      const value = safeDivBN(0, '-5')
      return expect(value.toNumber()).to.be.equal(0)
    })

  })
}
