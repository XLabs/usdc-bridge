import { USDC_DECIMALS } from "@/constants";
import { approveEth, getAllowanceEth } from "@certusone/wormhole-sdk";
import { BigNumber, ethers } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import { useEffect, useMemo, useState } from "react";
import { errorToast, successToast } from "./toast";

export default function useAllowance(
  signer: ethers.Signer,
  evmChainId: 5 | 43113 | undefined,
  tokenAddress: string,
  transferAmount: string,
  overrideAddress: string
) {
  const [allowance, setAllowance] = useState<string | null>(null);
  const [isAllowanceFetching, setIsAllowanceFetching] = useState(false);
  const [isProcessingApproval, setIsApproving] = useState<boolean>(false);

  const sufficientAllowance =
    allowance && transferAmount && +allowance >= +transferAmount;

  useEffect(() => {
    let cancelled = false;
    if (tokenAddress && signer && overrideAddress && !isProcessingApproval) {
      console.log("efecto turbio post finally");
      setIsAllowanceFetching(true);
      getAllowanceEth(overrideAddress, tokenAddress, signer).then(
        (result) => {
          console.log("turbio result!");
          if (!cancelled) {
            setIsAllowanceFetching(false);
            setAllowance(formatUnits(result, USDC_DECIMALS));
          }
        },
        (error) => {
          console.log("turbio error", error);
          if (!cancelled) {
            setIsAllowanceFetching(false);
            // todo: we can setError(error) here to tell something went wrong allowing eths.
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

      const usdcWei = parseUnits(amount, USDC_DECIMALS);

      approveEth(overrideAddress!, tokenAddress!, signer, usdcWei, {})
        .then(
          (fullfiled) => {
            console.log("fullfiled?", fullfiled);
            successToast(
              `You approved a spending limit of ${amount} successfully!`
            );
          },
          (rejected) => {
            console.error(rejected);
            errorToast("Error: user rejected the approval transaction");
          }
        )
        .finally(() => {
          console.log("finally!!!");
          setIsApproving(false);
        });
    };
  }, [overrideAddress, signer, tokenAddress]);

  return useMemo(
    () => ({
      sufficientAllowance,
      approveAmount,
      isProcessingApproval,
    }),
    [sufficientAllowance, approveAmount, isProcessingApproval]
  );
}
