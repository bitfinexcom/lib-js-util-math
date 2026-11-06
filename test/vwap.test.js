'use strict'

const test = require('brittle')
const { VWAP, EWVWAP } = require('../src/vwap')

test('VWAP - it should fail with non numeric values', (t) => {
  const values = [
    { price: '10161', volume: '1' },
    { price: 'a10261.235', volume: '1' }
  ]

  t.exception.all(
    VWAP.bind(null, values)
  )
})

test('VWAP - it return 0 with no values', (t) => {
  t.is(VWAP([]), '0')
})

test('VWAP - it should match the expected value', (t) => {
  const values = [
    { price: '10161', volume: '1' },
    { price: '10261.235', volume: '1' },
    { price: '10324.2567', volume: '1' },
    { price: '10724', volume: '1' },
    { price: '10232', volume: '1' },
    { price: '10510.25847', volume: '1' },
    { price: '10261.826', volume: '1' }
  ]

  const res = VWAP(values)
  t.is(res, '10353.51088142857142857143')
})

test('EWVWAP - it should fail with non numeric values', (t) => {
  const values = [
    { price: '10161', weightType: 'bfx' },
    { price: 'a10261.235', weightType: 'bitstamp' },
    { price: '10261.826', weightType: 'kraken' }
  ]

  t.exception.all(
    EWVWAP.bind(null, values, { bfx: 0.6, bitstamp: 0.2, kraken: 0.2 })
  )
})

test('EWVWAP - it should fail with NaN values', (t) => {
  const values = [
    { price: '10161', weightType: 'bfx' },
    { price: NaN, weightType: 'bitstamp' },
    { price: '10261.826', weightType: 'kraken' }
  ]

  t.exception.all(
    EWVWAP.bind(null, values, { bfx: 0.6, bitstamp: 0.2, kraken: 0.2 })
  )
})

test('EWVWAP - it should fail with invalid config', (t) => {
  const values = [
    { price: '10161', weightType: 'bfx' },
    { price: '10261.235', weightType: 'bitstamp' },
    { price: '10261.826', weightType: 'kraken' }
  ]

  t.exception(
    EWVWAP.bind(null, values, { bfx: 0.33, bitstamp: 0.33, kraken: 0.33 }),
    /ERR_INVALID_WEIGHT_CONF/
  )
})

test('EWVWAP - it should throw with wrong weightType in values', async (t) => {
  const values = [
    { price: '10161', weightType: 'bfx' },
    { price: '10232', weightType: 'bitstamp' },
    { price: '10510.25847', weightType: 'binance' },
    { price: '10261.826', weightType: 'kraken' }
  ]

  t.exception(
    EWVWAP.bind(null, values, { bfx: 0.6, bitstamp: 0.2, kraken: 0.2 }),
    /ERR_INVALID_WEIGHT_TYPE/
  )
})

test('EWVWAP - it should throw with multiple weights of same type', async (t) => {
  const values = [
    { price: '10161', weightType: 'bfx' },
    { price: '10261.235', weightType: 'bfx' },
    { price: '10324.2567', weightType: 'bfx' },
    { price: '10724', weightType: 'bfx' },
    { price: '10510.25847', weightType: 'bitstamp' },
    { price: '10261.826', weightType: 'kraken' }
  ]

  t.exception(
    EWVWAP.bind(null, values, { bfx: 0.6, bitstamp: 0.2, kraken: 0.2 }),
    /ERR_DUP_WEIGHT_PRICES/
  )
})

test('EWVWAP - it return 0 with no values', async (t) => {
  t.is(
    VWAP([], { bfx: 0.6, bitstamp: 0.2, kraken: 0.2 }),
    '0'
  )
})

test('EWVWAP - it should match the expected value', async (t) => {
  const values = [
    { price: '10161', weightType: 'bfx' },
    { price: '10510.25847', weightType: 'bitstamp' },
    { price: '10261.826', weightType: 'kraken' }
  ]

  const res = EWVWAP(values, { bfx: 0.6, bitstamp: 0.2, kraken: 0.2 })
  t.is(res, '10251.016894')
})
