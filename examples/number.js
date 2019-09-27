'use strict'

const { safeParseInt } = require('..')

console.log(safeParseInt('33')) // 33
try {
  safeParseInt('a23') // throws
} catch (err) {
  console.log(err.message) // ERR_NUM_NAN
}
console.log(safeParseInt('0x33')) // 0
