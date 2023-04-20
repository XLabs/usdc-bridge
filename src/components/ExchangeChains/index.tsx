import styles from "@/components/ExchangeChains/ExchangeChains.module.scss";
import { IChain } from "@/types";
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
        transform: `rotate(${source === "AVAX" ? 90 : 270}deg)`,
      }}
    >
      <Image
        alt="Exchange source and destination chains"
        src="/exchange.png"
        width={30}
        height={30}
      />
    </div>
  );
};

export default ExchangeChains;
