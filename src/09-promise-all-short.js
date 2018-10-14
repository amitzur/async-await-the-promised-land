const fetch = require('node-fetch')
const sparkly = require('./sparkly')

async function fetchDollarRate (date, symbol) {
  const response = await fetch(`http://data.fixer.io/${date}?base=EUR&symbols=${symbol}&access_key=${process.env.FIXER_ACCESS_KEY}`)

  if (!response.ok) throw new Error('failed request')

  const ratesResponse = await response.json()

  return ratesResponse.rates[symbol]
}

async function main () {
  const ratePromises = range(1, 10).map(i => fetchDollarRate(`2018-10-0${i}`, 'PLN'))

  const rates = await Promise.all(ratePromises)

  console.log(sparkly(rates))
}

main()

function range (from, almostTo) {
  const ret = []
  for (let i = from; i < almostTo; ++i) {
    ret.push(i)
  }

  return ret
}
