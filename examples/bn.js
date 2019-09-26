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

console.log(safeSumBN(1, 2, '3', nBN(4), 5).toNumber()) // 15
console.log(safeSubBN(30.5, 2, '3', nBN(4), -5).toNumber()) // 26.5
console.log(safeMulBN(3, '4', '2.5').toNumber()) // 30
console.log(safeDivBN(6, '3', nBN(2)).toNumber()) // 1
