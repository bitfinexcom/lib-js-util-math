'use strict'

const { nBN, validateBN } = require('./bn')
const { VWAP } = require('./vwap')

/**
 * @param {[number, number][]} bids 0 - price, 1 - amount
 * @param {[number, number][]} asks 0 - price, 1 - amount
 * @param {number} bookDepth
 */
const impactMidPrice = (bids, asks, bookDepth) => {
  validateBN(bookDepth, { allowNegative: false, allowZero: false })
  if (!Array.isArray(bids) || !Array.isArray(asks)) {
    throw new Error('ERR_INVALID_BID_ASK_TYPE')
  }
  [bids, asks].forEach(x => {
    if (x.length === 0) throw new Error('ERR_INVALID_BID_ASK_LENGTH')

    x.forEach(elem => {
      if (!Array.isArray(elem)) throw new Error('ERR_INVALID_BID_ASK_ELEM_TYPE')
      if (elem.length !== 2) throw new Error('ERR_INVALID_BID_ASK_ELEM_LENGTH')
      elem.forEach(y => validateBN(y, { allowZero: false, allowNegative: false }))
    })
  })

  const bidsUntilDepth = []
  let bidsTotal = nBN(0)

  const asksUntilDepth = []
  let asksTotal = nBN(0)

  for (let i = 0; i < bids.length; i++) {
    const bid = bids[i]

    if (bidsTotal.plus(bid[1]).isGreaterThanOrEqualTo(bookDepth)) {
      const diff = bidsTotal.plus(bid[1]).minus(bookDepth)
      bid[1] = nBN(bid[1]).minus(diff)
    }
    bidsTotal = bidsTotal.plus(bid[1])

    bidsUntilDepth.push({ price: bid[0], volume: bid[1] })
    if (bidsTotal.isGreaterThanOrEqualTo(bookDepth)) break
  }

  for (let i = 0; i < asks.length; i++) {
    const ask = asks[i]

    if (nBN(asksTotal).plus(ask[1]).isGreaterThanOrEqualTo(bookDepth)) {
      const diff = nBN(asksTotal).plus(ask[1]).minus(bookDepth)
      ask[1] = nBN(ask[1]).minus(diff)
    }
    asksTotal = asksTotal.plus(ask[1])

    asksUntilDepth.push({ price: ask[0], volume: ask[1] })
    if (asksTotal.isGreaterThanOrEqualTo(bookDepth)) break
  }

  if (bidsTotal.isLessThan(bookDepth) || asksTotal.isLessThan(bookDepth)) {
    return null
  }

  const impactBidPrice = VWAP(bidsUntilDepth) // also validates numbers
  const impactOfferPrice = VWAP(asksUntilDepth) // also validates numbers
  return nBN(impactBidPrice)
    .plus(impactOfferPrice).dividedBy(2).toString()
}

module.exports = impactMidPrice
