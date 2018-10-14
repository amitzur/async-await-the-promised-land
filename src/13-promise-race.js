const fetch = require('node-fetch')

async function fetchDollarRate (date, symbol) {
  const response = await fetch(`http://data.fixer.io/${date}?base=EUR&symbols=${symbol}&access_key=${process.env.FIXER_ACCESS_KEY}`)

  if (!response.ok) throw new Error('failed request')

  const ratesResponse = await response.json()

  return ratesResponse.rates[symbol]
}

async function main () {
  const rate1 = await Promise.race([fetchDollarRate('2018-10-13', 'PLN'), delay(50)])
  const rate2 = await Promise.race([fetchDollarRate('2018-10-13', 'PLN'), delay(5000)])

  console.log(rate1, rate2)
}

async function delay (ms) {
  await new Promise(resolve => setTimeout(resolve, ms))
}

main()
