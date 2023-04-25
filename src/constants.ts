import {
  CHAIN_ID_AVAX,
  CHAIN_ID_ETH,
  ChainId,
  getEmitterAddressEth,
} from "@certusone/wormhole-sdk";

export type IChain = "AVAX" | "ETH";

export const USDC_ADDRESSES_TESTNET: { [key in ChainId]?: `0x${string}` } = {
  [CHAIN_ID_ETH]: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  [CHAIN_ID_AVAX]: "0x5425890298aed601595a70AB815c96711a31Bc65",
};

export const USDC_ADDRESSES_MAINNET: { [key in ChainId]?: `0x${string}` } = {
  [CHAIN_ID_ETH]: "0xTODO", // TODO
  [CHAIN_ID_AVAX]: "0xTODO", // TODO
};

export const AMOUNT_DECIMALS = 5;
export const USDC_DECIMALS = 6;

const ETH_NETWORK_CHAIN_ID_TESTNET = 5; // https://chainlist.org/chain/5?testnets=true
const AVAX_NETWORK_CHAIN_ID_TESTNET = 43113; // https://chainlist.org/chain/43113?testnets=true

export const RPCS = {
  [ETH_NETWORK_CHAIN_ID_TESTNET]: "https://rpc.ankr.com/eth_goerli",
  [AVAX_NETWORK_CHAIN_ID_TESTNET]: "https://api.avax-test.network/ext/bc/C/rpc",
};

export const getEvmChainId = (chainId: ChainId) =>
  chainId === CHAIN_ID_ETH
    ? ETH_NETWORK_CHAIN_ID_TESTNET
    : chainId === CHAIN_ID_AVAX
    ? AVAX_NETWORK_CHAIN_ID_TESTNET
    : undefined;

export const WEBAPP_URL = "https://dev.stable.io/";

export const CIRCLE_BRIDGE_ADDRESSES: { [key in ChainId]?: string } = {
  [CHAIN_ID_ETH]: "0xdAbec94B97F7b5FCA28f050cC8EeAc2Dc9920476",
  [CHAIN_ID_AVAX]: "0x0fC1103927AF27aF808D03135214718bCEDbE9ad",
};

const ETH_SWAP_CONTRACT_ADDRESS = "0x4c2a0a56e017143dd576f59471083357354b88de";
const AVAX_SWAP_CONTRACT_ADDRESS = "0x1ea3652b401532297032ae6e7ac4d8533446876d";

const ETH_CIRCLE_EMITTER_ADDRESS = "0x26413e8157CD32011E726065a5462e97dD4d03D9";

const AVAX_CIRCLE_EMITTER_ADDRESS =
  "0xa9fB1b3009DCb79E2fe346c16a604B8Fa8aE0a79";

export const CIRCLE_EMITTER_ADDRESSES: { [key in ChainId]?: string } = {
  [CHAIN_ID_ETH]: ETH_CIRCLE_EMITTER_ADDRESS,
  [CHAIN_ID_AVAX]: AVAX_CIRCLE_EMITTER_ADDRESS,
};

export const CIRCLE_DOMAINS: { [key in ChainId]?: number } = {
  [CHAIN_ID_ETH]: 0,
  [CHAIN_ID_AVAX]: 1,
};

export const CIRCLE_DOMAIN_TO_WORMHOLE_CHAIN: { [key in number]: ChainId } = {
  0: CHAIN_ID_ETH,
  1: CHAIN_ID_AVAX,
};

const CIRCLE_INTEGRATION_ADDRESS_ETHEREUM =
  "0x0a69146716b3a21622287efa1607424c663069a4";

const CIRCLE_INTEGRATION_ADDRESS_AVALANCHE =
  "0x58f4c17449c90665891c42e14d34aae7a26a472e";

const USDC_WH_INTEGRATION: { [key in ChainId]?: string } = {
  [CHAIN_ID_ETH]: CIRCLE_INTEGRATION_ADDRESS_ETHEREUM,
  [CHAIN_ID_AVAX]: CIRCLE_INTEGRATION_ADDRESS_AVALANCHE,
};

export const USDC_WH_EMITTER: { [key in ChainId]?: string } = {
  [CHAIN_ID_ETH]: getEmitterAddressEth(USDC_WH_INTEGRATION[CHAIN_ID_ETH] || ""),
  [CHAIN_ID_AVAX]: getEmitterAddressEth(
    USDC_WH_INTEGRATION[CHAIN_ID_AVAX] || ""
  ),
};

// ???
export const WORMHOLE_RPC_HOSTS = [
  "https://wormhole-v2-testnet-api.certus.one",
];
