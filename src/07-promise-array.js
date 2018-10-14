const fetch = require('node-fetch')
const sparkly = require('./sparkly')

async function fetchDollarRate (date, symbol) {
  const response = await fetch(`http://data.fixer.io/${date}?base=EUR&symbols=${symbol}&access_key=${process.env.FIXER_ACCESS_KEY}`)

  if (!response.ok) throw new Error('failed request')

  const ratesResponse = await response.json()

  return ratesResponse.rates[symbol]
}

async function main () {
  const ratePromises = []
  for (let i = 1; i < 10; ++i) {
    ratePromises.push(fetchDollarRate(`2018-10-0${i}`, 'PLN'))
  }

  const rates = []
  for (let i = 0; i < ratePromises.length; ++i) {
    rates.push(await ratePromises[i])
  }

  console.log(sparkly(rates))
}

main()
