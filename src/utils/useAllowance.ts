import { USDC_DECIMALS } from "@/constants";
import { approveEth, getAllowanceEth } from "@certusone/wormhole-sdk";
import { ethers } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import { useEffect, useMemo, useState } from "react";
import { errorToast, infoToast, successToast } from "./toast";

export default function useAllowance(
  signer: ethers.Signer,
  evmChainId: 1 | 5 | 43113 | 43114 | undefined,
  tokenAddress: string,
  transferAmount: string,
  overrideAddress: string
) {
  const [allowance, setAllowance] = useState<string | null>(null);
  const [isFetchingAllowance, setIsFetchingAllowance] = useState(false);
  const [isProcessingApproval, setIsApproving] = useState<boolean>(false);

  const sufficientAllowance =
    allowance && transferAmount && +allowance >= +transferAmount;

  useEffect(() => {
    let cancelled = false;

    if (tokenAddress && signer && overrideAddress && !isProcessingApproval) {
      setIsFetchingAllowance(true);

      getAllowanceEth(overrideAddress, tokenAddress, signer).then(
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
  }, [evmChainId, tokenAddress, isProcessingApproval, overrideAddress, signer]);

  const approveAmount: (amount: string) => void = useMemo(() => {
    return (amount: string) => {
      setIsApproving(true);
      infoToast("Asking for approval...");

      const usdcWei = parseUnits(amount, USDC_DECIMALS);

      approveEth(overrideAddress!, tokenAddress!, signer, usdcWei, {})
        .then(
          (_fullfiled) => {
            successToast("You approved a spending limit successfully!");
          },
          (rejected) => {
            console.error(rejected);
            errorToast(
              "Error: Something went wrong. (Did you reject the spending limit?)"
            );
          }
        )
        .catch((err) => {
          console.error(err);
          errorToast(
            "Something went wrong approving the transaction. Check the console for more info"
          );
        })
        .finally(() => {
          setIsApproving(false);
        });
    };
  }, [overrideAddress, signer, tokenAddress]);

  return useMemo(
    () => ({
      isFetchingAllowance,
      isProcessingApproval,
      sufficientAllowance,
      approveAmount,
    }),
    [
      isFetchingAllowance,
      sufficientAllowance,
      approveAmount,
      isProcessingApproval,
    ]
  );
}
