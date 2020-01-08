'use strict'

const { nBN } = require('./bn')
const { avg, max, min } = require('./array')

/**
 * @description Groups items based on size, e.g. if size 30 and we have values [10, 20, 30, 50] it will return [[10, 20], [30, 50]]
 * @param {any[]} values
 * @param {number} size
 * @param {(a) => string|number} selector Optional selector lambda, if not provided item will be used as value
 * @returns {any[][]}
 */
const groupBySize = (values, size, selector = null) => {
  if (!values.length) throw new Error('ERR_INVALID_RANGE')
  if (size <= 0) throw new Error('ERR_INVALID_RANGE')

  const cloned = [...values]
  cloned.sort((a, b) => {
    a = selector ? selector(a) : a
    b = selector ? selector(b) : b
    return nBN(a).comparedTo(b)
  })

  const start = selector ? selector(cloned[0]) : cloned[0]
  const end = selector ? selector(cloned[cloned.length - 1]) : cloned[cloned.length - 1]
  if ((nBN(start).isPositive() && nBN(end).isNegative()) ||
    (nBN(start).isNegative() && nBN(end).isPositive())) {
    throw new Error('ERR_INVALID_RANGE')
  }
  const len = Math.ceil(nBN(end).minus(start).dividedBy(size).toNumber())

  const groups = new Array(len)
  for (let i = 0; i < groups.length; i++) {
    groups[i] = []
  }

  for (let i = 0; i < cloned.length; i++) {
    const elem = cloned[i]
    const sizeVal = selector ? selector(elem) : elem

    const idx = Math.floor(nBN(sizeVal).minus(start).dividedBy(size).toNumber())
    if (!groups[idx]) groups[idx] = []
    groups[idx].push(elem)
  }

  return groups
}

/**
 * @param {any[]} values oldest price first
 * @param {(a) => string|number} selector Optional selector lambda, if not provided item will be used as value
 * @returns {{ close: string, high: string, low: string, open: string }}
 */
const kline = (values, selector = null) => {
  const last = values.length - 1

  const close = nBN(selector ? selector(values[0]) : values[0]).toString()
  const open = nBN(selector ? selector(values[last]) : values[last]).toString()
  const low = min(values, selector)
  const high = max(values, selector)

  return { close, high, low, open }
}

/**
 * @param {any[]} values oldest price first
 * @param {(a) => string|number} selector Optional selector lambda, if not provided item will be used as value
 */
const typicalPrice = (values, selector = null) => {
  const k = kline(values, selector)
  const prices = [k.close, k.open, k.low, k.high]

  return avg(prices)
}

const TWAP = (values, interval, tsSelector, priceSelector) => {
  const grouped = groupBySize(values, interval, tsSelector)
  const prices = []
  for (let i = 0; i < grouped.length; i++) {
    const group = grouped[i]
    if (!group.length) continue

    const price = typicalPrice(group, priceSelector)
    prices.push(price)
  }

  return avg(prices)
}

module.exports = {
  groupBySize,
  kline,
  typicalPrice,
  TWAP
}
