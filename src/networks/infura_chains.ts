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

export const getAccountTokenBalanceInfura = async (
  address: string,
  chain: string
): Promise<ResponseBody[]> => {
  fetch(
    `https://${
      chain === "ethereum" ? "" : chain + "-"
    }mainnet.infura.io/v3/e31980edce4c4ddbad1f095b620bb40f`,
    {
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );

  // TODO: change to .env variables
  const web3 = new Web3(
    `https://${chain === "ethereum" ? "" : chain + "-"}mainnet.infura.io/v3/${
      process.env.INFURA_API_KEY
    }`
  );

  let tokens = getAllTokens();

  let tokenAdresses: string[] = Object.keys(tokens).map((id: string) => {
    return tokens[id].address;
  });

  let balanceForAllTokens = await getAddressBalances(
    web3,
    address,
    tokenAdresses
  );

  let nonNullBalances: { address: string; balance: string }[] = Object.keys(
    balanceForAllTokens
  )
    // Transforming the object into a list
    .map((address: string): { address: string; balance: string } => {
      return {
        address: address,
        balance: balanceForAllTokens[address],
      };
    })
    .filter(
      (addressPricePair: { address: string; balance: string }) =>
        balanceForAllTokens[addressPricePair.address] !== "0"
    );

  let cmcIds: {
    address: string;
    id: string;
    amount: string;
    symbol: string;
    name: string;
  }[] = [];

  for (let i = 0; i < nonNullBalances.length; i++) {
    let responseData = (
      (await (
        await getCoinMarketCapIdsForContractAddresses(
          nonNullBalances[i].address
        )
      ).json()) as CoinmarketcapMetadata
    ).data;

    if (responseData) {
      let id = responseData[Object.keys(responseData)[0]].id;
      let symbol = responseData[Object.keys(responseData)[0]].slug;
      let name = responseData[Object.keys(responseData)[0]].name;

      cmcIds.push({
        address: nonNullBalances[i].address,
        id: id.toString(),
        amount: nonNullBalances[i].balance,
        symbol,
        name,
      });
    }
  }

  let cmcIdsWithDecimals: {
    address: string;
    id: string;
    amount: string;
    symbol: string;
    name: string;
    decimals: number;
  }[] = cmcIds.map((e) => {
    let decimals = 0;

    for (let i = 0; i < Object.keys(tokens).length; i++) {
      decimals = tokens[Object.keys(tokens)[i]].decimals;
    }

    return {
      ...e,
      decimals,
    };
  });

  let balancePerToken: {
    token_address: string;
    balance: string;
    balance_usd: number;
    name: string;
    symbol: string;
    decimals: number;
  }[] = await Promise.all(
    cmcIdsWithDecimals.map(
      async (e: {
        address: string;
        id: string;
        amount: string;
        symbol: string;
        name: string;
        decimals: number;
      }) => {
        let responseBody: CoinMarketCapQuote = await (
          await getTokenPrice(e.id)
        ).json();

        let balance_usd = 0;
        try {
          balance_usd =
            (responseBody.data[Object.keys(responseBody.data)[0]].quote.USD
              .price *
              parseInt(e.amount)) /
            Math.pow(10, e.decimals);
        } catch (error) {
          console.log("Couldn't get the token price for the token: ", e.name);
        }

        return {
          token_address: e.address,
          balance_usd,
          name: e.name,
          symbol: e.symbol,
          balance: e.amount,
          decimals: e.decimals,
        };
      }
    )
  );

  return balancePerToken;
};
