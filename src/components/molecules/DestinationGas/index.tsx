import Tooltip from "@/components/atoms/Tooltip";
import styles from "./DestinationGas.module.scss";
import ReactSlider from "react-slider";
import Loader from "@/components/atoms/Loader";
import { IChain, getChainNativeTokenName } from "@/constants";
import Image from "next/image";

type Props = {
  gas: number;
  onChange: (percent: number) => void;
  maxDestinationGas: bigint | null;
  estimatedGas: string;
  destination: IChain;
  sliderPercentage: number;
};

const DestinationGas = ({ gas, onChange, maxDestinationGas, estimatedGas, destination, sliderPercentage }: Props) => {
  const tooltipText =  new Date() < new Date(2023, 8, 4) ?
  "Convert some USDC to ETH, AVAX or ARB and use it as gas to pay for transaction fees on the destination network." :
  "Convert some USDC to ETH, AVAX, OP or ARB and use it as gas to pay for transaction fees on the destination network.";
  return (
    <>
      <div className={styles.gasContainer}>
        <div className={styles.gasTitle}>
          <span>Add destination gas</span>
          <Tooltip text={tooltipText}>
            <Image className={styles.question} src={`${process.env.NEXT_PUBLIC_BASE_PATH}/question_white.png`} width={16} height={17} alt="tooltip" />
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
          <span>{gas}</span>
        </div>
        <div className={styles.gasAmount}>
          <span className={styles.gasCoin}>{getChainNativeTokenName(destination)}</span>
          <span>{estimatedGas ? `≈ ${estimatedGas}` : "..."}</span>
        </div>
      </div>
    </>
  );
};

export default DestinationGas;
