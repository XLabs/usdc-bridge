import styles from "./Chain.module.scss";
import ChevronDown from "@/components/atoms/ChevronDownIcon.tsx";
import { IChain } from "@/constants";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  selected: IChain;
  changeChain: (chain: IChain) => void;
};

const getChainImg = (chain: IChain) => {
  if (chain === "ETH") return `${process.env.NEXT_PUBLIC_BASE_PATH}/ethereum.svg`;
  if (chain === "AVAX") return `${process.env.NEXT_PUBLIC_BASE_PATH}/avalanche.svg`;
  if (chain === "ARBITRUM") return `${process.env.NEXT_PUBLIC_BASE_PATH}/arbitrum.svg`;
  if (chain === "OPTIMISM") return `${process.env.NEXT_PUBLIC_BASE_PATH}/optimism.svg`;
  return "";
};

const getChainTxt = (chain: IChain) => {
  if (chain === "ETH") return "Ethereum";
  if (chain === "AVAX") return "Avalanche";
  if (chain === "ARBITRUM") return "Arbitrum";
  if (chain === "OPTIMISM") return "Optimism";
  return "";
};

const Chain = ({ selected, changeChain }: Props) => {
  const optionsTxts =
    selected === "AVAX"
      ? ["Arbitrum", "Ethereum", "Optimism"]
      : selected === "ETH"
      ? ["Arbitrum", "Avalanche", "Optimism"]
      : selected === "OPTIMISM"
      ? ["Arbitrum", "Avalanche", "Ethereum"]
      : ["Avalanche", "Ethereum", "Optimism"];

  const optionsChains: IChain[] =
    selected === "AVAX"
      ? ["ARBITRUM", "ETH", "OPTIMISM"]
      : selected === "ETH"
      ? ["ARBITRUM", "AVAX", "OPTIMISM"]
      : selected === "OPTIMISM"
      ? ["ARBITRUM", "AVAX", "ETH"]
      : ["AVAX", "ETH", "OPTIMISM"];

  const optionImgSrcs =
    selected === "AVAX"
      ? [
          `${process.env.NEXT_PUBLIC_BASE_PATH}/arbitrum.svg`,
          `${process.env.NEXT_PUBLIC_BASE_PATH}/ethereum.svg`,
          `${process.env.NEXT_PUBLIC_BASE_PATH}/optimism.svg`,
        ]
      : selected === "ETH"
      ? [
          `${process.env.NEXT_PUBLIC_BASE_PATH}/arbitrum.svg`,
          `${process.env.NEXT_PUBLIC_BASE_PATH}/avalanche.svg`,
          `${process.env.NEXT_PUBLIC_BASE_PATH}/optimism.svg`,
        ]
      : selected === "OPTIMISM"
      ? [
          `${process.env.NEXT_PUBLIC_BASE_PATH}/arbitrum.svg`,
          `${process.env.NEXT_PUBLIC_BASE_PATH}/avalanche.svg`,
          `${process.env.NEXT_PUBLIC_BASE_PATH}/ethereum.svg`,
        ]
      : [
          `${process.env.NEXT_PUBLIC_BASE_PATH}/avalanche.svg`,
          `${process.env.NEXT_PUBLIC_BASE_PATH}/ethereum.svg`,
          `${process.env.NEXT_PUBLIC_BASE_PATH}/optimism.svg`,
        ];

  const [opacity, setOpacity] = useState(0);
  const [imgSrc, setImgSrc] = useState(getChainImg(selected));
  const [txt, setTxt] = useState(getChainTxt(selected));

  const option1Ref = useRef<HTMLDivElement>(null);
  const option2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpacity(0);

    setTimeout(() => {
      setImgSrc(getChainImg(selected));
      setTxt(getChainTxt(selected));

      setOpacity(1);
    }, 200);
  }, [selected]);

  const [openMenu, setOpenMenu] = useState(false);

  const handleSelect = () => {
    if (!openMenu) {
      setOpenMenu(true);
      setTimeout(() => {
        option1Ref.current?.focus();
      }, 200);
    } else {
      setTimeout(() => {
        setOpenMenu(false);
      }, 200);
    }
  };

  return (
    <div className={styles.chainContainer}>
      <div className={styles.chainSelect} style={{ opacity }} onClick={handleSelect}>
        <Image src={imgSrc} width={24} height={24} alt={`${txt} icon`} className={styles.chainImg} />
        <span>{txt}</span>
        <ChevronDown size={24} />
      </div>
      {openMenu && (
        <>
          {optionsTxts.map((optionTxt, idx) => (
            <div
              key={optionTxt}
              className={styles.chainOption}
              style={{ top: `calc(${idx + 1} * (5vh + 2px))` }}
              tabIndex={1}
              ref={idx === 0 ? option1Ref : option2Ref}
              onBlur={handleSelect}
              onClick={() => {
                handleSelect();
                changeChain(optionsChains[idx]);
              }}
            >
              <Image alt={`${optionTxt} icon`} src={optionImgSrcs[idx]} width={24} height={24} className={styles.chainImg} />
              <span>{optionTxt}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Chain;
