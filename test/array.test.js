'use strict'

const test = require('brittle')
const { nBN } = require('../src/bn')
const { avg, max, min, median, filterMedian } = require('../src/array')

test('avg - it should fail with non numeric values', (t) => {
  const values = ['10161', 'a10261.235']

  t.exception.all(
    avg.bind(null, values)
  )
})

test('avg - it should fail with no values', (t) => {
  t.exception(
    avg.bind(null, []),
    /ERR_NO_VALUES_PROVIDED/
  )
})

test('avg - it should match the expected value', (t) => {
  const values = ['10161', '10261.235', '10324.2567', 10724, '10232', '10510.25847', '10261.826']

  const res = avg(values)
  t.is(res, '10353.51088142857142857143')
})

test('avg - it should work with just one element', (t) => {
  const values = ['10161']

  const res = avg(values)
  t.is(res, '10161')
})

test('avg - it should work with selector', (t) => {
  const values = [
    { price: '10161', volume: '1' },
    { price: '10261.235', volume: '1' },
    { price: '10324.2567', volume: '1' },
    { price: 10724, volume: '1' },
    { price: nBN('10232'), volume: '1' },
    { price: '10510.25847', volume: '1' },
    { price: '10261.826', volume: '1' }
  ]

  const res = avg(values, (a) => a.price)
  t.is(res, '10353.51088142857142857143')
})

test('avg - it should work with negatives', (t) => {
  const values = [
    { price: '-10161', volume: '1' },
    { price: '-10261.235', volume: '1' },
    { price: '-10324.2567', volume: '1' },
    { price: '-10724', volume: '1' },
    { price: '-10232', volume: '1' },
    { price: '-10510.25847', volume: '1' },
    { price: '-10261.826', volume: '1' }
  ]

  const res = avg(values, (a) => a.price)
  t.is(res, '-10353.51088142857142857143')
})

test('avg - it should fail with non numeric values', (t) => {
  const values = ['10161', 'a10261.235']

  t.exception.all(
    avg.bind(null, values)
  )
})

test('max - it should fail with no values', (t) => {
  t.exception(
    max.bind(null, []),
    /ERR_NO_VALUES_PROVIDED/
  )
})

test('max - it should match the expected value', (t) => {
  const values = ['10161', '10261.235', '10324.2567', 10724, '10232', '10510.25847', '10261.826']

  const res = max(values)
  t.is(res, '10724')
})

test('max - it should work with just one element', (t) => {
  const values = ['10161']

  const res = max(values)
  t.is(res, '10161')
})

test('max - it should work with selector', (t) => {
  const values = [
    { price: '10161', volume: '1' },
    { price: '10261.235', volume: '1' },
    { price: '10324.2567', volume: '1' },
    { price: 10724, volume: '1' },
    { price: nBN('10232'), volume: '1' },
    { price: '10510.25847', volume: '1' },
    { price: '10261.826', volume: '1' }
  ]

  const res = max(values, (a) => a.price)
  t.is(res, '10724')
})

test('max - it should work with negatives', (t) => {
  const values = [
    { price: '-10161', volume: '1' },
    { price: '-10261.235', volume: '1' },
    { price: '-10324.2567', volume: '1' },
    { price: '-10724', volume: '1' },
    { price: '-10232', volume: '1' },
    { price: '-10510.25847', volume: '1' },
    { price: '-10261.826', volume: '1' }
  ]

  const res = max(values, (a) => a.price)
  t.is(res, '-10161')
})

test('min - it should fail with no values', (t) => {
  t.exception(
    min.bind(null, []),
    /ERR_NO_VALUES_PROVIDED/
  )
})

test('min - it should match the expected value', (t) => {
  const values = ['10161', '10261.235', '10324.2567', 10724, '10232', '10510.25847', '10261.826']

  const res = min(values)
  t.is(res, '10161')
})

test('min - it should work with just one element', (t) => {
  const values = ['10161']

  const res = min(values)
  t.is(res, '10161')
})

test('min - it should work with selector', (t) => {
  const values = [
    { price: '10161', volume: '1' },
    { price: '10261.235', volume: '1' },
    { price: '10324.2567', volume: '1' },
    { price: 10724, volume: '1' },
    { price: nBN('10232'), volume: '1' },
    { price: '10510.25847', volume: '1' },
    { price: '10261.826', volume: '1' }
  ]

  const res = min(values, (a) => a.price)
  t.is(res, '10161')
})

test('min - it should work with negatives', (t) => {
  const values = [
    { price: '-10161', volume: '1' },
    { price: '-10261.235', volume: '1' },
    { price: '-10324.2567', volume: '1' },
    { price: '-10724', volume: '1' },
    { price: '-10232', volume: '1' },
    { price: '-10510.25847', volume: '1' },
    { price: '-10261.826', volume: '1' }
  ]

  const res = min(values, (a) => a.price)
  t.is(res, '-10724')
})

test('median - it should fail with empty array', (t) => {
  t.exception(
    median.bind(null, []),
    /ERR_NO_VALUES_PROVIDED/
  )
})

test('median - it should select middle element in case of odd array', (t) => {
  const values = [
    '10161',
    10261.235,
    10324.2567,
    '10724',
    '10232',
    10510.25847,
    10261.826
  ]

  const res = median(values)
  t.is(res.toString(), '10261.826')
})

test('median - it should select avg from middle element in case of even array', (t) => {
  const values = [
    '10161',
    10261.235,
    10324.2567,
    '10724',
    '10232',
    10261.826
  ]

  const res = median(values)
  t.is(res.toString(), '10261.5305')
})

test('median - it should work with just one item', (t) => {
  const values = ['10161']
  const res = median(values)
  t.is(res.toString(), '10161')
})

test('median - it should work with selector', (t) => {
  const values = [
    { price: '10161', volume: '1' },
    { price: '10261.235', volume: '1' },
    { price: '10324.2567', volume: '1' },
    { price: '10724', volume: '1' },
    { price: '10232', volume: '1' },
    { price: '10510.25847', volume: '1' },
    { price: '10261.826', volume: '1' }
  ]

  const res = median(values, (a) => a.price)
  t.is(res.toString(), '10261.826')
})

test('median - it should work with negative numbers', (t) => {
  const values = [
    '-10161',
    -10261.235,
    -10324.2567,
    '-10724',
    '-10232',
    -10510.25847,
    -10261.826
  ]

  const res = median(values)
  t.is(res.toString(), '-10261.826')
})

test('filterMedian - it should fail with empty array', (t) => {
  t.exception(
    median.bind(null, []),
    /ERR_NO_VALUES_PROVIDED/
  )
})

test('filterMedian - it should filter expected values', (t) => {
  const samples = [
    ['0.0161545', '0.0161565', '0.0161415', '0.056355'], // filter highest
    ['0.0161545', '0.0161565', '0.0361415', '0.056355'], // filter multiple outliners
    ['0.0161545', '0.0161565', '0.0161415', '0.006355'], // filter lowest
    ['0.0161545', '0.0161565', '0.0161415', '0.016355'] // keep all
  ]

  const expected = [
    ['0.0161545', '0.0161565', '0.0161415'],
    ['0.0161545', '0.0161565'],
    ['0.0161545', '0.0161565', '0.0161415'],
    ['0.0161545', '0.0161565', '0.0161415', '0.016355']
  ]

  const filtered = samples.map(values => filterMedian(values, '0.02'))
  filtered.forEach((f, i) => {
    t.alike(f, expected[i])
  })
})
