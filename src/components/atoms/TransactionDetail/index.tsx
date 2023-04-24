import { IChain } from "@/types";
import styles from "./TransactionDetail.module.scss";

type Props = {
  amount: string;
  estimatedGas: string;
  oppositeSource: IChain;
  destinationGas: number;
};

const TransactionDetail = ({
  amount,
  estimatedGas,
  oppositeSource,
  destinationGas,
}: Props) => {
  const USDCamount = (+amount - +destinationGas).toFixed(5);

  return (
    <div className={styles.transactionDetail}>
      <div className={styles.infoLine}>
        <span>You receive</span>
        <span>{`${USDCamount} USDC`}</span>
      </div>
      <div className={styles.infoLine}>
        <span>Est. Destination Gas</span>
        <span>
          {estimatedGas ? `≈${estimatedGas} ${oppositeSource}` : "..."}
        </span>
      </div>
      <div className={styles.infoLine}>
        <span>Fee</span>
        <span>0.00</span>
      </div>
    </div>
  );
};

export default TransactionDetail;
