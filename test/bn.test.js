'use strict'

const { BigNumber } = require('bignumber.js')
const { expect } = require('chai')
const { BN, nBN, validateBN } = require('../src/bn')

module.exports = () => {
  describe('# bn-tests', () => {
    it("BN - should return BigNumber constructor", () => {
      return expect(BN() === BigNumber).to.be.true
    })

    it("nBN - should fail on invalid number", () => {
      return expect(nBN.bind(null, 'aa')).to.throw()
    })

    it("nBN - should work fail undefined input", () => {
      return expect(nBN.bind(null)).to.throw()
    })

    it("nBN - should return BigNumber instance on valid input", () => {
      return expect(nBN(33) instanceof BigNumber).to.be.true
    })

    it("validateBN - should throw ERR_NUM_NAN on invalid number", () => {
      return expect(
        validateBN.bind(null, 'aa')
      ).to.throw('ERR_NUM_NAN')
    })

    it("validateBN - should throw ERR_NUM_NOT_POS on negative number when restricted", () => {
      return expect(
        validateBN.bind(null, '-33', { allowNegative: false, allowZero: true, allowDecimals: true })
      ).to.throw('ERR_NUM_NOT_POS')
    })

    it("validateBN - should throw ERR_NUM_ZERO on zero when restricted", () => {
      return expect(
        validateBN.bind(null, 0, { allowNegative: true, allowZero: false, allowDecimals: true })
      ).to.throw('ERR_NUM_ZERO')
    })

    it("validateBN - should throw ERR_NUM_WITH_PRECISION on decimal number when restricted", () => {
      expect(
        validateBN.bind(null, '2e-7', { allowNegative: true, allowZero: true, allowDecimals: false })
      ).to.throw('ERR_NUM_WITH_PRECISION')
      return expect(
        validateBN.bind(null, '0.33', { allowNegative: true, allowZero: true, allowDecimals: false })
      ).to.throw('ERR_NUM_WITH_PRECISION')
    })

    it("validateBN - should work on any valid number with no restriction (default)", () => {
      return expect(
        validateBN.bind(null, '-0.33')
      ).not.to.throw()
    })
  })
}
