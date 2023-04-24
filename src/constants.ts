import { CHAIN_ID_AVAX, CHAIN_ID_ETH, ChainId } from "@certusone/wormhole-sdk";

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