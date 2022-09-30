import fs from "fs";
import { TokenInfo } from "./types";

export const getTokenInfo = (tokenTicker: string) => {
  let tokensRaw = fs.readFileSync("../tokens.json");

  let parsedTokens: { [x: string]: TokenInfo } = JSON.parse(
    tokensRaw.toString()
  );

  return parsedTokens[tokenTicker];
};

export const getAllTokens = (): { [x: string]: TokenInfo } => {
  let tokensRaw = fs.readFileSync("./tokens.json");

  let parsedTokens: { [x: string]: TokenInfo } = JSON.parse(
    tokensRaw.toString()
  );

  return parsedTokens;
};

export const getCoinMarketCapIds = async (): Promise<Response> => {
  return await fetch(
    `${process.env.COINMARKETCAP_ENDPOINT}/v2/cryptocurrency/info`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Cmc_pro_api_key": process.env.COINMARKETCAP_API_KEY,
      },
      method: "GET",
    }
  );
};
export const getCoinMarketCapIdsForContractAddresses = async (
  contractAdresses: string
): Promise<Response> => {
  return await fetch(
    `${process.env.COINMARKETCAP_ENDPOINT}/v2/cryptocurrency/info?address=${contractAdresses}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Cmc_pro_api_key": process.env.COINMARKETCAP_API_KEY,
      },
      method: "GET",
    }
  );
};

export const getTokenPrice = async (tokenId: string): Promise<Response> => {
  return await fetch(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${tokenId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Cmc_pro_api_key": process.env.COINMARKETCAP_API_KEY,
      },
      method: "GET",
    }
  );
};
export const getTokenPriceWithSlug = async (
  slug: string
): Promise<Response> => {
  return await fetch(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=${slug}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Cmc_pro_api_key": process.env.COINMARKETCAP_API_KEY,
      },
      method: "GET",
    }
  );
};

// get the price for a given id `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest/items?address=${contractAddress}`
