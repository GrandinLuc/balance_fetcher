declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POLYGON_ENDPOINT: string;
      POLYGON_API_KEY: string;

      INFURA_ETHEREUM_MAINNET_ENDPOINT: string;
      INFURA_API_KEY: string;

      ARBITRUM_ENDPOINT: string;
      ARBITRUM_MAINNET_API_KEY: string;

      COINMARKETCAP_API_KEY: string;
      COINMARKETCAP_ENDPOINT: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
