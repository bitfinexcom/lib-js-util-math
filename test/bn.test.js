'use strict'

const { BigNumber } = require('bignumber.js')
const test = require('brittle')
const { BN, nBN, validateBN } = require('../src/bn')

test('BN - should return BigNumber constructor', (t) => {
  t.is(BN() === BigNumber, true)
})

test('nBN - should fail on invalid string as number', (t) => {
  t.exception.all(nBN.bind(null, '12a'))
})

test('nBN - should fail on invalid string as NaN', (t) => {
  t.exception.all(nBN.bind(null, 'NaN'))
})

test('nBN - should fail on NaN type', (t) => {
  t.exception.all(nBN.bind(null, NaN))
})

test('nBN - should fail on null type', (t) => {
  t.exception.all(nBN.bind(null, null))
})

test('nBN - should fail on "null" value', (t) => {
  t.exception.all(nBN.bind(null, 'null'))
})

test('nBN - should fail on bool value', (t) => {
  t.exception.all(nBN.bind(null, true))
})

test('nBN - should fail on infinite value', (t) => {
  t.exception(nBN.bind(null, Infinity), /ERR_NUM_INFINITE/)
})

test('nBN - should fail on -infinite value', (t) => {
  t.exception(nBN.bind(null, -Infinity), /ERR_NUM_INFINITE/)
})

test('nBN - should fail on infinity string value', (t) => {
  t.exception(nBN.bind(null, 'Infinity'), /ERR_NUM_INFINITE/)
})

test('nBN - should work fail undefined input', (t) => {
  t.exception.all(nBN.bind(null))
})

test('nBN - should return BigNumber instance on valid input', (t) => {
  t.is(nBN(33) instanceof BigNumber, true)
})

test('nBN - should return BigNumber instance on valid BigNumber input', (t) => {
  t.is(nBN(new BigNumber(0)) instanceof BigNumber, true)
})

test('nBN - should return BigNumber instance on 0 input', (t) => {
  t.is(nBN(0) instanceof BigNumber, true)
})

test('nBN - should return BigNumber instance on string number input', (t) => {
  t.is(nBN('3332') instanceof BigNumber, true)
})

test('nBN - should return BigNumber instance on exponential number input', (t) => {
  t.is(nBN(10e-2) instanceof BigNumber, true)
})

test('nBN - should return BigNumber instance on exponential string number input', (t) => {
  t.is(nBN('32.33e+2') instanceof BigNumber, true)
})

test('nBN - should return BigNumber instance on decimal input', (t) => {
  t.is(nBN(0.333) instanceof BigNumber, true)
})

test('nBN - should return BigNumber instance on negative number input', (t) => {
  t.is(nBN(-33) instanceof BigNumber, true)
})

test('nBN - should return BigNumber instance on negative string number input', (t) => {
  t.is(nBN('-33.323') instanceof BigNumber, true)
})

test('validateBN - should fail on invalid string as NaN', (t) => {
  t.exception.all(
    validateBN.bind(null, 'NaN')
  )
})

test('validateBN - should fail on NaN type', (t) => {
  t.exception.all(
    validateBN.bind(null, NaN)
  )
})

test('validateBN - should fail on null type', (t) => {
  t.exception.all(
    validateBN.bind(null, null)
  )
})

test('validateBN - should fail on "null" value', (t) => {
  t.exception.all(
    validateBN.bind(null, 'null')
  )
})

test('validateBN - should fail on bool value', (t) => {
  t.exception.all(
    validateBN.bind(null, true)
  )
})

test('validateBN - should fail on infinite value', (t) => {
  t.exception(
    validateBN.bind(null, Infinity),
    /ERR_NUM_INFINITE/
  )
})

test('validateBN - should fail on -infinite value', (t) => {
  t.exception(
    validateBN.bind(null, -Infinity),
    /ERR_NUM_INFINITE/
  )
})

test('validateBN - should fail on infinity string value', (t) => {
  t.exception(
    validateBN.bind(null, 'Infinity'),
    /ERR_NUM_INFINITE/
  )
})

test('validateBN - should throw ERR_NUM_NAN on invalid number', (t) => {
  t.exception(
    validateBN.bind(null, 'aa'),
    /ERR_NUM_NAN/
  )
})

test('validateBN - should throw ERR_NUM_NOT_POS on negative number when restricted', (t) => {
  t.exception(
    validateBN.bind(null, '-33', { allowNegative: false, allowZero: true, allowDecimals: true }),
    /ERR_NUM_NOT_POS/
  )
})

test('validateBN - should throw ERR_NUM_ZERO on zero when restricted', (t) => {
  t.exception(
    validateBN.bind(null, 0, { allowNegative: true, allowZero: false, allowDecimals: true }),
    /ERR_NUM_ZERO/
  )
})

test('validateBN - should throw ERR_NUM_WITH_PRECISION on decimal number when restricted', (t) => {
  t.exception(
    validateBN.bind(null, '2e-7', { allowNegative: true, allowZero: true, allowDecimals: false }),
    /ERR_NUM_WITH_PRECISION/
  )
  t.exception(
    validateBN.bind(null, '0.33', { allowNegative: true, allowZero: true, allowDecimals: false }),
    /ERR_NUM_WITH_PRECISION/
  )
})

test('validateBN - should work on any valid number with no restriction (default)', (t) => {
  t.execution(
    validateBN.bind(null, '-0.33')
  )
})
