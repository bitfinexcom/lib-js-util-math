'use strict'

const { nBN } = require('./bn')

/**
 * @param {{price: string|number, volume: string|number}[]} values
 * @returns {string}
 */
const VWAP = (values) => {
  // VWAP = SUM(price * volume) / SUM (volume)
  if (!values.length) return '0'

  let x = nBN(0)
  let y = nBN(0)
  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    x = x.plus(nBN(value.price).multipliedBy(value.volume))
    y = y.plus(value.volume)
  }

  return x.dividedBy(y).toFixed()
}

/**
 * @param {{price: string|number, weightType: string}[]} values
 * @param {{[key: string]: number}} weights e.g {'bfx': 0.7, 'kraken': 0.3}
 * @returns {string}
 */
const EWVWAP = (values, weights) => {
  // VWAP = SUM(price * weightType->weight) / SUM(weightType->weight)
  if (!values.length) return '0'

  let x = nBN(0)
  let y = nBN(0)
  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    x = x.plus(nBN(value.price).multipliedBy(weights[value.weightType]))
    y = y.plus(weights[value.weightType])
  }

  return x.dividedBy(y).toFixed()
}

module.exports = {
  VWAP,
  EWVWAP
}
