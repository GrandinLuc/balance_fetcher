# Balance fetcher

For this project I am using the [Infura](https://infura.io/) API to get the blockchain data and the [CoinMarketCap](https://coinmarketcap.com) API to get the tokens and coin prices.

I made the choice to build this backend service in vanilla NodeJS for the sake of simplicity

I downloaded a list of tokens with their name and address into the tokens.json file that is from from https://raw.githubusercontent.com/crypto-crawler/erc20-token-list/master/tokens.json

I used mainly this address used for testing on the ethereum because it has multiple tokens: 0x6b175474e89094c44da98b954eedeac495271d0f

Please note that you need an infura API key in your .env file, for ethereum mainnet a free account is enough but for polygon and arbitrum you need a premium account. You will also need a CoinMarketCap API key, a free account is enough.
