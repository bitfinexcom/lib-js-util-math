'use strict'

const test = require('brittle')
const { nBN } = require('../src/bn')
const impactMidPrice = require('../src/impact-mid-price')

test('it should fail with incompatible type', (t) => {
  t.exception(
    impactMidPrice.bind(null, {}, {}, 10),
    /ERR_INVALID_BID_ASK_TYPE/
  )

  t.exception(
    impactMidPrice.bind(null, [[1000, 1], { price: 10000, amount: 33 }], [[1000, 13], [1000, 33]], 10),
    /ERR_INVALID_BID_ASK_ELEM_TYPE/
  )

  t.exception(
    impactMidPrice.bind(null, [[1000, 1], [1000, 13]], [[1000, 13], { price: 10000, amount: 33 }], 10),
    /ERR_INVALID_BID_ASK_ELEM_TYPE/
  )
})

test('it should fail with invalid array lengths', (t) => {
  t.exception(
    impactMidPrice.bind(null, [], [], 10),
    /ERR_INVALID_BID_ASK_LENGTH/
  )

  t.exception(
    impactMidPrice.bind(null, [[1000, 3], [1000, 13]], [[1000, 13], [1000]], 10),
    /ERR_INVALID_BID_ASK_ELEM_LENGTH/
  )
})

test('it should fail with NaN values', (t) => {
  t.exception(
    impactMidPrice.bind(null, [[1000, 1], [null, 13]], [[1000, 13], [1000, 33]], 10),
    /ERR_NUM_NAN/
  )

  t.exception(
    impactMidPrice.bind(null, [[1000, 1], [1000, 13]], [[1000, 13], [null, 33]], 10),
    /ERR_NUM_NAN/
  )
})

test('it should fail with negative amounts', (t) => {
  t.exception(
    impactMidPrice.bind(null, [[1000, 1], ['-1000', 13]], [[1000, 13], [1000, 33]], 10),
    /ERR_NUM_NOT_POS/
  )

  t.exception(
    impactMidPrice.bind(null, [[1000, 1], [1000, 13]], [[1000, 13], [-1000, 33]], 10),
    /ERR_NUM_NOT_POS/
  )
})

test('it should fail with invalid depth param', (t) => {
  t.exception(
    impactMidPrice.bind(null, [[1000, 1], [1000, 13]], [[1000, 13], [1000, 33]], 'a123'),
    /ERR_NUM_NAN/
  )

  t.exception(
    impactMidPrice.bind(null, [[1000, 1], [1000, 13]], [[1000, 13], [1000, 33]], null),
    /ERR_NUM_NAN/
  )

  t.exception(
    impactMidPrice.bind(null, [[1000, 1], [null, 13]], [[1000, 13], [1000, 33]], '-10'),
    /ERR_NUM_NOT_POS/
  )

  t.exception(
    impactMidPrice.bind(null, [[1000, 1], [1000, 13]], [[1000, 13], [null, 33]], -10.33),
    /ERR_NUM_NOT_POS/
  )
})

test('it should calc expected value', (t) => {
  const bids = [
    [7897.0, 0.002],
    [7894.8, 1.0620],
    [7893.6, 1.2660],
    [7893.5, 0.0142],
    [7893.2, 1.4150],
    [7892.8, 0.2359],
    [7892.2, 0.0212],
    [7890.8, 0.2110],
    [7890.2, 0.0283],
    [7889.5, 1.6990],
    [7888.8, 0.0354],
    [7888.4, 2.1230],
    [7887.5, 0.0425],
    [7886.8, 2.8310]
  ]
  const asks = [
    [7900.9, 4.246],
    [7901.0, 0.3538],
    [7901.3, 1.062],
    [7902.9, 1.416],
    [7903.0, 0.002],
    [7903.6, 1.699],
    [7903.7, 0.0142],
    [7904.8, 2.124],
    [7905.0, 0.0212],
    [7906.4, 2.832],
    [7907.0, 0.0283],
    [7908.3, 0.0354],
    [7908.8, 3.54],
    [7909.7, 0.0425]
  ]
  const res = impactMidPrice(bids, asks, 10)
  t.is(nBN(res).toFixed(2), '7896.32')
})

test('it should work also with complex types', (t) => {
  const bids = [
    [7897.0, 0.002],
    [7894.8, 1.0620],
    [7893.6, 1.2660],
    ['7893.5', 0.0142],
    [7893.2, 1.4150],
    [7892.8, 0.2359],
    [7892.2, 0.0212],
    [7890.8, 0.2110],
    ['7890.2', 0.0283],
    ['7889.5', 1.6990],
    ['7888.8', 0.0354],
    [7888.4, nBN(2.1230)],
    [7887.5, nBN('0.0425')],
    [7886.8, 2.8310]
  ]
  const asks = [
    [7900.9, 4.246],
    [7901.0, 0.3538],
    [7901.3, nBN(1.062)],
    [7902.9, nBN('1.416')],
    [7903.0, 0.002],
    ['7903.6', 1.699],
    ['7903.7', 0.0142],
    [7904.8, 2.124],
    [7905.0, 0.0212],
    [7906.4, 2.832],
    [7907.0, 0.0283],
    [7908.3, 0.0354],
    [7908.8, 3.54],
    [7909.7, 0.0425]
  ]
  const res = impactMidPrice(bids, asks, 10)
  t.is(nBN(res).toFixed(2), '7896.32')
})

test('it should work with decimal depth', (t) => {
  const bids = [
    [7897.0, 0.002],
    [7894.8, 1.0620],
    [7893.6, 1.2660],
    ['7893.5', 0.0142],
    [7893.2, 1.4150],
    [7892.8, 0.2359],
    [7892.2, 0.0212],
    [7890.8, 0.2110],
    ['7890.2', 0.0283],
    ['7889.5', 1.6990],
    ['7888.8', 0.0354],
    [7888.4, nBN(2.1230)],
    [7887.5, nBN('0.0425')],
    [7886.8, 2.8310]
  ]
  const asks = [
    [7900.9, 4.246],
    [7901.0, 0.3538],
    [7901.3, nBN(1.062)],
    [7902.9, nBN('1.416')],
    [7903.0, 0.002],
    ['7903.6', 1.699],
    ['7903.7', 0.0142],
    [7904.8, 2.124],
    [7905.0, 0.0212],
    [7906.4, 2.832],
    [7907.0, 0.0283],
    [7908.3, 0.0354],
    [7908.8, 3.54],
    [7909.7, 0.0425]
  ]
  const res = impactMidPrice(bids, asks, 10.917)
  t.is(nBN(res).toFixed(2), '7896.28')
})

test('it should return null in insufficient depth', (t) => {
  const bids = [
    [7897.0, 0.002],
    [7894.8, 1.0620],
    [7893.6, 1.2660],
    ['7893.5', 0.0142],
    [7893.2, 1.4150],
    [7892.8, 0.2359],
    [7892.2, 0.0212],
    [7890.8, 0.2110],
    ['7890.2', 0.0283],
    ['7889.5', 1.6990],
    ['7888.8', 0.0354],
    [7888.4, nBN(2.1230)],
    [7887.5, nBN('0.0425')],
    [7886.8, 2.8310]
  ]
  const asks = [
    [7900.9, 4.246],
    [7901.0, 0.3538],
    [7901.3, nBN(1.062)],
    [7902.9, nBN('1.416')],
    [7903.0, 0.002],
    ['7903.6', 1.699],
    ['7903.7', 0.0142],
    [7904.8, 2.124],
    [7905.0, 0.0212],
    [7906.4, 2.832],
    [7907.0, 0.0283],
    [7908.3, 0.0354],
    [7908.8, 3.54],
    [7909.7, 0.0425]
  ]
  t.is(impactMidPrice(bids, asks.slice(0, 4), 10.917), null)
  t.is(impactMidPrice(bids.slice(0, 5), asks, 10.917), null)
})
