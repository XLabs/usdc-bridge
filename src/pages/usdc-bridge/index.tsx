import { Manrope } from "next/font/google";
import styles from "@/pages/app.module.scss";
import { useCallback, useEffect, useState } from "react";
import {
  AMOUNT_DECIMALS,
  CIRCLE_BRIDGE_ADDRESSES,
  CIRCLE_DOMAINS,
  CIRCLE_EMITTER_ADDRESSES,
  getEvmChainId,
  IChain,
  isMainnet,
  RPCS_TESTNET,
  RPCS_MAINNET,
  USDC_ADDRESSES_MAINNET,
  USDC_ADDRESSES_TESTNET,
  USDC_DECIMALS,
  USDC_RELAYER_MAINNET,
  USDC_RELAYER_TESTNET,
  USDC_WH_EMITTER,
  WEBAPP_URL,
} from "@/constants";
import Chain from "@/components/molecules/Chain";
import ExchangeChains from "@/components/atoms/ExchangeChains";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useSigner,
  useSwitchNetwork,
} from "wagmi";
import { avalanche, avalancheFuji, goerli, mainnet } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useDebounce } from "use-debounce";
import Image from "next/image";
import USDCInput from "@/components/atoms/USDCInput";
import DestinationGas from "@/components/molecules/DestinationGas";
import TransactionDetail from "@/components/atoms/TransactionDetail";
import DarkModeSwitch from "@/components/atoms/DarkModeSwitch";
import "react-toastify/dist/ReactToastify.css";
// import Splash from "@/components/atoms/Splash";

import { Contract, ethers, Signer } from "ethers";
import { CHAIN_ID_AVAX, CHAIN_ID_ETH } from "@certusone/wormhole-sdk";
import { formatUnits, hexZeroPad, parseUnits } from "ethers/lib/utils.js";
import useAllowance from "@/utils/useAllowance";
import HeadAndMetadata from "@/components/atoms/HeadAndMetadata";
import { errorToast, infoToast, successToast } from "@/utils/toast";
import { handleCircleMessageInLogs } from "@/utils/circle";
import HeaderButtons from "@/components/atoms/HeaderButtons";

const manrope = Manrope({ subsets: ["latin"] });
const chainList = isMainnet ? [avalanche, mainnet] : [avalancheFuji, goerli];

export default function Home() {
  const [source, setSource] = useState<IChain>("AVAX");
  const destination = source === "AVAX" ? "ETH" : "AVAX";

  const sourceChainId = source === "AVAX" ? CHAIN_ID_AVAX : CHAIN_ID_ETH;
  const destinationChainId = source === "AVAX" ? CHAIN_ID_ETH : CHAIN_ID_AVAX;

  const [blockedInteractions, setBlockedInteraction] = useState(false);

  // WALLET HANDLING
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const { connect } = useConnect({
    onError: (err) => {
      console.error(err);
      errorToast(
        <div>
          <p>Error: Wallet not found</p>
          <p>(Do you have a wallet installed?)</p>
          <p>(Did you approve the connection?)</p>
        </div>
      );
    },
    connector: new InjectedConnector({
      chains: chainList,
    }),
  });
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork({
    onSuccess: () => {
      setBlockedInteraction(false);
    },
    onError: () => {
      errorToast(
        <div>
          <p>Error changing network.</p>
          <p>(Did you rejected the network change?)</p>
          <p>(Do you have any pending action on your wallet?)</p>
          <p>Refresh the page to try again.</p>
        </div>,
        12000
      );
      setBlockedInteraction(true);
    },
  });

  const changeSource = () => {
    if (isConnected) setBlockedInteraction(true);

    switchNetwork?.(getEvmChainId(destinationChainId));
    setSource(destination);
  };

  useEffect(() => {
    changeAmount("0");
    changeDestinationGas(0);
  }, [source]); // eslint-disable-line

  const { data, refetch } = useBalance({
    chainId: getEvmChainId(sourceChainId),
    address: address,
    token: isMainnet
      ? USDC_ADDRESSES_MAINNET[sourceChainId]
      : USDC_ADDRESSES_TESTNET[sourceChainId],
  });

  // main button function:
  const handleBoxWallet = () => {
    if (!isConnected) {
      connect({ chainId: getEvmChainId(sourceChainId) });
    } else {
      // TRANSFER
      if (sufficientAllowance) {
        console.log("TRANSFER");
        handleTransferClick();
      }
      // APPROVE
      else {
        console.log("APPROVE");
        approveAmount(amount);
      }
    }
  };

  const [boxWalletTxt, setBoxWalletTxt] = useState("...");
  const [headerWalletTxt, setHeaderWalletTxt] = useState<any>("...");
  const [balance, setBalance] = useState("");

  // AMOUNT TO TRANSFER SHOULD NEVER BE HIGHER THAN BALANCE
  useEffect(() => {
    if (balance && +balance < +amount) {
      changeAmount(balance);
    }
  }, [balance]); // eslint-disable-line

  // MORE AMOUNT STATES
  const [destinationGas, setDestinationGas] = useState(0);
  const [amount, setAmount] = useState("0");

  const [toNativeAmount, setToNativeAmount] = useState<bigint>(BigInt(0));
  const [debouncedToNativeAmount] = useDebounce(toNativeAmount, 500);

  const [sliderPercentage, setSliderPercentage] = useState(0);

  // setDestinationGas but with all its logic needed
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

  // setAmount but with all its logic needed
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

  // SMART CONTRACTS CONSTS/STATES
  const sourceRelayContract = isMainnet
    ? USDC_RELAYER_MAINNET[sourceChainId]
    : USDC_RELAYER_TESTNET[sourceChainId];

  const destinationRelayContract = isMainnet
    ? USDC_RELAYER_MAINNET[destinationChainId]
    : USDC_RELAYER_TESTNET[destinationChainId];

  const sourceAsset = isMainnet
    ? USDC_ADDRESSES_MAINNET[sourceChainId]
    : USDC_ADDRESSES_TESTNET[sourceChainId];

  const destinationAsset = isMainnet
    ? USDC_ADDRESSES_MAINNET[destinationChainId]
    : USDC_ADDRESSES_TESTNET[destinationChainId];

  const [maxDestinationGas, setMaxDestinationGas] = useState<bigint | null>(
    null
  );
  const [estimatedGas, setEstimatedGas] = useState<bigint | null>(null);

  // GET ALLOWANCE
  const {
    isFetchingAllowance,
    isProcessingApproval,
    approveAmount,
    sufficientAllowance,
  } = useAllowance(
    signer as Signer,
    getEvmChainId(sourceChainId),
    sourceAsset!,
    amount,
    sourceRelayContract!
  );

  // CHANGE BUTTON TEXTS WHEN CHANGING WALLETS
  useEffect(() => {
    if (data?.formatted) {
      setBalance(data.formatted);
    } else {
      setBalance("");
    }

    if (!isConnected) {
      setHeaderWalletTxt("Connect Wallet");
      setBoxWalletTxt("Connect Wallet");
    } else {
      setHeaderWalletTxt(`${address?.slice(0, 6)}...${address?.slice(-6)}`);
      setBoxWalletTxt(sufficientAllowance ? "Transfer" : "Approve");
    }
  }, [address, isConnected, data, sufficientAllowance]);

  // GET MAX DESTINATION GAS ON USDC EFFECT
  useEffect(() => {
    setMaxDestinationGas(null);

    // null check
    if (!destinationRelayContract || !destinationAsset) return;

    const destinationEVMChain = getEvmChainId(destinationChainId);
    if (!destinationEVMChain) return;

    const destinationRPC = isMainnet
      ? RPCS_MAINNET[destinationEVMChain]
      : RPCS_TESTNET[destinationEVMChain];
    if (!destinationRPC) return;

    const provider = new ethers.providers.StaticJsonRpcProvider(destinationRPC);
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

    const destinationRPC = isMainnet
      ? RPCS_MAINNET[destinationEVMChain]
      : RPCS_TESTNET[destinationEVMChain];
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

  // ACTUAL TOKEN TRANSFERS
  const [isTransfering, setIsTransfering] = useState(false);
  const [sourceTxHash, setSourceTxHash] = useState("");
  const [sourceTxConfirmed, setSourceTxConfirmed] = useState(false);
  const [transferInfo, setTransferInfo] = useState<null | {
    VAA: string | null;
    circleBridgeMessage: string;
    circleAttestation: string;
  }>(null);

  const sourceContract = CIRCLE_BRIDGE_ADDRESSES[sourceChainId];

  const handleTransferClick = useCallback(async () => {
    if (!signer) return;

    const signerAddress = await signer.getAddress();
    if (!signerAddress) return;

    if (!sourceContract || !sourceAsset) return;

    const sourceEmitter = CIRCLE_EMITTER_ADDRESSES[sourceChainId];
    if (!sourceEmitter) return;

    const destinationDomain = CIRCLE_DOMAINS[destinationChainId];
    if (destinationDomain === undefined) return;

    const transferAmountParsed = parseUnits(amount, USDC_DECIMALS);
    if (!transferAmountParsed) return;

    const sourceRelayEmitter = USDC_WH_EMITTER[sourceChainId];
    if (!sourceRelayContract || !sourceRelayEmitter) return;

    const contract = new Contract(
      sourceRelayContract,
      [
        `function transferTokensWithRelay(
            address token,
            uint256 amount,
            uint256 toNativeTokenAmount,
            uint16 targetChain,
            bytes32 targetRecipientWallet
          ) external payable returns (uint64 messageSequence)`,
      ],
      signer
    );

    setBlockedInteraction(true);
    setIsTransfering(true);

    try {
      const tx = await contract.transferTokensWithRelay(
        sourceAsset,
        transferAmountParsed,
        toNativeAmount,
        destinationChainId,
        hexZeroPad(signerAddress, 32)
      );

      setSourceTxHash(tx.hash);
      infoToast(`(1/3) Transaction hash: ${tx.hash}`);
      console.log("tx hash:", tx.hash);

      const receipt = await tx.wait();

      console.log("receipt here!", receipt);

      if (!receipt) {
        throw new Error("Invalid receipt");
      }

      setSourceTxConfirmed(true);
      infoToast("(2/3) Source transaction confirmed");

      // find circle message
      const [circleBridgeMessage, circleAttestation] =
        await handleCircleMessageInLogs(receipt.logs, sourceEmitter);

      if (circleBridgeMessage === null || circleAttestation === null) {
        throw new Error(`Error parsing receipt for ${tx.hash}`);
      }
      // Circle message found
      successToast("(3/3) Your transfer was sent successfully!");
      await refetch();
    } catch (e) {
      console.error(e);
      errorToast(
        "Error: Something went wrong. Check the console for more info"
      );
    } finally {
      setBlockedInteraction(false);
      setIsTransfering(false);
    }
  }, [
    refetch,
    amount,
    signer,
    sourceContract,
    sourceAsset,
    sourceChainId,
    destinationChainId,
    sourceRelayContract,
    toNativeAmount,
  ]);

  // PRE-PROCESSED VARIABLES
  const stringifiedEstimatedGas = estimatedGas
    ? Number(formatUnits(estimatedGas, 18)).toFixed(6)
    : "";

  const mainBtnLoading =
    isProcessingApproval || isTransfering || isFetchingAllowance;

  return (
    <>
      <HeadAndMetadata />

      <main className={`${styles.main} ${manrope.className}`}>
        {/* <Splash /> */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <Image
              alt="stable logo"
              width={120}
              height={30}
              src={"/stable.png"}
            />
            <a href={`${WEBAPP_URL}usdc-bridge`}>USDC</a>
          </div>
          <div className={styles.headerInteractions}>
            <DarkModeSwitch />
            <HeaderButtons
              isConnected={isConnected}
              disconnect={disconnect}
              connect={connect}
              sourceChainId={sourceChainId}
              headerWalletTxt={headerWalletTxt}
              blockedInteractions={blockedInteractions}
            />
          </div>
        </header>

        <div className={styles.center}>
          <h2 className={styles.title}>
            <Image alt="USDC icon" width={42} height={42} src={"/usdc.png"} />
            <span>USDC Bridge</span>
          </h2>
          <h3 className={styles.subtitle}>
            The official way to bridge and send native USDC between Ethereum and
            Avalanche
          </h3>

          <div className={styles.container}>
            {blockedInteractions && <div className={styles.blocked} />}
            <div className={styles.fromToContainer}>
              <div className={styles.chain}>
                <div className={styles.boxText}>From</div>
                <Chain
                  source={source}
                  changeSource={changeSource}
                  initial="AVAX"
                />
              </div>

              <ExchangeChains onClick={changeSource} source={source} />

              <div className={styles.chain}>
                <div className={styles.boxText}>To</div>
                <Chain
                  source={source}
                  changeSource={changeSource}
                  initial="ETH"
                />
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

            <button
              onClick={() => !mainBtnLoading && handleBoxWallet()}
              className={`${mainBtnLoading ? styles.btnLoading : ""}`}
            >
              {mainBtnLoading ? "..." : boxWalletTxt}
            </button>
          </div>

          <a
            href="https://developers.circle.com/stablecoin/docs/cctp-faq"
            className={styles.poweredBy}
            target="_blank"
          >
            <span>Powered by </span>
            <Image
              alt="Powered by Circle"
              src={"/circle.png"}
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
              src={"/twitter.png"}
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
