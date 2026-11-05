'use strict'

const test = require('brittle')
const { EMA, multiplier } = require('../src/ema')

test('multiplier - it should fail with non numeric values', (t) => {
  t.exception.all(
    multiplier.bind(null, 'a23')
  )
})

test('multiplier - it should calc the expected value', (t) => {
  t.is(
    multiplier('10'),
    '0.18181818181818181818'
  )
})

test('ema - it should fail with nan value', (t) => {
  t.exception.all(
    EMA.bind(null, 'a7301.41', '7300.9807', 10)
  )
})

test('ema - it should return the expected value', (t) => {
  t.is(
    EMA('7301.41', 7300.9807, '0.18181818181818181818'),
    '7301.058754545454545454544674'
  )
})
