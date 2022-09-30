import { ResponseBody } from "../types";
import { DataFetcherImplementation as arbitrum } from "./arbitrum_mainnet";
import { DataFetcherImplementation as ethereum } from "./ethereum_mainnet";
import { DataFetcherImplementation as polygon } from "./polygon_mainnet";

export interface DataFetcher {
  apiKey: string;
  endpoint: string;
  network: string;

  getAccountBalance: (address: string) => ResponseBody[];
}

const networks: { [x: string]: (address: string) => Promise<ResponseBody[]> } =
  {
    ...arbitrum,
    ...ethereum,
    ...polygon,
  };

export const findBalance = (
  network: string,
  address: string
): Promise<ResponseBody[]> => {
  if (!networks[network]) {
    throw "Network is either unknown or not yet implemented";
  }

  return networks[network](address);
};
