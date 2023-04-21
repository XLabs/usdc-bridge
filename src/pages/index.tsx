import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./app.module.scss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IChain } from "@/types";
import Chain from "@/components/molecules/Chain";
import ExchangeChains from "@/components/atoms/ExchangeChains";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const inter = Inter({ subsets: ["latin"] });
const TRANSACTION_LIMIT = 99999999;

export default function Home() {
  const [source, setSource] = useState<IChain>("AVAX");
  const changeSource = () => setSource(source === "AVAX" ? "ETH" : "AVAX");

  const { address, isConnected } = useAccount();

  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();

  const { data } = useBalance({
    address: address,
    token: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F", // USDC Token
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
  const [amount, setAmount] = useState("0");

  useEffect(() => {
    console.log("address", address);
    console.log("isConnected", isConnected);
    console.log("data", data);

    setConnectWalletTxt(isConnected ? "Disconnect" : "Connect");
    setWalletTxt(
      isConnected
        ? `${address?.slice(0, 6)}...${address?.slice(-6)}`
        : "Connect Wallet"
    );
  }, [address, isConnected, data]);

  const handleAmountChange = (ev: ChangeEvent<HTMLInputElement>) => {
    // valid number regex
    if (/^\d+(\.\d*)?$/.exec(ev.target.value)) {
      let newValue = ev.target.value;
      let [integers, decimals] = newValue.split(".");

      // no more than TRANSACTION_LIMIT
      if (Number(integers) > TRANSACTION_LIMIT) {
        newValue = integers.slice(0, `${TRANSACTION_LIMIT}`.length);
      }

      // no more than 5 decimals
      if (decimals && decimals.length > 5) {
        newValue = `${integers}.${decimals.slice(0, 5)}`;
      }

      setAmount(newValue);
    } else if (ev.target.value === "") {
      setAmount("0");
    }
  };

  const amountInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Head>
        <title>USDC Bridge</title>
        <meta name="description" content="USDC bridge developed by xLabs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <header className={styles.header}>
          <Image alt="stable logo" width={120} height={30} src="/stable.png" />
          <button onClick={() => !isConnected && handleWallet()}>
            {walletTxt}
          </button>
        </header>

        <div className={styles.center}>
          <h2 className={styles.title}>
            <Image alt="USDC icon" width={42} height={42} src="/usdc.png" />
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
            <div className={styles.usdcInputContainer}>
              <input
                value={amount}
                onChange={handleAmountChange}
                ref={amountInputRef}
                onClick={() =>
                  amount === "0" && amountInputRef.current?.select()
                }
              />
              <div className={styles.usdcText}>
                <Image alt="USDC icon" width={26} height={26} src="/usdc.png" />
                <span>USDC</span>
              </div>
            </div>
          </div>

          {/* <button onClick={handleWallet}>{connectWalletTxt} Wallet</button> */}

          <div className={styles.poweredBy}>
            <span>Powered by </span>
            <Image
              alt="Powered by Circle"
              src="/circle.png"
              width={120}
              height={30}
            />
          </div>
        </div>
      </main>
    </>
  );
}
