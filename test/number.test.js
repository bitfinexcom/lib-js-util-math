'use strict'

const { Decimal } = require('decimal.js')
const { expect } = require('chai')
const { DC, nDC, validateDC, safeDivDC, safeMulDC, safeSubDC, safeSumDC, safeParseInt } = require('../src/number')

module.exports = () => {
  describe('# bn-tests', () => {
    it("DC - should return BigNumber constructor", () => {
      return expect(DC() === Decimal).to.be.true
    })

    it("nDC - should fail on invalid string as number", () => {
      return expect(nDC.bind(null, 'aa')).to.throw()
    })

    it("nDC - should fail on invalid string as NaN", () => {
      return expect(nDC.bind(null, 'NaN')).to.throw()
    })

    it("nDC - should fail on NaN type", () => {
      return expect(nDC.bind(null, NaN)).to.throw()
    })

    it("nDC - should fail on null type", () => {
      return expect(nDC.bind(null, null)).to.throw()
    })

    it("nDC - should fail on 'null' value", () => {
      return expect(nDC.bind(null, 'null')).to.throw()
    })

    it("nDC - should fail on bool value", () => {
      return expect(nDC.bind(null, true)).to.throw()
    })

    it("nDC - should fail on infinite value", () => {
      return expect(nDC.bind(null, Infinity)).to.throw("ERR_NUM_INFINITE")
    })

    it("nDC - should fail on -infinite value", () => {
      return expect(nDC.bind(null, -Infinity)).to.throw("ERR_NUM_INFINITE")
    })

    it("nDC - should fail on infinity string value", () => {
      return expect(nDC.bind(null, 'Infinity')).to.throw("ERR_NUM_INFINITE")
    })

    it("nDC - should work fail undefined input", () => {
      return expect(nDC.bind(null)).to.throw()
    })

    it("nDC - should return BigNumber instance on valid input", () => {
      return expect(nDC(33) instanceof Decimal).to.be.true
    })

    it("nDC - should return BigNumber instance on valid BigNumber input", () => {
      return expect(nDC(new Decimal(0)) instanceof Decimal).to.be.true
    })

    it("nDC - should return BigNumber instance on 0 input", () => {
      return expect(nDC(0) instanceof Decimal).to.be.true
    })

    it("nDC - should return BigNumber instance on string number input", () => {
      return expect(nDC('3332') instanceof Decimal).to.be.true
    })

    it("nDC - should return BigNumber instance on exponential number input", () => {
      return expect(nDC(10e-2) instanceof Decimal).to.be.true
    })

    it("nDC - should return BigNumber instance on exponential string number input", () => {
      return expect(nDC('32.33e+2') instanceof Decimal).to.be.true
    })

    it("nDC - should return BigNumber instance on decimal input", () => {
      return expect(nDC(0.333) instanceof Decimal).to.be.true
    })

    it("nDC - should return BigNumber instance on negative number input", () => {
      return expect(nDC(-33) instanceof Decimal).to.be.true
    })

    it("nDC - should return BigNumber instance on negative string number input", () => {
      return expect(nDC('-33.323') instanceof Decimal).to.be.true
    })

    it("validateDC - should fail on invalid string as NaN", () => {
      return expect(
        validateDC.bind(null, 'NaN')
      ).to.throw()
    })

    it("validateDC - should fail on NaN type", () => {
      return expect(
        validateDC.bind(null, NaN)
      ).to.throw()
    })

    it("validateDC - should fail on null type", () => {
      return expect(
        validateDC.bind(null, null)
      ).to.throw()
    })

    it("validateDC - should fail on 'null' value", () => {
      return expect(
        validateDC.bind(null, 'null')
      ).to.throw()
    })

    it("validateDC - should fail on bool value", () => {
      return expect(
        validateDC.bind(null, true)
      ).to.throw()
    })

    it("validateDC - should fail on infinite value", () => {
      return expect(
        validateDC.bind(null, Infinity)
      ).to.throw("ERR_NUM_INFINITE")
    })

    it("validateDC - should fail on -infinite value", () => {
      return expect(
        validateDC.bind(null, -Infinity)
      ).to.throw("ERR_NUM_INFINITE")
    })

    it("validateDC - should fail on infinity string value", () => {
      return expect(
        validateDC.bind(null, 'Infinity')
      ).to.throw("ERR_NUM_INFINITE")
    })

    it("validateDC - should throw ERR_NUM_NAN on invalid number", () => {
      return expect(
        validateDC.bind(null, 'aa')
      ).to.throw('ERR_NUM_NAN')
    })

    it("validateDC - should throw ERR_NUM_NOT_POS on negative number when restricted", () => {
      return expect(
        validateDC.bind(null, '-33', { allowNegative: false, allowZero: true, allowDecimals: true })
      ).to.throw('ERR_NUM_NOT_POS')
    })

    it("validateDC - should throw ERR_NUM_ZERO on zero when restricted", () => {
      return expect(
        validateDC.bind(null, 0, { allowNegative: true, allowZero: false, allowDecimals: true })
      ).to.throw('ERR_NUM_ZERO')
    })

    it("validateDC - should throw ERR_NUM_WITH_PRECISION on decimal number when restricted", () => {
      expect(
        validateDC.bind(null, '2e-7', { allowNegative: true, allowZero: true, allowDecimals: false })
      ).to.throw('ERR_NUM_WITH_PRECISION')
      return expect(
        validateDC.bind(null, '0.33', { allowNegative: true, allowZero: true, allowDecimals: false })
      ).to.throw('ERR_NUM_WITH_PRECISION')
    })

    it("validateDC - should work on any valid number with no restriction (default)", () => {
      return expect(
        validateDC.bind(null, '-0.33')
      ).not.to.throw()
    })

    it("safeSumDC - it should fail on non number values", () => {
      return expect(
        safeSumDC.bind(null, 0, 'a', '-3')
      ).to.throw()
    })

    it("safeSumDC - it should fail on NaN values", () => {
      return expect(
        safeSumDC.bind(null, 0, NaN)
      ).to.throw()
    })

    it("safeSumDC - it should fail on less then two values", () => {
      return expect(
        safeSumDC.bind(null, 5)
      ).to.throw()
    })

    it("safeSumDC - it should produce right result for 0.1 + 0.2", () => {
      const value = safeSumDC(0.1, 0.2)
      return expect(value.toNumber()).to.be.equal(0.3)
    })

    it("safeSumDC - it should work with mixed values of string, number and BigNumber", () => {
      const value = safeSumDC(3, '2.5', -1, nDC(33))
      return expect(value.toNumber()).to.be.equal(37.5)
    })

    it("safeSubDC - it should fail on non number values", () => {
      return expect(
        safeSubDC.bind(null, 0, 'a', '-3')
      ).to.throw()
    })

    it("safeSubDC - it should fail on NaN values", () => {
      return expect(
        safeSubDC.bind(null, 0, NaN)
      ).to.throw()
    })

    it("safeSubDC - it should fail on less then two values", () => {
      return expect(
        safeSubDC.bind(null, 5)
      ).to.throw()
    })

    it("safeSubDC - it should work with mixed values of string, number and BigNumber", () => {
      const value = safeSubDC(3, '2.5', -1, nDC(33))
      return expect(value.toNumber()).to.be.equal(-31.5)
    })

    it("safeMulDC - it should fail on non number values", () => {
      return expect(
        safeMulDC.bind(null, 2, 'a', '-3')
      ).to.throw()
    })

    it("safeMulDC - it should fail on NaN values", () => {
      return expect(
        safeMulDC.bind(null, 1, NaN)
      ).to.throw()
    })

    it("safeMulDC - it should fail on less then two values", () => {
      return expect(
        safeMulDC.bind(null, 5)
      ).to.throw()
    })

    it("safeMulDC - it should work with mixed values of string, number and BigNumber", () => {
      const value = safeMulDC(3, '2.5', -1, nDC(33))
      return expect(value.toNumber()).to.be.equal(-247.5)
    })

    it("safeDivDC - it should fail on non number values", () => {
      return expect(
        safeDivDC.bind(null, 3, 'a', '-3')
      ).to.throw()
    })

    it("safeDivDC - it should fail on NaN values", () => {
      return expect(
        safeDivDC.bind(null, 3, NaN)
      ).to.throw()
    })

    it("safeDivDC - it should fail on less then two values", () => {
      return expect(
        safeDivDC.bind(null, 5)
      ).to.throw()
    })

    it("safeDivDC - it should fail with zero as divider", () => {
      return expect(
        safeDivDC.bind(null, 25, 5, 0)
      ).to.throw()
    })

    it("safeDivDC - it should work with mixed args", () => {
      const value = safeDivDC(4, nDC('2.5'))
      return expect(value.toNumber()).to.be.equal(1.6)
    })

    it("safeDivDC - it should work 0 as first arg", () => {
      const value = safeDivDC(0, '-5')
      return expect(value.toNumber()).to.be.equal(0)
    })

    it("safeParseInt - it should throw with null", () => {
      return expect(
        safeParseInt.bind(null, null)
      ).to.throw()
    })

    it("safeParseInt - it should throw with NaN", () => {
      return expect(
        safeParseInt.bind(null, NaN)
      ).to.throw()
    })

    it("safeParseInt - it should throw with wrong string number", () => {
      return expect(
        safeParseInt.bind(null, 'a23')
      ).to.throw()
    })

    it("safeParseInt - it should throw with object", () => {
      return expect(
        safeParseInt.bind(null, { '33': 33 })
      ).to.throw()
    })

    it("safeParseInt - it should work string number", () => {
      const value = safeParseInt('33')
      return expect(value).to.be.equal(33)
    })

    it("safeParseInt - it should work decimal number", () => {
      const value = safeParseInt(25.55)
      return expect(value).to.be.equal(25)
    })

    it("safeParseInt - it should work integer number", () => {
      const value = safeParseInt(4)
      return expect(value).to.be.equal(4)
    })

    it("safeParseInt - it should return 0 for hex number", () => {
      const value = safeParseInt('0x33')
      return expect(value).to.be.equal(0)
    })

    it("safeParseInt - it should work with exponential number", () => {
      const value = safeParseInt('2e3')
      return expect(value).to.be.equal(2000)
    })

    it("safeParseInt - it should work with Decimal object", () => {
      const value = safeParseInt(nDC(23))
      return expect(value).to.be.equal(23)
    })

  })
}
