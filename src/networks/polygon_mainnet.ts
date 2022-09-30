import Web3 from "web3";
import { CoinMarketCapQuote, ResponseBody } from "../types";
import { getTokenPriceWithSlug } from "../utils";
import { getAccountTokenBalanceInfura } from "./infura_chains";

const getAccountBalance = async (address: string): Promise<ResponseBody[]> => {
  const web3 = new Web3(
    `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
  );

  let balancePerToken = await getAccountTokenBalanceInfura(address, "polygon");

  let maticBalance = await web3.eth.getBalance(address);
  let maticPriceData = (
    (await (
      await getTokenPriceWithSlug("polygon")
    ).json()) as CoinMarketCapQuote
  ).data;
  let ethUsdPrice =
    maticPriceData[Object.keys(maticPriceData)[0]].quote.USD.price;

  balancePerToken.push({
    token_address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    balance_usd: ethUsdPrice * parseInt(maticBalance),
    name: "Polygon",
    symbol: "MATIC",
    balance: maticBalance,
    decimals: 0,
  });

  return balancePerToken;
};

export const DataFetcherImplementation = { polygon: getAccountBalance };
