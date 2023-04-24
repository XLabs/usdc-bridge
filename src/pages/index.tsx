import Head from "next/head";
import { Manrope } from "next/font/google";
import styles from "./app.module.scss";
import { useEffect, useState } from "react";
import {
  IChain,
  USDC_ADDRESSES_TESTNET,
  AMOUNT_DECIMALS,
  RPCS,
  USDC_ADDRESSES_MAINNET,
  USDC_DECIMALS,
  getEvmChainId,
} from "@/constants";
import Chain from "@/components/molecules/Chain";
import ExchangeChains from "@/components/atoms/ExchangeChains";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useSwitchNetwork,
} from "wagmi";
import { avalanche, avalancheFuji, goerli, mainnet } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useDebounce } from "use-debounce";
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
import { formatUnits, parseUnits } from "ethers/lib/utils.js";

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
  const [source, setSource] = useState<IChain>("AVAX");
  const destination = source === "AVAX" ? "ETH" : "AVAX";
  const changeSource = () => setSource(destination);

  const sourceChainId = source === "AVAX" ? CHAIN_ID_AVAX : CHAIN_ID_ETH;
  const destinationChainId = source === "AVAX" ? CHAIN_ID_ETH : CHAIN_ID_AVAX;

  // ----
  // WALLET HANDLING ---
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector({
      chains: [avalancheFuji, goerli],
    }),
  });
  const { disconnect } = useDisconnect();

  useEffect(() => {
    changeAmount("0");
    setDestinationGas(0);
  }, [source]); // eslint-disable-line

  const { data } = useBalance({
    chainId: getEvmChainId(sourceChainId),
    address: address,
    token: USDC_ADDRESSES_TESTNET[sourceChainId],
  });

  const handleWallet = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ chainId: getEvmChainId(sourceChainId) });
    }
  };

  const [connectWalletTxt, setConnectWalletTxt] = useState("...");
  const [walletTxt, setWalletTxt] = useState<any>("...");
  const [balance, setBalance] = useState("");

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

  // ----
  // AMOUNTS HANDLING ---
  const [destinationGas, setDestinationGas] = useState(0);
  const [amount, setAmount] = useState("0");

  const [toNativeAmount, setToNativeAmount] = useState<bigint>(BigInt(0));
  const [debouncedToNativeAmount] = useDebounce(toNativeAmount, 500);

  const [sliderPercentage, setSliderPercentage] = useState(0);

  const changeDestinationGas = (percentage: number) => {
    setSliderPercentage(percentage);

    if (maxDestinationGas) {
      const maxGas = Number(formatUnits(maxDestinationGas, USDC_DECIMALS));
      const currentGas = ((maxGas * percentage) / 100).toFixed(AMOUNT_DECIMALS);

      if (+currentGas > +amount) {
        changeAmount(`${(+currentGas + 0.1).toFixed(2)}`);
        // setDestinationGas(+currentGas);
      } else {
        setDestinationGas(+currentGas);
        setToNativeAmount(parseUnits(currentGas, USDC_DECIMALS).toBigInt());
      }
    }
  };

  const changeAmount = (a: string) => {
    let newAmount = a;

    if (balance && +newAmount > +balance) {
      return;
    }

    while (newAmount.startsWith("00")) {
      newAmount = newAmount.substring(1);
    }
    if (
      newAmount.length > 1 &&
      newAmount.startsWith("0") &&
      !newAmount.startsWith("0.")
    ) {
      newAmount = newAmount.substring(1);
    }

    if (destinationGas > +newAmount) {
      changeDestinationGas(0);
    }

    setAmount(newAmount);
  };

  // ----
  // SMART CONTRACTS HANDLING ---

  const USDC_RELAYER_TESTNET: { [key in ChainId]?: string } = {
    [CHAIN_ID_ETH]: "0xbd227cd0513889752a792c98dab42dc4d952a33b",
    [CHAIN_ID_AVAX]: "0x45ecf5c7cf9e73954277cb7d932d5311b0f64982",
  };
  const sourceRelayContract = USDC_RELAYER_TESTNET[sourceChainId];
  const destinationRelayContract = USDC_RELAYER_TESTNET[destinationChainId];

  const sourceAsset = USDC_ADDRESSES_TESTNET[sourceChainId];
  const destinationAsset = USDC_ADDRESSES_TESTNET[destinationChainId];

  const [maxDestinationGas, setMaxDestinationGas] = useState<bigint | null>(
    null
  );
  const [estimatedGas, setEstimatedGas] = useState<bigint | null>(null);

  // GET MAX DESTINATION GAS ON USDC EFFECT
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

      setMaxDestinationGas(maxSwap.toBigInt());
    })();

    return () => {
      cancelled = true;
    };
  }, [destinationRelayContract, destinationAsset, destinationChainId]);

  // GET ESTIMATED GAS ON NATIVE TOKEN EFFECT
  useEffect(() => {
    setEstimatedGas(null);
    if (!destinationRelayContract || !destinationAsset) return;

    const destinationEVMChain = getEvmChainId(destinationChainId);
    if (!destinationEVMChain) return;

    const destinationRPC = RPCS[destinationEVMChain];
    if (!destinationRPC) return;

    const provider = new ethers.providers.StaticJsonRpcProvider(destinationRPC);
    let cancelled = false;
    (async () => {
      const contract = new Contract(
        destinationRelayContract,
        [
          `function calculateNativeSwapAmountOut(
            address token,
            uint256 toNativeAmount
        ) external view returns (uint256)`,
        ],
        provider
      );
      const estimatedSwap = await contract.calculateNativeSwapAmountOut(
        destinationAsset,
        debouncedToNativeAmount
      );
      if (cancelled) return;

      setEstimatedGas(estimatedSwap.toBigInt());
    })();
    return () => {
      cancelled = true;
    };
  }, [
    destinationRelayContract,
    destinationAsset,
    destinationChainId,
    debouncedToNativeAmount,
  ]);

  // ----
  // PRE-PROCESSED VARIABLES ---
  const stringifiedEstimatedGas = estimatedGas
    ? Number(formatUnits(estimatedGas, 18)).toFixed(6)
    : "";

  return (
    <>
      <Head>
        <title>USDC Bridge | Cross-Chain USDC Transfer</title>
        <meta
          name="description"
          content="Bridge USDC natively between blockchains for free. Send or transfer USDC between Ethereum and Avalanche powered by Circle’s Cross-Chain Transfer Protocol."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Stable: Cross-Chain USDC Transfers"
        />
        <meta
          property="og:description"
          content="Bridge or transfer native USDC between Ethereum and Avalanche powered by Circle's CCTP."
        />
        <meta
          property="og:image"
          content="https://stable.io/stable_banner.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={getPublic("/apple-touch-icon.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={getPublic("/favicon-32x32.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={getPublic("/favicon-16x16.png")}
        />
        <link rel="manifest" href={getPublic("/site.webmanifest")} />
        <link
          rel="mask-icon"
          href={getPublic("/safari-pinned-tab.svg")}
          color="#5bbad5"
        />
        <link rel="icon" href={getPublic("/favicon.ico")} />
        <meta name="theme-color" content="#ffffff" />
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
              maxDecimals={AMOUNT_DECIMALS}
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
              amount={amount}
              gas={destinationGas}
              onChange={changeDestinationGas}
              destination={destination}
              maxDestinationGas={maxDestinationGas}
              estimatedGas={stringifiedEstimatedGas}
              sliderPercentage={sliderPercentage}
            />

            <div className={styles.separator} />

            <TransactionDetail
              amount={amount}
              estimatedGas={stringifiedEstimatedGas}
              destinationGas={destinationGas}
              destination={destination}
            />

            <button onClick={handleWallet}>{connectWalletTxt} Wallet</button>
          </div>

          <a
            href="https://developers.circle.com/stablecoin/docs/cctp-faq"
            className={styles.poweredBy}
            target="_blank"
          >
            <span>Powered by </span>
            <Image
              alt="Powered by Circle"
              src={getPublic("/circle.png")}
              width={120}
              height={30}
            />
          </a>
        </div>
        <footer>
          <a
            className={styles.tweet}
            href="https://twitter.com/stable_io"
            target="_blank"
          >
            <Image
              alt="Twitter logo"
              src={getPublic("/twitter.png")}
              width={20}
              height={20}
            />
          </a>
          <a href="mailto:hello@stable.io" target="_blank">
            Contact Us
          </a>
        </footer>
      </main>
    </>
  );
}
