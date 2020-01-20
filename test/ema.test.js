'use strict'

const chai = require('chai')
  .use(require('dirty-chai'))
const { expect } = chai
const { EMA, multiplier } = require('../src/ema')

module.exports = () => {
  describe('# ema-tests', () => {
    it('multiplier - it should fail with non numeric values', () => {
      return expect(
        multiplier.bind(null, 'a23')
      ).to.throw()
    })

    it('multiplier - it should calc the expected value', () => {
      return expect(
        multiplier('10')
      ).to.be.equal('0.18181818181818181818')
    })

    it('ema - it should fail with nan value', () => {
      return expect(
        EMA.bind(null, 'a7301.41', '7300.9807', 10)
      ).to.throw()
    })

    it('ema - it should return the expected value', () => {
      return expect(
        EMA('7301.41', 7300.9807, '0.18181818181818181818')
      ).to.be.equal('7301.058754545454545454544674')
    })
  })
}
