export type ResponseBody = {
  token_address: string; // "0x6b175474e89094c44da98b954eedeac495271d0f";
  name: string; // "DAI Stablecoin";
  symbol: string; // "DAI";
  decimals: number; // 18;
  balance: string; // "1234990000000000000000";
  balance_usd: number; // 1234.99;
};

export type TokenInfo = {
  address: string; // "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  decimals: number; // 18;
  ens_address: string; // "";
  logo: {
    height: string; // "250";
    ipfs_hash: string; // "";
    src: string; // "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png";
    width: string; // "250";
  };
  name: string; // "Uniswap";
  social: {
    blog: string; // "https://uniswap.org/blog/";
    chat: string; // "https://discord.com/invite/XErMcTq";
    facebook: string; // "";
    forum: string; // "";
    github: string; // "";
    gitter: string; // "";
    instagram: string; // "";
    linkedin: string; // "";
    reddit: string; // "";
    slack: string; // "https://discord.com/invite/XErMcTq";
    telegram: string; // "";
    twitter: string; // "https://twitter.com/UniswapProtocol";
    youtube: string; //  "";
  };
  support: {
    email: string; // "";
    url: string; // "";
  };
  symbol: string; // "UNI";
  type: string; // "ERC20";
  website: string; // "https://uniswap.org/";
};

export type CoinmarketcapIds = {
  data: {
    id: number; //1839;
    rank: number; //3;
    name: string; // "Binance Coin";
    symbol: string; // "BNB";
    slug: string; // "binance-coin";
    is_active: number; //1;
    first_historical_data: string; // "2017-07-25T04:30:05.000Z";
    last_historical_data: string; // "2020-05-05T20:44:02.000Z";
    platform: {
      id: number; //1027;
      name: string; // "Ethereum";
      symbol: string; // "ETH";
      slug: string; // "ethereum";
      token_address: string; // "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
    };
  }[];
  status: {
    timestamp: string; // "2018-06-02T22:51:28.209Z";
    error_code: number; // 0;
    error_message: string; //"";
    elapsed: number; //10;
    credit_count: number; // 1;
  };
};
export type CoinMarketCapQuote = {
  data: {
    [x: string]: {
      id: number; // 1;
      name: string; // "Bitcoin";
      symbol: string; // "BTC";
      slug: string; // "bitcoin";
      is_active: number; // 1;
      is_fiat: number; // 0;
      circulating_supply: number; // 17199862;
      total_supply: number; // 17199862;
      max_supply: number; // 21000000;
      date_added: string; // "2013-04-28T00:00:00.000Z";
      num_market_pairs: number; // 331;
      cmc_rank: number; // 1;
      last_updated: string; // "2018-08-09T21:56:28.000Z";
      tags: string[]; //  ["mineable"];
      platform: string | null;
      self_reported_circulating_supply: string | null;
      self_reported_market_cap: string | null;
      quote: {
        USD: {
          price: number; // 6602.60701122;
          volume_24h: number; // 4314444687.5194;
          volume_change_24h: number; // -0.152774;
          percent_change_1h: number; //  0.988615;
          percent_change_24h: number; // 4.37185;
          percent_change_7d: number; // -12.1352;
          percent_change_30d: number; // -12.1352;
          market_cap: number; // 852164659250.2758;
          market_cap_dominance: number; // 51;
          fully_diluted_market_cap: number; // 952835089431.14;
          last_updated: string; // "2018-08-09T21:56:28.000Z";
        };
      };
    };
  };
  status: {
    timestamp: string; // "2022-09-16T12:55:38.976Z";
    error_code: number; // 0;
    error_message: string; // "";
    elapsed: number; // 10;
    credit_count: number; // 1;
  };
};

export type CoinmarketcapMetadata = {
  data: {
    [x: string]: {
      urls: {
        website: string[]; // ["https://www.ethereum.org/"];
        technical_doc: string[]; //["https://github.com/ethereum/wiki/wiki/White-Paper"];
        twitter: string[]; //["https://twitter.com/ethereum"];
        reddit: string[]; //["https://reddit.com/r/ethereum"];
        message_board: string[]; //["https://forum.ethereum.org/"];
        announcement: string[]; //["https://bitcointalk.org/index.php?topic=428589.0"];
        chat: string[]; //["https://gitter.im/orgs/ethereum/rooms"];
        explorer: string[]; //["https://blockchain.coinmarketcap.com/chain/ethereum","https://etherscan.io/","https://ethplorer.io/"];
        source_code: string[]; //["https://github.com/ethereum"];
      };
      logo: string; // "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png";
      id: number; // 1027;
      name: string; // "Ethereum";
      symbol: string; // "ETH";
      slug: string; // "ethereum";
      description: string; // "Ethereum (ETH) is a smart contract platform that enables developers to build decentralized applications (dapps) conceptualized by Vitalik Buterin in 2013. ETH is the native currency for the Ethereum platform and also works as the transaction fees to miners on the Ethereum network. Ethereum is the pioneer for blockchain based smart contracts. When running on the blockchain a smart contract becomes like a self-operating computer program that automatically executes when specific conditions are met. On the blockchain, smart contracts allow for code to be run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference. It can facilitate the exchange of money, content, property, shares, or anything of value. The Ethereum network went live on July 30th, 2015 with 72 million Ethereum premined.";
      notice: string | null;
      date_added: string; // "2015-08-07T00:00:00.000Z";
      date_launched: string; // "2015-08-07T00:00:00.000Z";
      tags: string[]; // ["mineable"];
      platform: string | null;
      category: string; // "coin";
      self_reported_circulating_supply: string | null;
      self_reported_market_cap: string | null;
      self_reported_tags: string | null;
    };
  };
  status: {
    timestamp: string; // "2022-09-16T12:54:29.038Z";
    error_code: number; // 0;
    error_message: string; // "";
    elapsed: number; // 10;
    credit_count: number; // 1;
  };
};
