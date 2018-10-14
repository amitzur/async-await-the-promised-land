const fetch = require('node-fetch')

async function fetchDollarValue (date, base, symbol, value) {
  const response = await fetch(`http://data.fixer.io/${date}?base=EUR&symbols=${symbol}&access_key=${process.env.FIXER_ACCESS_KEY}`)

  if (!response.ok) throw new Error('failed request')

  const ratesResponse = await response.json()

  return ratesResponse.rates[symbol]
}

async function main () {
  const rate = await fetchDollarValue('20000000017-12-22', 'EUR', 'PLN', 1)
    .catch(err => err.code === 'ECONNREFUSED' ? Promise.reject(err) : 'problem!')

  console.log(rate)
}

main()
