# lib-js-util-math

The lib includes the utilities depicted below:
- `BN` - BigNumber utilities
- `Array utilites` - Array utilites like min, max and avg with big number manipulation
- `VWAP` - Volume Weighted Average Price (VWAP) index utilities
- `Standard Deviation` - Standard deviation utilities
- `SMA` - Simple Moving Average 
- `EMA` - Exponential Moving Average 
- `TWAP` - Time Weighted Average Price utilities
- `Impact mid price` - Mid price from bids and asks until specific book depth

## Installing
```console
npm install --save https://github.com/bitfinexcom/lib-js-util-math.git
```

## Testing
```console
npm run test
```

## Usage
```javascript
const data = [
  { price: nBN(10500), y: 'jan', volume: '1' },
  { price: nBN(10700), y: 'feb', volume: '0.33' },
  { price: nBN(11500), y: 'mar', volume: '2.13' },
  { price: nBN('12300'), y: 'apr', volume: '5.26' },
  { price: nBN(5000), y: 'may', volume: '0.77' },
  { price: nBN(5100), y: 'jun', volume: '1.52' }
]

const vwap = VWAP(data)
console.log(vwap) // 10429.24613987284287011807

const dev = stdDeviation(data, a => a.price)
console.log(dev.toFixed()) // 2980.16591633568094682823

```

## Authors
- prdn
- robertkowalski
- vigan-abd
