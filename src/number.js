'use strict'

const { nBN } = require('./bn')

const safeParseInt = (value) => {
  const num = parseInt(
    /^0x/.test(value.toString()) ? value : nBN(value).toNumber(),
    10)
  if (Number.isNaN(num)) throw new Error('ERR_NUM_NAN')
  return num
}

module.exports = {
  safeParseInt
}
