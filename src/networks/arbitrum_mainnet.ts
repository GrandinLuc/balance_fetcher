import Web3 from "web3";
import { CoinMarketCapQuote, ResponseBody } from "../types";
import { getTokenPriceWithSlug } from "../utils";
import { getAccountTokenBalanceInfura } from "./infura_chains";

const getAccountBalance = async (address: string): Promise<ResponseBody[]> => {
  const web3 = new Web3(
    `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
  );

  let balancePerToken = await getAccountTokenBalanceInfura(address, "arbitrum");

  let arbBalance = await web3.eth.getBalance(address);
  let arbPriceData = (
    (await (
      await getTokenPriceWithSlug("arbitrum")
    ).json()) as CoinMarketCapQuote
  ).data;
  let ethUsdPrice = arbPriceData[Object.keys(arbPriceData)[0]].quote.USD.price;

  balancePerToken.push({
    token_address: "0xfa23661060bf6EF93e31aAf0447989E3c6d35022",
    balance_usd: ethUsdPrice * parseInt(arbBalance),
    name: "Arbitrum",
    symbol: "ARB",
    balance: arbBalance,
    decimals: 0,
  });

  return balancePerToken;
};

export const DataFetcherImplementation = { arbitrum: getAccountBalance };
