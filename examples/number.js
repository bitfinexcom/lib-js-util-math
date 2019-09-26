'use strict'

const { nDC, DC, validateDC, safeDivDC, safeMulDC, safeSubDC, safeSumDC, safeParseInt } = require('..')

const Decimal = DC()
console.log(Decimal) // Print current Decimal configuration

const a = nDC(333)
const b = nDC('-44.33')
const c = nDC('5e+2')

console.log('a =', a.toFixed()) // prints 333
console.log('b =', b.toString()) // prints -44.33
console.log('c =', c.toFixed()) // prints 500
console.log('a + b - c =', a.plus(b).minus(c).toFixed()) // prints -211.33

try {
  validateDC(0, { allowNegative: false }) // passes
  validateDC('a23') // throws Error(ERR_NUM_NAN)
} catch (err) {
  console.log(err.message)
}

// Difference between float arithmetic and decimal arithmetic
console.log(0.1 + 0.2) // 0.30000000000000004
console.log(safeSumDC(0.1, 0.2).toNumber()) // 0.3

console.log(safeSumDC(1, 2, '3', nDC(4), 5).toNumber()) // 15
console.log(safeSubDC(30.5, 2, '3', nDC(4), -5).toNumber()) // 26.5
console.log(safeMulDC(3, '4', '2.5').toNumber()) // 30
console.log(safeDivDC(6, '3', nDC(2)).toNumber()) // 1

console.log(safeParseInt('33')) // 33
try {
  safeParseInt('a23') // throws
} catch (err) {
  console.log(err.message) // ERR_NUM_NAN
}
console.log(safeParseInt('0x33')) // 0
