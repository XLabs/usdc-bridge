import Head from "next/head";
import Image from "next/image";
import { Manrope } from "next/font/google";
import styles from "./app.module.scss";
import { useEffect, useState } from "react";
import { IChain } from "@/types";
import Chain from "@/components/molecules/Chain";
import ExchangeChains from "@/components/atoms/ExchangeChains";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import USDCInput from "@/components/atoms/USDCInput";
import DestinationGas from "@/components/molecules/DestinationGas";

const manrope = Manrope({ subsets: ["latin"] });

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
  const [balance, setBalance] = useState("");
  const [destinationGas, setDestinationGas] = useState(0);
  const [amount, setAmount] = useState("0");

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

  return (
    <>
      <Head>
        <title>USDC Bridge</title>
        <meta name="description" content="USDC bridge developed by xLabs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${manrope.className}`}>
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
            <USDCInput value={amount} setValue={changeAmount} />
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

            <DestinationGas onChange={setDestinationGas} />

            <button onClick={handleWallet}>{connectWalletTxt} Wallet</button>
          </div>

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
