const fetch = require('node-fetch')

async function fetchDollarRate (date, symbol) {
  const response = await fetch(`https://api.fixer.io/${date}?base=USD&symbols=${symbol}`)

  if (!response.ok) throw new Error('failed request')

  const ratesResponse = await response.json()

  return ratesResponse.rates[symbol]
}

async function main () {
  const ilsRate = await fetchDollarRate('2017-12-20', 'ILS')
  const eurRate = await fetchDollarRate('2017-12-20', 'EUR')

  console.log(ilsRate, eurRate)
}

main()
