const fetch = require('node-fetch')

async function main () {
  const response = await fetch(`http://data.fixer.io/2018-10-13?base=EUR&symbols=PLN&access_key=${process.env.FIXER_ACCESS_KEY}`)

  if (!response.ok) throw new Error('failed request')

  const ratesResponse = await response.json()

  console.log(ratesResponse.rates.PLN)
}

main()
