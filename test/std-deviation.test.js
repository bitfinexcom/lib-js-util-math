'use strict'

const test = require('brittle')
const { BN } = require('../src/bn')
const { stdDeviation, filterStdDeviated, zScore } = require('../src/std-deviation')
const BigNumber = BN()

test('stdDeviation - it should fail with invalid input', (t) => {
  const values = ['10161', { price: '10261.235', amount: '1' }]

  t.exception.all(
    stdDeviation.bind(null, values)
  )
})

test('stdDeviation - it should fail with non numeric value', (t) => {
  const values = ['10152.235', 'a10261.235']

  t.exception.all(
    stdDeviation.bind(null, values)
  )
})

test('stdDeviation - it should fail with NaN value', (t) => {
  const values = [10500, 10700, 11500, '12300', 5000, 5100, NaN, NaN]

  t.exception(
    stdDeviation.bind(null, values),
    /ERR_NUM_NAN/
  )
})

test('stdDeviation - it should return expected value with valid config', (t) => {
  const values = [10500, 10700, 11500, '12300', 5000, 5100]

  const dev = stdDeviation(values)
  t.is(dev instanceof BigNumber, true)
  t.is(dev.toString(), '2980.16591633568094682823')
})

test('stdDeviation - it should work with single item in array', (t) => {
  const values = [10500]

  const dev = stdDeviation(values)
  t.is(dev instanceof BigNumber, true)
  t.is(dev.toString(), '0')
})

test('stdDeviation - it should return expected value with negative values', (t) => {
  const values = [-2, -3, -4, -5]

  const dev = stdDeviation(values)
  t.is(dev instanceof BigNumber, true)
  t.is(dev.toString(), '1.1180339887498948482')
})

test('stdDeviation - it should return expected value with mixed positive/negative values', (t) => {
  const values = [2, 3, -4, 5]

  const dev = stdDeviation(values)
  t.is(dev instanceof BigNumber, true)
  t.is(dev.toString(), '3.35410196624968454461')
})

test('stdDeviation - it should return expected value with selector arg', (t) => {
  const values = [
    { price: 10500, amount: '1' },
    { price: 10700, amount: '1' },
    { price: 11500, amount: '1' },
    { price: '12300', amount: '1' },
    { price: 5000, amount: '1' },
    { price: 5100, amount: '1' }
  ]

  const dev = stdDeviation(values, (a) => a.price)
  t.is(dev instanceof BigNumber, true)
  t.is(dev.toString(), '2980.16591633568094682823')
})

test('zScore - it should throw on null value', (t) => {
  t.exception.all(zScore.bind(null, 33, null, 25))
})

test('zScore - it should throw on NaN values', (t) => {
  t.exception.all(zScore.bind(null, 190, NaN, 25))
})

test('zScore - it should throw on divide by zero', (t) => {
  t.exception.all(zScore.bind(null, 190, 150, 0))
})

test('zScore - it should calculate the expected value', (t) => {
  t.is(zScore(190, 150, 25).toString(), '1.6')
})

test('filterStdDeviated - it should fail with invalid input', (t) => {
  const values = ['10161', { price: '10261.235', amount: '1' }]

  t.exception.all(
    filterStdDeviated.bind(null, values, 1)
  )
})

test('filterStdDeviated - it should fail with non numeric price', (t) => {
  const values = ['10152.235', 'a10261.235']

  t.exception.all(
    filterStdDeviated.bind(null, values, 1)
  )
})

test('filterStdDeviated - it should fail with non numeric threshold', (t) => {
  const values = ['10152.235', 'a10261.235']

  t.exception.all(
    filterStdDeviated.bind(null, values, 'a232')
  )
})

test('filterStdDeviated - it should return expected value with valid config', (t) => {
  const values = [10500, 10700, 11500, '12300', 5000, 5100]

  const res = filterStdDeviated(values, '1')
  const remaining = [10500, 10700, 11500]
  t.ok(res.every(n => remaining.includes(n)))
})

test('filterStdDeviated - it should work with single item in array', (t) => {
  const values = [10500]

  const res = filterStdDeviated(values, 1)
  t.is(res.length, 1)
  t.is(res[0], 10500)
})

test('filterStdDeviated - it should work with negative array', (t) => {
  const values = [-2, -3, '-4', -5]

  const res = filterStdDeviated(values, 1)
  t.is(res.length, 2)
  const remaining = [-3, '-4']
  t.ok(res.every(n => remaining.includes(n)))
})

test('filterStdDeviated - it should work with mixed positive/negative array', (t) => {
  const values = [2, 3, '-4', 5]

  const res = filterStdDeviated(values, 1)
  t.is(res.length, 2)
  const remaining = [2, 3]
  t.ok(res.every(n => remaining.includes(n)))
})

test('filterDeviated - it should return expected value with selector arg', (t) => {
  const values = [
    { price: 10500, amount: '1' },
    { price: 10700, amount: '1' },
    { price: 11500, amount: '1' },
    { price: '12300', amount: '1' },
    { price: 5000, amount: '1' },
    { price: 5100, amount: '1' }
  ]

  const res = filterStdDeviated(values, '1', (a) => a.price)
  const remaining = [10500, 10700, 11500]
  t.ok(res.every(a => remaining.includes(a.price)))
})
