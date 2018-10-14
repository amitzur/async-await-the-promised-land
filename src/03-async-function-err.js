const fetch = require('node-fetch')

async function fetchDollarRate (date, symbol) {
  const response = await fetch(`http://data.fixer.io-error/${date}?base=EUR&symbols=${symbol}`)

  if (!response.ok) throw new Error('failed request')

  const ratesResponse = await response.json()

  return ratesResponse.rates[symbol]
}

async function main () {
  try {
    console.log(await fetchDollarRate('2018-10-13', 'PLN'))
  } catch (err) {
    console.error('Error, aborting...', err.stack || err)
    process.exit(1)
  }
}

main()
