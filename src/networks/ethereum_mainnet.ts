import {
  CoinmarketcapIds,
  CoinmarketcapMetadata,
  CoinMarketCapQuote,
  ResponseBody,
} from "../types";
import Web3 from "web3";
import { getAddressBalances } from "eth-balance-checker/lib/web3";
import {
  getAllTokens,
  getCoinMarketCapIds,
  getCoinMarketCapIdsForContractAddresses,
  getTokenPrice,
  getTokenPriceWithSlug,
} from "../utils";
import { getAccountTokenBalanceInfura } from "./infura_chains";

const getAccountBalance = async (address: string): Promise<ResponseBody[]> => {
  const web3 = new Web3(
    `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
  );

  let balancePerToken = await getAccountTokenBalanceInfura(address, "ethereum");

  let ethBalance = await web3.eth.getBalance(address);

  let ethPriceData = (
    (await (
      await getTokenPriceWithSlug("ethereum")
    ).json()) as CoinMarketCapQuote
  ).data;
  for (var i = 0; i <= 10; i++) {
    ((ind) => {
      setTimeout(async () => {
        if (!ethPriceData) {
          i = 10;
        } else {
          ethPriceData = (
            (await (
              await getTokenPriceWithSlug("ethereum")
            ).json()) as CoinMarketCapQuote
          ).data;
        }
      }, 100);
    })(i);
  }

  let ethUsdPrice = ethPriceData[Object.keys(ethPriceData)[0]].quote.USD.price;

  balancePerToken.push({
    token_address: "",
    balance_usd: ethUsdPrice * parseInt(ethBalance),
    name: "Ethereum",
    symbol: "ETH",
    balance: ethBalance,
    decimals: 0,
  });

  return balancePerToken;
};

export const DataFetcherImplementation = { ethereum: getAccountBalance };
