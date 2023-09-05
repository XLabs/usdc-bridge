import Head from "next/head";

const HeadAndMetadata = () => (
  <Head>
    <title>USDC Bridge | Cross-Chain USDC Transfer</title>
    <meta
      name="description"
      content="Bridge USDC natively between blockchains for free. Send or transfer USDC between Ethereum, Arbitrum, Avalanche and Optimism powered by Circle's Cross-Chain Transfer Protocol."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_PATH}`} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="USDC Bridge: Cross-Chain USDC Transfers" />
    <meta
      property="og:description"
      content="Bridge or transfer native USDC between Ethereum, Arbitrum, Avalanche and Optimism powered by Circle's CCTP."
    />
    <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_PATH}/bridge_banner.png`} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="https://www.portalbridge.com/" />
    <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_BASE_PATH}`} />
    <meta name="twitter:title" content="USDC Bridge: Cross-Chain USDC Transfers" />
    <meta
      name="twitter:description"
      content="Bridge or transfer native USDC between Ethereum, Arbitrum, Avalanche and Optimism powered by Circle's CCTP."
    />
    <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_PATH}/bridge_banner.png`} />

    <link rel="apple-touch-icon" sizes="180x180" href={`${process.env.NEXT_PUBLIC_BASE_PATH}/apple-touch-icon.png`} />
    <link rel="icon" type="image/png" sizes="32x32" href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon-32x32.png`} />
    <link rel="icon" type="image/png" sizes="16x16" href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon-16x16.png`} />
    <link rel="manifest" href={`${process.env.NEXT_PUBLIC_BASE_PATH}/site.webmanifest`} />
    <link rel="mask-icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH}/safari-pinned-tab.svg`} color="#5bbad5" />
    <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon.ico`} />
    <meta name="theme-color" content="#ffffff" />
    <meta name="msapplication-TileColor" content="#da532c" />
  </Head>
);

export default HeadAndMetadata;
