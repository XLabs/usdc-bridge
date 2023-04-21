import Tooltip from "@/components/atoms/Tooltip";
import styles from "./DestinationGas.module.scss";
import ReactSlider from "react-slider";

type Props = {
  onChange: (percent: number) => void;
};

const DestinationGas = ({ onChange }: Props) => {
  return (
    <div className={styles.gasContainer}>
      <div className={styles.gasTitle}>
        <span>Add destination gas</span>
        <Tooltip text="Convert some USDC to ETH or AVAX and use it as gas to pay for transaction fees on the destination network.">
          <span className={styles.question}>?</span>
        </Tooltip>
      </div>

      <ReactSlider
        className={styles.gasSlider}
        thumbClassName={styles.gasSelector}
        onChange={(percentage) => onChange(percentage)}
      />
    </div>
  );
};

export default DestinationGas;
