import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { avalanche, avalancheFuji, mainnet, goerli } from "wagmi/chains";

export default function App({ Component, pageProps }: AppProps) {
  const { provider, webSocketProvider } = configureChains(
    [goerli, mainnet, avalancheFuji, avalanche],
    [publicProvider()]
  );

  const client = createClient({
    autoConnect: false,
    provider: provider,
    webSocketProvider,
  });

  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
