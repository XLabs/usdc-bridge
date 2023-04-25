import { ChangeEvent, useRef } from "react";
import styles from "./USDCInput.module.scss";
import Image from "next/image";

type Props = {
  value: string;
  setValue: (val: string) => void;
  maxDecimals: number;
};

const TRANSACTION_LIMIT = 99999999;

const USDCInput = ({ value, setValue, maxDecimals }: Props) => {
  const handleAmountChange = (ev: ChangeEvent<HTMLInputElement>) => {
    // valid number regex
    if (/^\d+(\.\d*)?$/.exec(ev.target.value)) {
      let newValue = ev.target.value;
      let [integers, decimals] = newValue.split(".");

      // no more than TRANSACTION_LIMIT
      if (Number(integers) > TRANSACTION_LIMIT) {
        newValue = integers.slice(0, `${TRANSACTION_LIMIT}`.length);
      }

      // no more than "maxDecimals" decimals
      if (decimals && decimals.length > maxDecimals) {
        newValue = `${integers}.${decimals.slice(0, maxDecimals)}`;
      }

      setValue(newValue);
    } else if (ev.target.value === "") {
      setValue("0");
    }
  };

  const amountInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.usdcInputContainer}>
      <input
        value={value}
        onChange={handleAmountChange}
        ref={amountInputRef}
        onClick={() => value === "0" && amountInputRef.current?.select()}
      />
      <div className={styles.usdcText}>
        <Image alt="USDC icon" width={26} height={26} src={"/usdc.png"} />
        <span>USDC</span>
      </div>
    </div>
  );
};

export default USDCInput;
