import styles from "./Chain.module.scss";
import ChevronDown from "@/components/atoms/ChevronDownIcon.tsx";
import { IChain } from "@/constants";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  source: IChain;
  changeSource: () => void;
  initial: IChain;
};

const Chain = ({ source, changeSource, initial }: Props) => {
  const initialSrc = initial === "AVAX" ? `${process.env.NEXT_PUBLIC_BASE_PATH}/avalanche.svg` : `${process.env.NEXT_PUBLIC_BASE_PATH}/ethereum.svg`;
  const otherSrc = initial === "AVAX" ? `${process.env.NEXT_PUBLIC_BASE_PATH}/ethereum.svg` : `${process.env.NEXT_PUBLIC_BASE_PATH}/avalanche.svg`;

  const initialTxt = initial === "AVAX" ? "Avalanche" : "Ethereum";
  const otherTxt = initial === "AVAX" ? "Ethereum" : "Avalanche";

  const [opacity, setOpacity] = useState(0);

  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [txt, setTxt] = useState(initialTxt);
  const [optionTxt, setOptionTxt] = useState(otherTxt);
  const [optionImgSrc, setOptionImgSrc] = useState(otherSrc);
  const optionRef = useRef<HTMLDivElement>(null);
  const isAVAX = source === "AVAX";

  useEffect(() => {
    setOpacity(0);

    setTimeout(() => {
      setImgSrc(isAVAX ? initialSrc : otherSrc);
      setTxt(isAVAX ? initialTxt : otherTxt);

      setOptionTxt(isAVAX ? otherTxt : initialTxt);
      setOptionImgSrc(isAVAX ? otherSrc : initialSrc);

      setOpacity(1);
    }, 200);
  }, [isAVAX, initialSrc, otherSrc, initialTxt, otherTxt]);

  const [openMenu, setOpenMenu] = useState(false);

  const handleSelect = () => {
    setOpenMenu((wasOpen) => {
      if (!wasOpen) {
        setTimeout(() => {
          optionRef.current?.focus();
        }, 200);
      }
      return !wasOpen;
    });
  };

  return (
    <div className={styles.chainContainer}>
      <div
        className={styles.chainSelect}
        style={{ opacity }}
        onClick={handleSelect}
      >
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt={`${txt} icon`}
          className={styles.chainImg}
        />
        <span>{txt}</span>
        <ChevronDown size={24} />
      </div>
      {openMenu && (
        <div
          className={styles.chainOption}
          tabIndex={1}
          ref={optionRef}
          onBlur={handleSelect}
          onClick={() => {
            handleSelect();
            changeSource();
          }}
        >
          <Image
            alt={`${optionTxt} icon`}
            src={optionImgSrc}
            width={24}
            height={24}
            className={styles.chainImg}
          />
          <span>{optionTxt}</span>
        </div>
      )}
    </div>
  );
};

export default Chain;