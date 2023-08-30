import { Poppins } from "next/font/google";
import styles from "@/pages/app.module.scss";
import { useCallback, useEffect, useState } from "react";
import {
  AMOUNT_DECIMALS,
  ARBITRUM_EXPLORER,
  AVAX_EXPLORER,
  CIRCLE_EMITTER_ADDRESSES,
  ETH_EXPLORER,
  getEvmChainId,
  getRelayFeedbackUrl,
  IChain,
  isMainnet,
  OPTIMISM_EXPLORER,
  RPCS_MAINNET,
  RPCS_TESTNET,
  USDC_ADDRESSES_MAINNET,
  USDC_ADDRESSES_TESTNET,
  USDC_DECIMALS,
  USDC_RELAYER_MAINNET,
  USDC_RELAYER_TESTNET,
} from "@/constants";
import Chain from "@/components/molecules/Chain";
import ExchangeChains from "@/components/atoms/ExchangeChains";
import { useAccount, useBalance, useConnect, useSigner, useSwitchNetwork } from "wagmi";
import { arbitrum, arbitrumGoerli, avalanche, avalancheFuji, goerli, mainnet, optimism, optimismGoerli } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useDebounce } from "use-debounce";
import Image from "next/image";
import USDCInput from "@/components/atoms/USDCInput";
import DestinationGas from "@/components/molecules/DestinationGas";
import TransactionDetail from "@/components/atoms/TransactionDetail";
import { Contract, ethers, Signer } from "ethers";
import { CHAIN_ID_ARBITRUM, CHAIN_ID_AVAX, CHAIN_ID_ETH, CHAIN_ID_OPTIMISM } from "@certusone/wormhole-sdk";
import { formatUnits, hexZeroPad, parseUnits } from "ethers/lib/utils.js";
import useAllowance from "@/utils/useAllowance";
import { errorToast, infoToast, successToast } from "@/utils/toast";
import { handleCircleMessageInLogs } from "@/utils/circle";
import axios from "axios";
import Tooltip from "@/components/atoms/Tooltip";
import Loader from "@/components/atoms/Loader";

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});
const VAA_URL = isMainnet ? "https://api.wormscan.io/api/v1/vaas?txHash=" : "https://api.testnet.wormscan.io/api/v1/vaas?txHash=";
const chainList = isMainnet ? [arbitrum, avalanche, mainnet, optimism] : [arbitrumGoerli, avalancheFuji, goerli, optimismGoerli];
const getChainId = (chain: IChain) =>
  chain === "AVAX" ? CHAIN_ID_AVAX : chain === "ARBITRUM" ? CHAIN_ID_ARBITRUM : chain === "OPTIMISM" ? CHAIN_ID_OPTIMISM : CHAIN_ID_ETH;

export default function Home() {
  const [source, setSource] = useState<IChain>("ETH");
  const [destination, setDestination] = useState<IChain>("ARBITRUM");

  const sourceChainId = getChainId(source);
  const destinationChainId = getChainId(destination);

  const [blockedInteractions, setBlockedInteraction] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const { connect } = useConnect({
    onError: (err) => {
      console.error(err);
      if (err.name === "ConnectorNotFoundError") {
        errorToast(
          <div style={{ cursor: "pointer" }} onClick={() => window.open("https://metamask.app.link/dapp/portalbridge.com/usdc-bridge")}>
            <p>Wallet not found</p>
            <p>Press here to go download Metamask</p>
          </div>,
          8000
        );
      } else if (err.name === "UserRejectedRequestError") {
        errorToast(
          <div>
            <p>Error: Wallet not found</p>
            <p>(Did you approve the connection?)</p>
          </div>
        );
      } else {
        errorToast(
          <div>
            <p>Error: Something went wrong</p>
            <p>(Do you have a wallet installed?)</p>
            <p>(Did you approve the connection?)</p>
          </div>
        );
      }
    },
    connector: new InjectedConnector({
      chains: chainList,
    }),
  });
  const [switchingNetwork, setSwitchingNetwork] = useState(false);
  const { switchNetwork } = useSwitchNetwork({
    onSuccess: () => {
      setSwitchingNetwork(false);
    },
    onError: () => {
      exchangeSources(true);
      errorToast(
        <div>
          <p>Error changing network.</p>
          <p>(Did you reject the network change?)</p>
          <p>(Do you have any pending action on your wallet?)</p>
        </div>,
        10000
      );
    },
  });

  const { data, refetch } = useBalance({
    chainId: getEvmChainId(sourceChainId),
    address: address,
    token: isMainnet ? USDC_ADDRESSES_MAINNET[sourceChainId] : USDC_ADDRESSES_TESTNET[sourceChainId],
  });

  // APP STATE HANDLING
  const exchangeSources = (failedSwitch = false) => {
    if (isConnected) {
      setSwitchingNetwork(true);
    }

    const newSource = destination;

    setDestination(source);
    setSource(newSource);

    if (failedSwitch) {
      setSwitchingNetwork(false);
    } else {
      switchNetwork?.(getEvmChainId(destinationChainId));
    }
  };

  const changeSource = (newSource: IChain) => {
    if (isConnected) {
      setSwitchingNetwork(true);
    }

    if (newSource === destination) {
      setDestination(source);
    }

    setSource(newSource);
    switchNetwork?.(getEvmChainId(getChainId(newSource)));
  };

  const changeDestination = (newDestination: IChain) => {
    if (newDestination === source) {
      if (isConnected) {
        setSwitchingNetwork(true);
      }
      setSource(destination);
      switchNetwork?.(getEvmChainId(getChainId(destination)));
    }
    setDestination(newDestination);
  };

  useEffect(() => {
    changeAmount("0");
    changeDestinationGas(0);
  }, [source]); // eslint-disable-line

  // main button function:
  const handleBoxWallet = () => {
    // CONNECT WALLET
    if (!isConnected) {
      connect({ chainId: getEvmChainId(sourceChainId) });
    } else {
      // TRANSFER
      if (sufficientAllowance) {
        if (+transactionFee > +amount - +destinationGas) {
          infoToast("The fee of this transaction is higher than the amount you are trying to receive.", 8000);
        } else {
          handleTransferClick();
        }
      }
      // APPROVE
      else {
        approveAmount(amount);
      }
    }
  };

  const [boxWalletTxt, setBoxWalletTxt] = useState("...");
  const [headerWalletTxt, setHeaderWalletTxt] = useState<any>("...");
  const [balance, setBalance] = useState("0");

  // AMOUNT TO TRANSFER SHOULD NEVER BE HIGHER THAN BALANCE
  useEffect(() => {
    if (balance && +balance < +amount) {
      changeAmount(balance);
    }
  }, [balance]); // eslint-disable-line

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

      setDestinationGas(+currentGas);
      setToNativeAmount(parseUnits(currentGas, USDC_DECIMALS).toBigInt());
    }
  };

  // setAmount but with all its logic needed
  const changeAmount = (a: string) => {
    let newAmount = a;

    if (balance && +newAmount > +balance) {
      infoToast("You cannot send more than your balance", 3000);
      return;
    }

    while (newAmount.startsWith("00")) {
      newAmount = newAmount.substring(1);
    }
    if (newAmount.length > 1 && newAmount.startsWith("0") && !newAmount.startsWith("0.")) {
      newAmount = newAmount.substring(1);
    }

    if (destinationGas > +newAmount) {
      changeDestinationGas(0);
    }

    setAmount(newAmount);
  };

  // SMART CONTRACTS CONSTS/STATES
  const sourceRelayContract = isMainnet ? USDC_RELAYER_MAINNET[sourceChainId] : USDC_RELAYER_TESTNET[sourceChainId];
  const destinationRelayContract = isMainnet ? USDC_RELAYER_MAINNET[destinationChainId] : USDC_RELAYER_TESTNET[destinationChainId];
  const sourceAsset = isMainnet ? USDC_ADDRESSES_MAINNET[sourceChainId] : USDC_ADDRESSES_TESTNET[sourceChainId];
  const destinationAsset = isMainnet ? USDC_ADDRESSES_MAINNET[destinationChainId] : USDC_ADDRESSES_TESTNET[destinationChainId];
  const [maxDestinationGas, setMaxDestinationGas] = useState<bigint | null>(null);
  const [estimatedGas, setEstimatedGas] = useState<bigint | null>(null);

  // GET ALLOWANCE
  const { isFetchingAllowance, isProcessingApproval, approveAmount, sufficientAllowance, transactionFee } = useAllowance(
    signer as Signer,
    sourceChainId,
    destinationChainId,
    sourceAsset!,
    amount,
    sourceRelayContract!,
    switchingNetwork
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

    const destinationRPC = isMainnet ? RPCS_MAINNET[destinationEVMChain] : RPCS_TESTNET[destinationEVMChain];
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
  ``;

  // GET ESTIMATED GAS ON NATIVE TOKEN EFFECT
  useEffect(() => {
    setEstimatedGas(null);
    if (!destinationRelayContract || !destinationAsset) return;

    const destinationEVMChain = getEvmChainId(destinationChainId);
    if (!destinationEVMChain) return;

    const destinationRPC = isMainnet ? RPCS_MAINNET[destinationEVMChain] : RPCS_TESTNET[destinationEVMChain];
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
      const estimatedSwap = await contract.calculateNativeSwapAmountOut(destinationAsset, debouncedToNativeAmount);
      if (cancelled) return;

      setEstimatedGas(estimatedSwap.toBigInt());
    })();
    return () => {
      cancelled = true;
    };
  }, [destinationRelayContract, destinationAsset, destinationChainId, debouncedToNativeAmount]);

  // ACTUAL TOKEN TRANSFERS
  const [isTransfering, setIsTransfering] = useState(false);

  const handleTransferClick = useCallback(async () => {
    if (!signer) return;

    const signerAddress = await signer.getAddress();
    if (!signerAddress) return;

    if (!sourceAsset) return;

    const sourceEmitter = CIRCLE_EMITTER_ADDRESSES[sourceChainId];
    if (!sourceEmitter) return;

    const transferAmountParsed = parseUnits(amount, USDC_DECIMALS);
    if (!transferAmountParsed) return;

    if (!sourceRelayContract) return;

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

    infoToast("Starting transaction...", 2000);
    setIsTransfering(true);

    try {
      const tx = await contract.transferTokensWithRelay(
        sourceAsset,
        transferAmountParsed,
        toNativeAmount,
        destinationChainId,
        hexZeroPad(signerAddress, 32)
      );

      infoToast(`(1/4) Transaction hash: ${tx.hash}`, 5000);
      console.log("tx hash:", tx.hash);

      // TOAST FEEDBACK CONTRACT
      let processing = true;
      const processingSourceFeedback = () => {
        if (processing) {
          infoToast("Waiting for the contract to finish processing", 3000);
          processingSourceFeedbackTimeout = setTimeout(processingSourceFeedback, 15000);
        }
      };
      let processingSourceFeedbackTimeout = setTimeout(processingSourceFeedback, 15000);

      const receipt = await tx.wait();
      processing = false;
      clearTimeout(processingSourceFeedbackTimeout);
      if (!receipt) {
        throw new Error("Invalid receipt");
      }

      infoToast(
        <a
          target="_blank"
          href={source === "AVAX" ? `${AVAX_EXPLORER}${tx.hash}` : source === "ETH" ? `${ETH_EXPLORER}${tx.hash}` : `${ARBITRUM_EXPLORER}${tx.hash}`}
        >
          <p>(2/4) Source transaction confirmed</p>
          <p>Click here to see it on the Explorer</p>
        </a>,
        12000
      );

      // TOAST FEEDBACK CIRCLE
      processing = true;
      const processCircleFeedback = () => {
        if (processing) {
          infoToast("Still processing: Waiting for enough block confirmations", 4000);
          processFeedbackTimeout = setTimeout(processCircleFeedback, 22500);
        }
      };
      let processFeedbackTimeout = setTimeout(processCircleFeedback, 22500);

      // find circle message
      const [circleBridgeMessage, circleAttestation] = await handleCircleMessageInLogs(receipt.logs, sourceEmitter);

      processing = false;
      clearTimeout(processFeedbackTimeout);
      infoToast("(3/4) Circle attestation done", 4000);

      if (circleBridgeMessage === null || circleAttestation === null) {
        throw new Error(`Error parsing receipt for ${tx.hash}`);
      }

      console.log({
        circleBridgeMessage,
        circleAttestation,
        receipt,
        tx,
      });

      let attempts = 0;
      let vaaInfo: any = false;
      const relayResponse = async () => {
        if (!vaaInfo) {
          vaaInfo = await axios
            .get(`${VAA_URL}${tx.hash}`)
            .then((res) => res)
            .catch((err) => {
              return false;
            });
        }

        let resp: any = "FINALITY";
        if (vaaInfo.data?.data[0]?.vaa) {
          console.log("VAA:", vaaInfo?.data?.data[0]?.vaa);

          resp = await axios
            .get(`${getRelayFeedbackUrl(attempts)}${tx.hash}`)
            .then((response: any) => {
              attempts++;
              return response;
            })
            .catch((error) => {
              console.log("Error getting relayer info for", tx.hash);
              console.error(error);
              if (attempts > 5) return "RELAYER_ERROR";

              attempts++;
              return "RELAYER_WAIT";
            });
        } else {
          vaaInfo = false;
        }

        return resp;
      };

      // TOAST FEEDBACK RELAYER
      const waitForRelayRedeem = async () => {
        const response = await relayResponse();

        if (response.data?.data?.status === "redeemed") {
          const destinationTxHash = response.data.data.to.txHash;
          setIsTransfering(false);

          successToast(
            <a
              target="_blank"
              href={
                destination === "AVAX"
                  ? `${AVAX_EXPLORER}${destinationTxHash}`
                  : destination === "ETH"
                  ? `${ETH_EXPLORER}${destinationTxHash}`
                  : destination === "OPTIMISM"
                  ? `${OPTIMISM_EXPLORER}${destinationTxHash}`
                  : `${ARBITRUM_EXPLORER}${destinationTxHash}`
              }
            >
              <p>(4/4) Your transfer was sent successfully!</p>
              <p>Click here to see the transaction on your destination</p>
            </a>,
            20000
          );
          clearInputs();
        } else if (response === "FINALITY") {
          infoToast("Waiting for transaction finality...", 4000);
          setTimeout(() => {
            waitForRelayRedeem();
          }, 20000);
        } else if (response === "RELAYER_ERROR") {
          infoToast("We were not able to get the transaction relay status. It should arrive shortly!");
          setIsTransfering(false);
          clearInputs();
        } else {
          infoToast("Waiting for the relay to happen...", 4000);
          setTimeout(() => {
            waitForRelayRedeem();
          }, 12000);
        }
      };
      waitForRelayRedeem();
    } catch (e) {
      console.error(e);
      setIsTransfering(false);
      errorToast("Error: Something went wrong. Check the console for more info");
    } finally {
      await refetch();
    }
  }, [source, destination, refetch, amount, signer, sourceAsset, sourceChainId, destinationChainId, sourceRelayContract, toNativeAmount]);

  // PRE-PROCESSED VARIABLES
  const stringifiedEstimatedGas = estimatedGas ? Number(formatUnits(estimatedGas, 18)).toFixed(6) : "";

  const mainBtnLoading = isProcessingApproval || isTransfering || isFetchingAllowance;

  const clearInputs = () => {
    setDestinationGas(0);
    setAmount("0");
    setToNativeAmount(BigInt(0));
    setSliderPercentage(0);
    setEstimatedGas(null);
  };

  useEffect(() => {
    if (isProcessingApproval || isTransfering || isFetchingAllowance || switchingNetwork) {
      setBlockedInteraction(true);
    } else {
      setBlockedInteraction(false);
    }
  }, [switchingNetwork, isProcessingApproval, isTransfering, isFetchingAllowance]);

  return (
    <main className={`${styles.main} ${poppins.className}`}>
      <header className={styles.header}>
        <div className={styles.gradBg} />
        <div className={styles.logo}>
          <Image alt="Portal" width={155} height={68} src={`${process.env.NEXT_PUBLIC_BASE_PATH}/portal.svg`} />
        </div>
        <div className={styles.headerInteractions}>
          <div className={styles.headerLink}>
            <a href="https://www.portalbridge.com/#/transfer">Token Bridge</a>
          </div>
          <div className={styles.headerLink}>
            <a href="https://www.portalbridge.com/usdc-bridge">USDC Bridge</a>
          </div>
          <div className={styles.headerLink}>
            <a href="https://www.portalbridge.com/sui">Sui Bridge</a>
          </div>
          <div className={styles.headerLink}>
            <a href="https://docs.wormhole.com/wormhole/faqs">FAQ</a>
          </div>
          <div className={styles.headerLink}>
            <a href="https://wormhole.com/">Wormhole</a>
          </div>
        </div>
      </header>

      <div className={styles.center}>
        <h2 className={styles.title}>
          <span>USDC Bridge</span>
        </h2>
        <h3 className={styles.subtitle}>
          <span>Bridge and send native USDC between Ethereum, Avalanche, Arbitrum and Optimism through the official</span>
          <Tooltip text="Cross-Chain Transfer Protocol (CCTP) is a permissionless on-chain utility that can burn native USDC on a source chain and mint native USDC of the same amount on a destination chain.">
            <a target="__blank" href="https://developers.circle.com/stablecoin/docs" className={styles.CCTP}>
              CCTP
            </a>
          </Tooltip>
        </h3>

        <div className={styles.container}>
          {blockedInteractions && <div className={styles.blocked} />}
          <div className={styles.fromToContainer}>
            <div className={styles.chain}>
              <div className={styles.boxText}>From</div>
              <Chain selected={source} changeChain={(newSource) => changeSource(newSource)} />
            </div>

            <ExchangeChains onClick={() => exchangeSources(false)} source={source} />

            <div className={styles.chain}>
              <div className={styles.boxText}>To</div>
              <Chain selected={destination} changeChain={(newDestination) => changeDestination(newDestination)} />
            </div>
          </div>

          <div className={styles.boxText}>Amount</div>
          <USDCInput value={amount} setValue={changeAmount} maxDecimals={AMOUNT_DECIMALS} />

          {balance && (
            <div className={styles.balance}>
              <span className={styles.balanceTxt}>Balance {balance}</span>
              <span onClick={() => changeAmount(balance)} className={styles.maxTxt}>
                MAX
              </span>
            </div>
          )}

          <DestinationGas
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
            transactionFee={transactionFee}
          />

          <button
            onClick={() => !mainBtnLoading && handleBoxWallet()}
            className={`${mainBtnLoading ? `${styles.btnLoading} ${isTransfering ? styles.txLoading : ""}` : ""}`}
          >
            {mainBtnLoading && <Loader size="m" />}
            {!mainBtnLoading && boxWalletTxt}
          </button>
        </div>

        <div className={styles.poweredBy}>
          <span>Powered by </span>
          <a href="https://developers.circle.com/stablecoin/docs/cctp-faq" target="_blank">
            <Image alt="Powered by Circle" src={`${process.env.NEXT_PUBLIC_BASE_PATH}/circle.png`} width={120} height={30} />
          </a>
          <span> & </span>
          <a href="https://wormhole.com/" target="_blank">
            <Image alt="Powered by Wormhole" src={`${process.env.NEXT_PUBLIC_BASE_PATH}/wormhole.png`} width={200} height={45} />
          </a>
        </div>
      </div>
      <footer>
        <a className={styles.tweet} href="https://twitter.com/wormholecrypto" target="_blank">
          <Image alt="Twitter logo" src={`${process.env.NEXT_PUBLIC_BASE_PATH}/twitter.png`} width={20} height={20} />
        </a>
        <a className={styles.tweet} href="https://discord.gg/wormholecrypto" target="_blank">
          <Image alt="Discord logo" src={`${process.env.NEXT_PUBLIC_BASE_PATH}/discord.svg`} width={20} height={20} />
        </a>
      </footer>

      <div className={styles.gradients}>
        <div className={styles.gradientLeft} />
        <div className={styles.gradientLeft2} />
        <div className={styles.gradientRight} />
        <div className={styles.gradientRight2} />
      </div>
    </main>
  );
}
