'use strict'

const { expect } = require('chai')
const { safeParseInt } = require('../src/number')
const { nBN } = require('../src/bn')

module.exports = () => {
  describe('# bn-tests', () => {

    it('safeParseInt - it should throw with null', () => {
      return expect(
        safeParseInt.bind(null, null)
      ).to.throw()
    })

    it('safeParseInt - it should throw with NaN', () => {
      return expect(
        safeParseInt.bind(null, NaN)
      ).to.throw()
    })

    it('safeParseInt - it should throw with wrong string number', () => {
      return expect(
        safeParseInt.bind(null, 'a23')
      ).to.throw()
    })

    it('safeParseInt - it should throw with object', () => {
      return expect(
        safeParseInt.bind(null, { '33': 33 })
      ).to.throw()
    })

    it('safeParseInt - it should work string number', () => {
      const value = safeParseInt('33')
      return expect(value).to.be.equal(33)
    })

    it('safeParseInt - it should work decimal number', () => {
      const value = safeParseInt(25.55)
      return expect(value).to.be.equal(25)
    })

    it('safeParseInt - it should work integer number', () => {
      const value = safeParseInt(4)
      return expect(value).to.be.equal(4)
    })

    it('safeParseInt - it should return 0 for hex number', () => {
      const value = safeParseInt('0x33')
      return expect(value).to.be.equal(0)
    })

    it('safeParseInt - it should work with exponential number', () => {
      const value = safeParseInt('2e3')
      return expect(value).to.be.equal(2000)
    })

    it('safeParseInt - it should work with Decimal object', () => {
      const value = safeParseInt(nBN(23))
      return expect(value).to.be.equal(23)
    })

  })
}
