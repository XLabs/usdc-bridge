import styles from "./TransactionDetail.module.scss";

type Props = {};

const TransactionDetail = ({}: Props) => {
  return (
    <div className={styles.transactionDetail}>
      <div className={styles.infoLine}>
        <span>You receive</span>
        <span>998.55 USDC</span>
      </div>
      <div className={styles.infoLine}>
        <span>Est. Destination Gas</span>
        <span>0</span>
      </div>
      <div className={styles.infoLine}>
        <span>Fee</span>
        <span>0.00</span>
      </div>
    </div>
  );
};

export default TransactionDetail;
