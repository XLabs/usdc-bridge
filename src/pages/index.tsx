import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { useState } from "react";
import { IChain } from "@/types";
import Chain from "@/components/Chain";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [source, setSource] = useState<IChain>("AVAX");
  const changeSource = () => setSource(source === "AVAX" ? "ETH" : "AVAX");

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
          <h2 className={styles.title}>USDC Bridge</h2>

          <div className={styles.container}>
            <div className={styles.chainText}>Source</div>
            <Chain source={source} initial="AVAX" />

            <div
              className={styles.exchange}
              onClick={changeSource}
              style={{
                transform: `rotate(${source === "AVAX" ? 90 : 270}deg)`,
              }}
            >
              <Image
                alt="Exchange source and destination chains"
                src="/exchange.png"
                width={30}
                height={30}
              />
            </div>

            <div className={styles.chainText}>Destination</div>
            <Chain source={source} initial="ETH" />

            <button>Connect Wallet</button>

            {/* <div>Source Balance</div> */}
          </div>
        </div>
      </main>
    </>
  );
}
