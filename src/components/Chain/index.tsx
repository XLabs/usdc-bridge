import styles from "@/components/Chain/Chain.module.scss";
import { IChain } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  source: IChain;
  initial: IChain;
};

const Chain = ({ source, initial }: Props) => {
  const initialSrc = initial === "AVAX" ? "/avalanche.svg" : "/ethereum.svg";
  const otherSrc = initial === "AVAX" ? "/ethereum.svg" : "/avalanche.svg";

  const initialTxt = initial === "AVAX" ? "Avalanche" : "Ethereum";
  const otherTxt = initial === "AVAX" ? "Ethereum" : "Avalanche";

  const [opacity, setOpacity] = useState(0);
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [txt, setTxt] = useState(initialTxt);
  const isAVAX = source === "AVAX";

  useEffect(() => {
    setOpacity(0);

    setTimeout(() => {
      setImgSrc(isAVAX ? initialSrc : otherSrc);
      setTxt(isAVAX ? initialTxt : otherTxt);
      setOpacity(1);
    }, 200);
  }, [isAVAX, initialSrc, otherSrc, initialTxt, otherTxt]);

  return (
    <div className={styles.chainContainer} style={{ opacity }}>
      <Image
        src={imgSrc}
        width={24}
        height={24}
        alt={`${isAVAX ? "Avalanche" : "Ethereum"} icon`}
        className={styles.chainImg}
      />
      <span>{txt}</span>
    </div>
  );
};

export default Chain;
