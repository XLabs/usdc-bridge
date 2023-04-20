import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { useState } from "react";
import { IChain } from "@/types";
import Chain from "@/components/Chain";
import ExchangeChains from "@/components/ExchangeChains";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [source, setSource] = useState<IChain>("AVAX");
  const changeSource = () => setSource(source === "AVAX" ? "ETH" : "AVAX");

  const connectWallet = () => {
    console.log("caquta");
  };

  return (
    <>
      <Head>
        <title>USDC Bridge</title>
        <meta name="description" content="USDC bridge developed by xLabs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={`${styles.center} ${inter.className}`}>
          <h2 className={styles.title}>
            <Image alt="USDC icon" width={24} height={24} src="/usdc.png" />
            <span>USDC Bridge</span>
            <Image alt="USDC icon" width={24} height={24} src="/usdc.png" />
          </h2>

          <div className={styles.container}>
            <div className={styles.chainText}>Source</div>
            <Chain source={source} initial="AVAX" />

            <ExchangeChains onClick={changeSource} source={source} />

            <div className={styles.chainText}>Destination</div>
            <Chain source={source} initial="ETH" />

            <button onClick={connectWallet}>Connect Wallet</button>

            {/* <div>Source Balance</div> */}
          </div>
        </div>
      </main>
    </>
  );
}
