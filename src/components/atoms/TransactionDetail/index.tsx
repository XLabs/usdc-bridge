import { IChain, getChainNativeTokenName } from "@/constants";
import styles from "./TransactionDetail.module.scss";

type Props = {
  amount: string;
  estimatedGas: string;
  destination: IChain;
  destinationGas: number;
  transactionFee: string;
};

const TransactionDetail = ({ amount, estimatedGas, destination, destinationGas, transactionFee }: Props) => {
  const USDCamount = (+amount - +destinationGas - +transactionFee).toFixed(5);

  return (
    <div className={styles.transactionDetail}>
      <div className={styles.infoLine}>
        <span>Est. Destination Gas</span>
        <span>{estimatedGas ? `≈${estimatedGas} ${getChainNativeTokenName(destination)}` : "..."}</span>
      </div>
      <div className={styles.infoLine}>
        <span>Relay Cost</span>
        <span>{transactionFee === "" ? "0.00" : "≈" + transactionFee} USDC</span>
      </div>
      <div className={styles.infoLine}>
        <span>You receive</span>
        <span>{`${USDCamount} USDC`}</span>
      </div>
    </div>
  );
};

export default TransactionDetail;
