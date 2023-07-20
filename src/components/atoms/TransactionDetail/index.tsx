import { IChain, getChainNativeTokenName } from "@/constants";
import styles from "./TransactionDetail.module.scss";
import Tooltip from "../Tooltip";
import Image from "next/image";

type Props = {
  amount: string;
  estimatedGas: string;
  destination: IChain;
  destinationGas: number;
  transactionFee: string;
};

const TransactionDetail = ({ amount, estimatedGas, destination, destinationGas, transactionFee }: Props) => {
  const USDCamount = (+amount - +destinationGas - +transactionFee).toFixed(5);
  const USDCamountToShow = Number(USDCamount) < 0 ? 0 : USDCamount;

  return (
    <div className={styles.transactionDetail}>
      <div className={styles.infoLine}>
        <span>Est. Destination Gas</span>
        <span>{estimatedGas ? `≈${estimatedGas} ${getChainNativeTokenName(destination)}` : "..."}</span>
      </div>
      <div className={styles.infoLine}>
        <div>
          <span>Relay Cost</span>
          <Tooltip
            text={`This is used to cover the ${getChainNativeTokenName(
              destination
            )} transaction gas costs to transfer funds to the destination address.`}
          >
            <Image className={styles.question} src={`${process.env.NEXT_PUBLIC_BASE_PATH}/question_white.png`} width={16} height={17} alt="tooltip" />
          </Tooltip>
        </div>
        <span>{transactionFee === "" ? "0.00" : "≈" + transactionFee} USDC</span>
      </div>
      <div className={styles.infoLine}>
        <span>You receive</span>
        <span>{`${USDCamountToShow} USDC`}</span>
      </div>
    </div>
  );
};

export default TransactionDetail;
