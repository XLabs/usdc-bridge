import { WEBAPP_URL } from "@/constants";
import Head from "next/head";

const HeadAndMetadata = () => (
  <Head>
    <title>USDC Bridge | Cross-Chain USDC Transfer</title>
    <meta
      name="description"
      content="Bridge USDC natively between blockchains for free. Send or transfer USDC between Ethereum and Avalanche powered by Circle’s Cross-Chain Transfer Protocol."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content="Stable: Cross-Chain USDC Transfers" />
    <meta
      property="og:description"
      content="Bridge or transfer native USDC between Ethereum and Avalanche powered by Circle's CCTP."
    />
    <meta property="og:image" content={`${WEBAPP_URL}stable_banner.png`} />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href={"/apple-touch-icon.png"}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href={"/favicon-32x32.png"}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href={"/favicon-16x16.png"}
    />
    <link rel="manifest" href={"/site.webmanifest"} />
    <link rel="mask-icon" href={"/safari-pinned-tab.svg"} color="#5bbad5" />
    <link rel="icon" href={"/favicon.ico"} />
    <meta name="theme-color" content="#ffffff" />
  </Head>
);

export default HeadAndMetadata;