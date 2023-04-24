import Tooltip from "@/components/atoms/Tooltip";
import styles from "./DestinationGas.module.scss";
import ReactSlider from "react-slider";
import Loader from "@/components/atoms/Loader";
import { IChain } from "@/types";

type Props = {
  amount: string;
  gas: number;
  onChange: (percent: number) => void;
  maxDestinationGas: bigint | null;
  estimatedGas: string;
  oppositeSource: IChain;
  sliderPercentage: number;
};

const DestinationGas = ({
  amount,
  gas,
  onChange,
  maxDestinationGas,
  estimatedGas,
  oppositeSource,
  sliderPercentage,
}: Props) => {
  return (
    <>
      <div className={styles.gasContainer}>
        <div className={styles.gasTitle}>
          <span>Add destination gas</span>
          <Tooltip text="Convert some USDC to ETH or AVAX and use it as gas to pay for transaction fees on the destination network.">
            <span className={styles.question}>?</span>
          </Tooltip>
        </div>

        {maxDestinationGas ? (
          <ReactSlider
            className={styles.gasSlider}
            thumbClassName={styles.gasSelector}
            onChange={(percentage) => onChange(percentage)}
            value={sliderPercentage}
          />
        ) : (
          <div className={styles.sliderLoading}>
            <Loader />
          </div>
        )}
      </div>
      <div className={styles.gasDetails} style={{ opacity: gas ? 1 : 0 }}>
        <div className={styles.gasAmount}>
          <span className={styles.gasCoin}>USDC</span>
          <span>{+amount < gas ? amount : gas}</span>
        </div>
        <div className={styles.gasAmount}>
          <span className={styles.gasCoin}>{oppositeSource}</span>
          <span>{estimatedGas ? `≈ ${estimatedGas}` : "..."}</span>
        </div>
      </div>
    </>
  );
};

export default DestinationGas;
