import styles from "./ExchangeChains.module.scss";
import { IChain } from "@/constants";
import Image from "next/image";

type Props = {
  onClick: () => void;
  source: IChain;
};

const ExchangeChains = ({ onClick, source }: Props) => {
  return (
    <div
      className={styles.exchange}
      onClick={onClick}
      style={{
        transform: `rotate(${source === "AVAX" ? 0 : 360}deg)`,
      }}
    >
      <Image
        alt="Exchange source and destination chains"
        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/fromTo.png`}
        width={30}
        height={30}
      />
    </div>
  );
};

export default ExchangeChains;
