'use strict'

const { nBN, validateBN } = require('./bn')

/**
 * @param {{price: string|number, volume: string|number}[]} values
 * @returns {string}
 */
const VWAP = (values) => {
  // VWAP = SUM(price * volume) / SUM (volume)
  if (!values.length) return '0'

  values.forEach(value => {
    validateBN(value.price, { allowNegative: false, allowZero: false })
    validateBN(value.volume, { allowNegative: false, allowZero: false })
  })

  let x = nBN(0)
  let y = nBN(0)
  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    x = x.plus(nBN(value.price).multipliedBy(value.volume))
    y = y.plus(value.volume)
  }

  if (y.toFixed(0) === '0') throw new Error('ERR_WEIGHT_SUM_ZERO')
  return x.dividedBy(y).toFixed()
}

/**
 * @param {{price: string|number, weightType: string, ts: number}[]} values
 * @param {{[key: string]: number}} weights e.g {'bfx': 0.7, 'kraken': 0.3}, sum of all weights must be equal to 1
 * @returns {string}
 */
const EWVWAP = (values, weights) => {
  // EWVWAP = SUM(price * weightType->weight) / SUM(weightType->weight)
  if (!values.length) return '0'
  const weightKeys = Object.keys(weights)

  let sum = nBN(0)
  weightKeys.forEach(key => {
    const value = weights[key]
    validateBN(weights[key], { allowNegative: false })
    sum = sum.plus(value)
  })

  if (sum.toFixed() !== '1') throw new Error('ERR_INVALID_WEIGHT_CONF')

  const prices = {}
  for (let i = 0; i < values.length; i++) {
    const elem = values[i]
    if (!prices[elem.weightType]) {
      prices[elem.weightType] = elem
    } else if (prices[elem.weightType].ts < elem.ts) {
      prices[elem.weightType] = elem
    }
  }

  let x = nBN(0)
  let y = nBN(0)
  Object.keys(prices).forEach(key => {
    const value = prices[key]
    validateBN(value.price, { allowNegative: false, allowZero: false })

    x = x.plus(nBN(value.price).multipliedBy(weights[key]))
    y = y.plus(weights[key])
  })

  if (y.toFixed(0) === '0') throw new Error('ERR_WEIGHT_SUM_ZERO')
  return x.dividedBy(y).toFixed()
}

module.exports = {
  VWAP,
  EWVWAP
}
