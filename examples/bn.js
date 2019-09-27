'use strict'

const { BN, nBN, validateBN, safeDivBN, safeMulBN, safeSubBN, safeSumBN } = require('../')

const BigNumber = BN()
console.log(BigNumber.config()) // Print current BigNumber configuration

const a = nBN(333)
const b = nBN('-44.33')
const c = nBN('5e+2')

console.log('a =', a.toFixed()) // prints 333
console.log('b =', b.toString()) // prints -44.33
console.log('c =', c.toFixed()) // prints 500
console.log('a + b - c =', a.plus(b).minus(c).toFixed()) // prints -211.33

try {
  validateBN(0, { allowNegative: false }) // passes
  validateBN('a23') // throws Error(ERR_NUM_NAN)
} catch (err) {
  console.log(err.message)
}
