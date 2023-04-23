import Head from "next/head";
import { Manrope } from "next/font/google";
import styles from "./app.module.scss";
import { useEffect, useState } from "react";
import { IChain } from "@/types";
import Chain from "@/components/molecules/Chain";
import ExchangeChains from "@/components/atoms/ExchangeChains";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Image from "next/image";
import USDCInput from "@/components/atoms/USDCInput";
import DestinationGas from "@/components/molecules/DestinationGas";
import getPublic from "@/utils/getPublic";
import TransactionDetail from "@/components/atoms/TransactionDetail";
import DarkModeSwitch from "@/components/atoms/DarkModeSwitch";
// import Splash from "@/components/atoms/Splash";

import { constants, Contract, ethers } from "ethers";
import {
  ChainId,
  CHAIN_ID_AVAX,
  CHAIN_ID_ETH,
  getEmitterAddressEth,
  getSignedVAAWithRetry,
  isEVMChain,
  parseSequenceFromLogEth,
  parseVaa,
  uint8ArrayToHex,
} from "@certusone/wormhole-sdk";
import { formatUnits } from "ethers/lib/utils.js";

const USDC_ETH_MAINNET_TOKEN = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const USDC_ETH_TESTNET_TOKEN = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
const MAX_DECIMALS = 5;

const ETH_NETWORK_CHAIN_ID_TESTNET = 5; // https://chainlist.org/chain/5?testnets=true
const AVAX_NETWORK_CHAIN_ID_TESTNET = 43113; // https://chainlist.org/chain/43113?testnets=true
const RPCS = {
  [ETH_NETWORK_CHAIN_ID_TESTNET]: "https://rpc.ankr.com/eth_goerli",
  [AVAX_NETWORK_CHAIN_ID_TESTNET]: "https://api.avax-test.network/ext/bc/C/rpc",
};
const getEvmChainId = (chainId: ChainId) =>
  chainId === CHAIN_ID_ETH
    ? ETH_NETWORK_CHAIN_ID_TESTNET
    : chainId === CHAIN_ID_AVAX
    ? AVAX_NETWORK_CHAIN_ID_TESTNET
    : undefined;

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
  const [source, setSource] = useState<IChain>("AVAX");
  const changeSource = () => setSource(source === "AVAX" ? "ETH" : "AVAX");

  // WALLET STUFF
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();

  const { data } = useBalance({
    address: address,
    token: USDC_ETH_TESTNET_TOKEN,
  });

  const handleWallet = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  const [connectWalletTxt, setConnectWalletTxt] = useState("...");
  const [walletTxt, setWalletTxt] = useState<any>("...");
  const [balance, setBalance] = useState("");
  const [destinationGas, setDestinationGas] = useState(0);
  const [amount, setAmount] = useState("0");

  const changeDestinationGas = (percentage: number) => {
    if (maxDestinationGas) {
      const maxGas = Number(formatUnits(maxDestinationGas, "mwei"));
      const currentGas = ((maxGas * percentage) / 100).toFixed(MAX_DECIMALS);
      setDestinationGas(Number(currentGas));
    }
  };

  const changeAmount = (newAmount: string) => {
    if (balance && Number(newAmount) > Number(balance)) {
      return;
    }
    setAmount(newAmount);
  };

  useEffect(() => {
    console.log("address", address);
    console.log("isConnected", isConnected);
    console.log("data", data);
    if (data?.formatted) {
      setBalance(data.formatted);
    } else {
      setBalance("");
    }

    setConnectWalletTxt(isConnected ? "Disconnect" : "Connect");
    setWalletTxt(
      isConnected
        ? `${address?.slice(0, 6)}...${address?.slice(-6)}`
        : "Connect Wallet"
    );
  }, [address, isConnected, data]);

  // SMART CONTRACT STUFF
  const sourceChainId = source === "AVAX" ? CHAIN_ID_AVAX : CHAIN_ID_ETH;
  const destinationChainId = source === "AVAX" ? CHAIN_ID_ETH : CHAIN_ID_AVAX;

  // --

  const USDC_RELAYER_TESTNET: { [key in ChainId]?: string } = {
    [CHAIN_ID_ETH]: "0xbd227cd0513889752a792c98dab42dc4d952a33b",
    [CHAIN_ID_AVAX]: "0x45ecf5c7cf9e73954277cb7d932d5311b0f64982",
  };
  const sourceRelayContract = USDC_RELAYER_TESTNET[sourceChainId];
  const destinationRelayContract = USDC_RELAYER_TESTNET[destinationChainId];

  // ---

  const USDC_ADDRESSES_TESTNET: { [key in ChainId]?: string } = {
    [CHAIN_ID_ETH]: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    [CHAIN_ID_AVAX]: "0x5425890298aed601595a70AB815c96711a31Bc65",
  };
  const sourceAsset = USDC_ADDRESSES_TESTNET[sourceChainId];
  const destinationAsset = USDC_ADDRESSES_TESTNET[destinationChainId];

  // ---

  const [maxDestinationGas, setMaxDestinationGas] = useState<bigint | null>(
    null
  );

  // GET MAX DESTINATION GAS EFFECT
  useEffect(() => {
    setMaxDestinationGas(null);

    // null check
    if (!destinationRelayContract || !destinationAsset) return;

    const targetEVMChain = getEvmChainId(destinationChainId);
    if (!targetEVMChain) return;

    const targetRPC = RPCS[targetEVMChain];
    if (!targetRPC) return;

    const provider = new ethers.providers.StaticJsonRpcProvider(targetRPC);
    let cancelled = false;
    (async () => {
      const contract = new Contract(
        destinationRelayContract,
        [
          `function calculateMaxSwapAmountIn(
              address token
          ) external view returns (uint256)`,
        ],
        provider
      );
      const maxSwap = await contract.calculateMaxSwapAmountIn(destinationAsset);
      if (cancelled) return;

      console.log("maxSwap", maxSwap);
      console.log("maxSwap.toBigInt()", maxSwap.toBigInt());

      setMaxDestinationGas(maxSwap.toBigInt());
    })();

    return () => {
      cancelled = true;
    };
  }, [destinationRelayContract, destinationAsset, destinationChainId]);

  return (
    <>
      <Head>
        <title>USDC Bridge</title>
        <meta name="description" content="USDC bridge developed by xLabs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={getPublic("/favicon.ico")} />
      </Head>

      <main className={`${styles.main} ${manrope.className}`}>
        {/* <Splash /> */}

        <header className={styles.header}>
          <Image
            alt="stable logo"
            width={120}
            height={30}
            src={getPublic("/stable.png")}
          />
          <div className={styles.headerInteractions}>
            <DarkModeSwitch />
            <button onClick={() => !isConnected && handleWallet()}>
              {walletTxt}
            </button>
          </div>
        </header>

        <div className={styles.center}>
          <h2 className={styles.title}>
            <Image
              alt="USDC icon"
              width={42}
              height={42}
              src={getPublic("/usdc.png")}
            />
            <span>USDC Bridge</span>
          </h2>
          <h3 className={styles.subtitle}>
            The official way to bridge and send native USDC between Ethereum and
            Avalanche
          </h3>

          <div className={styles.container}>
            <div className={styles.fromToContainer}>
              <div className={styles.chain}>
                <div className={styles.boxText}>From</div>
                <Chain source={source} setSource={setSource} initial="AVAX" />
              </div>

              <ExchangeChains onClick={changeSource} source={source} />

              <div className={styles.chain}>
                <div className={styles.boxText}>To</div>
                <Chain source={source} setSource={setSource} initial="ETH" />
              </div>
            </div>

            <div className={styles.boxText}>Amount</div>
            <USDCInput
              value={amount}
              setValue={changeAmount}
              maxDecimals={MAX_DECIMALS}
            />

            {balance && (
              <div className={styles.balance}>
                <span className={styles.balanceTxt}>Balance {balance}</span>
                <span
                  onClick={() => changeAmount(balance)}
                  className={styles.maxTxt}
                >
                  MAX
                </span>
              </div>
            )}

            <DestinationGas
              gas={destinationGas}
              onChange={changeDestinationGas}
              maxDestinationGas={maxDestinationGas}
            />

            <div className={styles.separator} />

            <TransactionDetail />

            <button onClick={handleWallet}>{connectWalletTxt} Wallet</button>
          </div>

          <div className={styles.poweredBy}>
            <span>Powered by </span>
            <Image
              alt="Powered by Circle"
              src={getPublic("/circle.png")}
              width={120}
              height={30}
            />
          </div>
        </div>
      </main>
    </>
  );
}
