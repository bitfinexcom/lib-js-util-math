'use strict'

const { emaMultiplier, EMA, SMA } = require('../')

const period = 10
const multiplier = emaMultiplier(period)

const initEMA = SMA(['7300', '7301.5', '7301.05', '7301.35', '7300.95', '7301.35', '7300.97', '7301.01', '7301.06', '7300.567'])

const lastPrice = '7301.41'
const ema = EMA(lastPrice, initEMA, multiplier)
console.log(multiplier, initEMA, ema) // prints 0.18181818181818181818 7300.9807 7301.058754545454545454544674
