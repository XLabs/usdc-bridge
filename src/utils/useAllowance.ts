import { USDC_DECIMALS } from "@/constants";
import { approveEth, getAllowanceEth } from "@certusone/wormhole-sdk";
import { BigNumber, Contract, ethers } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import { useEffect, useMemo, useState } from "react";
import { errorToast, infoToast, successToast } from "./toast";

export default function useAllowance(
  signer: ethers.Signer,
  sourceChainId: 2 | 6 | 23 | 24,
  destinationChainId: 2 | 6 | 23 | 24,
  tokenAddress: string,
  transferAmount: string,
  sourceRelayContract: string,
  switchingNetwork: boolean
) {
  const [allowance, setAllowance] = useState<string | null>(null);
  const [transactionFee, setTransactionFee] = useState("");
  const [isFetchingAllowance, setIsFetchingAllowance] = useState(false);
  const [isProcessingApproval, setIsApproving] = useState<boolean>(false);

  const sufficientAllowance = allowance && transferAmount && +allowance >= +transferAmount;

  useEffect(() => {
    let cancelled = false;

    if (tokenAddress && signer && sourceRelayContract && !isProcessingApproval && !switchingNetwork) {
      setIsFetchingAllowance(true);

      // Getting transaction fee
      const contract = new Contract(
        sourceRelayContract,
        [
          {
            inputs: [
              {
                internalType: "uint16",
                name: "chainId_",
                type: "uint16",
              },
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
            ],
            name: "relayerFee",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ],
        signer
      );

      (async () => {
        const getFeeTx: BigNumber = await contract.relayerFee(destinationChainId, tokenAddress);

        if (!cancelled) {
          const getFeeResult = formatUnits(getFeeTx, USDC_DECIMALS);
          setTransactionFee(getFeeTx.isZero() ? "" : getFeeResult);
        }
      })();
      // ---

      // Getting approved amount
      getAllowanceEth(sourceRelayContract, tokenAddress, signer).then(
        (result) => {
          if (!cancelled) {
            setIsFetchingAllowance(false);
            console.log("allowance", formatUnits(result, USDC_DECIMALS));
            setAllowance(formatUnits(result, USDC_DECIMALS));
          }
        },
        (error) => {
          if (!cancelled) {
            setIsFetchingAllowance(false);
            // we can setError(error) here to tell something went wrong allowing spend limit
          }
        }
      );
    }

    return () => {
      cancelled = true;
    };
  }, [destinationChainId, sourceChainId, tokenAddress, isProcessingApproval, sourceRelayContract, signer, switchingNetwork]);

  const approveAmount: (amount: string) => void = useMemo(() => {
    return (amount: string) => {
      setIsApproving(true);
      infoToast("Asking for approval...");

      const usdcWei = parseUnits(amount, USDC_DECIMALS);

      let canceled = false;
      setTimeout(() => {
        if (!canceled) {
          infoToast("Approving spending limit...");
        }
      }, 14000);

      approveEth(sourceRelayContract!, tokenAddress!, signer, usdcWei, {})
        .then(
          (_fullfiled) => {
            successToast("You approved a spending limit successfully!");
          },
          (rejected) => {
            console.error(rejected);
            errorToast("Error: Something went wrong. (Did you reject the spending limit?)");
          }
        )
        .catch((err) => {
          console.error(err);
          errorToast("Something went wrong approving the transaction. Check the console for more info");
        })
        .finally(() => {
          canceled = true;
          setIsApproving(false);
        });
    };
  }, [sourceRelayContract, signer, tokenAddress]);

  return useMemo(
    () => ({
      approveAmount,
      isFetchingAllowance,
      isProcessingApproval,
      sufficientAllowance,
      transactionFee,
    }),
    [approveAmount, isFetchingAllowance, isProcessingApproval, sufficientAllowance, transactionFee]
  );
}
