import { CHAIN_ID_ARBITRUM, CHAIN_ID_AVAX, CHAIN_ID_ETH, ChainId, getEmitterAddressEth } from "@certusone/wormhole-sdk";

export type IChain = "AVAX" | "ETH" | "ARBITRUM";
export const isMainnet = process.env.NEXT_PUBLIC_NETWORK === "mainnet";

export const USDC_ADDRESSES_TESTNET: { [key in ChainId]?: `0x${string}` } = {
  [CHAIN_ID_ETH]: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  [CHAIN_ID_AVAX]: "0x5425890298aed601595a70AB815c96711a31Bc65",
  [CHAIN_ID_ARBITRUM]: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
};

export const USDC_ADDRESSES_MAINNET: { [key in ChainId]?: `0x${string}` } = {
  [CHAIN_ID_ETH]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [CHAIN_ID_AVAX]: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",

  // TODO: USDC ADDRESS ON ARBITRUM MAINNET
  [CHAIN_ID_ARBITRUM]: "0x00_TODO_TODO_TODO_TODO_TODO_TODO_00x0",
};

export const AMOUNT_DECIMALS = 6;
export const USDC_DECIMALS = 6;

export const ETH_EXPLORER = isMainnet ? "https://etherscan.io/tx/" : "https://goerli.etherscan.io/tx/";
export const AVAX_EXPLORER = isMainnet ? "https://snowtrace.io/tx/" : "https://testnet.snowtrace.io/tx/";
export const ARBITRUM_EXPLORER = isMainnet ? "https://arbiscan.io/tx/" : "https://goerli.arbiscan.io/tx/";

export const getRelayFeedbackUrl = (att: number) => {
  if (typeof window !== "undefined") {
    // if (window.location.href.includes("localhost")) {
    // return isMainnet
    // ? `https://nextjs-cors-anywhere.vercel.app/api?endpoint=https://relayer.stable.io/v1/relays?test=hola${att}&txHash=`
    // : `https://nextjs-cors-anywhere.vercel.app/api?endpoint=https://relayer.dev.stable.io/v1/relays?test=hola${att}&txHash=`;
    // } else {
    return isMainnet ? "https://relayer.stable.io/v1/relays?txHash=" : "https://relayer.dev.stable.io/v1/relays?txHash=";
    // }
  }
};

const ETH_NETWORK_CHAIN_ID_TESTNET = 5; // https://chainlist.org/chain/5?testnets=true
const AVAX_NETWORK_CHAIN_ID_TESTNET = 43113; // https://chainlist.org/chain/43113?testnets=true
const ARBITRUM_NETWORK_CHAIN_ID_TESTNET = 421613; // https://chainlist.org/chain/421613

const ETH_NETWORK_CHAIN_ID_MAINNET = 1; // https://chainlist.org/chain/1
const AVAX_NETWORK_CHAIN_ID_MAINNET = 43114; // https://chainlist.org/chain/43114
const ARBITRUM_NETWORK_CHAIN_ID_MAINNET = 42161; // https://chainlist.org/chain/42161

export const RPCS_TESTNET = {
  [ETH_NETWORK_CHAIN_ID_TESTNET]: "https://rpc.ankr.com/eth_goerli",
  [AVAX_NETWORK_CHAIN_ID_TESTNET]: "https://api.avax-test.network/ext/bc/C/rpc",
  [ARBITRUM_NETWORK_CHAIN_ID_TESTNET]: "https://endpoints.omniatech.io/v1/arbitrum/goerli/public	",

  [ETH_NETWORK_CHAIN_ID_MAINNET]: "CONFIG ERROR",
  [AVAX_NETWORK_CHAIN_ID_MAINNET]: "CONFIG ERROR",
  [ARBITRUM_NETWORK_CHAIN_ID_MAINNET]: "CONFIG ERROR",
};

export const RPCS_MAINNET = {
  [ETH_NETWORK_CHAIN_ID_TESTNET]: "CONFIG ERROR",
  [AVAX_NETWORK_CHAIN_ID_TESTNET]: "CONFIG ERROR",
  [ARBITRUM_NETWORK_CHAIN_ID_TESTNET]: "CONFIG ERROR",

  [ETH_NETWORK_CHAIN_ID_MAINNET]: "https://rpc.ankr.com/eth",
  [AVAX_NETWORK_CHAIN_ID_MAINNET]: "https://api.avax.network/ext/bc/C/rpc",
  [ARBITRUM_NETWORK_CHAIN_ID_MAINNET]: "https://rpc.ankr.com/arbitrum",
};

export const getEvmChainId = (chainId: ChainId) =>
  chainId === CHAIN_ID_ETH
    ? isMainnet
      ? ETH_NETWORK_CHAIN_ID_MAINNET
      : ETH_NETWORK_CHAIN_ID_TESTNET
    : chainId === CHAIN_ID_AVAX
    ? isMainnet
      ? AVAX_NETWORK_CHAIN_ID_MAINNET
      : AVAX_NETWORK_CHAIN_ID_TESTNET
    : chainId === CHAIN_ID_ARBITRUM
    ? isMainnet
      ? ARBITRUM_NETWORK_CHAIN_ID_MAINNET
      : ARBITRUM_NETWORK_CHAIN_ID_TESTNET
    : undefined;

export const WEBAPP_URL = process.env.NEXT_APP_PUBLIC_URL || "/usdc-bridge";

// export const CIRCLE_BRIDGE_ADDRESSES: { [key in ChainId]?: string } = {
//   [CHAIN_ID_ETH]: isMainnet
//     ? "0xAaDA05BD399372f0b0463744C09113c137636f6a"
//     : "0xdAbec94B97F7b5FCA28f050cC8EeAc2Dc9920476",
//   [CHAIN_ID_AVAX]: isMainnet
//     ? "0x09Fb06A271faFf70A651047395AaEb6265265F13"
//     : "0x0fC1103927AF27aF808D03135214718bCEDbE9ad",
// };

export const CIRCLE_EMITTER_ADDRESSES: { [key in ChainId]?: string } = {
  [CHAIN_ID_ETH]: isMainnet ? "0x0a992d191DEeC32aFe36203Ad87D7d289a738F81" : "0x26413e8157CD32011E726065a5462e97dD4d03D9",
  [CHAIN_ID_AVAX]: isMainnet ? "0x8186359aF5F57FbB40c6b14A588d2A59C0C29880" : "0xa9fB1b3009DCb79E2fe346c16a604B8Fa8aE0a79",
  [CHAIN_ID_ARBITRUM]: isMainnet
    ? "" // TODO TODO TODO TODO
    : "0x109bc137cb64eab7c0b1dddd1edf341467dc2d35",
};

// export const CIRCLE_DOMAINS: { [key in ChainId]?: number } = {
//   [CHAIN_ID_ETH]: 0,
//   [CHAIN_ID_AVAX]: 1,
//   [CHAIN_ID_ARBITRUM]: 2, // TODO: CHECK IF CORRECT https://developers.circle.com/stablecoin/docs/cctp-technical-reference#domain
// };

// const USDC_WH_INTEGRATION: { [key in ChainId]?: string } = {
//   [CHAIN_ID_ETH]: "0x0a69146716b3a21622287efa1607424c663069a4",
//   [CHAIN_ID_AVAX]: "0x58f4c17449c90665891c42e14d34aae7a26a472e",
//   [CHAIN_ID_ARBITRUM]: "0x2e8f5e00a9c5d450a72700546b89e2b70dfb00f2",
// };

// export const USDC_WH_EMITTER: { [key in ChainId]?: string } = {
//   [CHAIN_ID_ETH]: getEmitterAddressEth(USDC_WH_INTEGRATION[CHAIN_ID_ETH] || ""),
//   [CHAIN_ID_AVAX]: getEmitterAddressEth(
//     USDC_WH_INTEGRATION[CHAIN_ID_AVAX] || ""
//   ),
//   [CHAIN_ID_ARBITRUM]: getEmitterAddressEth(
//     USDC_WH_INTEGRATION[CHAIN_ID_ARBITRUM] || ""
//   ),
// };

export const USDC_RELAYER_TESTNET: { [key in ChainId]?: string } = {
  [CHAIN_ID_ETH]: "0x17da1ff5386d044c63f00747b5b8ad1e3806448d",
  [CHAIN_ID_AVAX]: "0x774a70bbd03327c21460b60f25b677d9e46ab458",
  [CHAIN_ID_ARBITRUM]: "0xbf683d541e11320418ca78ec13309938e6c5922f",
};

export const USDC_RELAYER_MAINNET: { [key in ChainId]?: string } = {
  [CHAIN_ID_ETH]: "0x32dec3f4a0723ce02232f87e8772024e0c86d834",
  [CHAIN_ID_AVAX]: "0x32dec3f4a0723ce02232f87e8772024e0c86d834",
  [CHAIN_ID_ARBITRUM]: "", // TODO TODO TODO TODO
};
