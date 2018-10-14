const fetch = require('node-fetch')

async function fetchDollarRate (date, symbol) {
  const response = await fetch(`http://data.fixer.io/${date}?base=EUR&symbols=${symbol}&access_key=${process.env.FIXER_ACCESS_KEY}`)

  if (!response.ok) throw new Error('failed request')

  const ratesResponse = await response.json()

  return ratesResponse.rates[symbol]
}

async function main () {
  const ilsRatePromise = fetchDollarRate('2018-10-13', 'PLN')
  const eurRatePromise = fetchDollarRate('2018-10-13', 'USD')

  const ilsRate = await ilsRatePromise
  const eurRate = await eurRatePromise

  console.log(ilsRate, eurRate)
}

main()
