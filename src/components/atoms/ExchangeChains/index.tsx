import styles from "./ExchangeChains.module.scss";
import { IChain } from "@/types";
import getPublic from "@/utils/getPublic";
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
        transform: `rotate(${source === "AVAX" ? 0 : 180}deg)`,
      }}
    >
      <Image
        alt="Exchange source and destination chains"
        src={getPublic("/exchange.png")}
        width={30}
        height={30}
      />
    </div>
  );
};

export default ExchangeChains;