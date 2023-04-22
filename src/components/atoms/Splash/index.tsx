import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Splash.module.scss";
import Loader from "@/components/atoms/Loader";

const Splash = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 700);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => {
        setIsRemoved(true);
      }, 700);
    }
  }, [isVisible]);

  return (
    <div
      style={{
        display: isRemoved ? "none" : "flex",
        opacity: isVisible ? 1 : 0,
      }}
      className={styles.splash}
    >
      <Image width={200} height={50} alt="Stable logo" src="/stable.png" />
      <div className={styles.usdc}>
        <Image width={40} height={40} alt="USDC icon" src="/usdc.png" />
        <h1>USDC Bridge</h1>
      </div>
      <div className={styles.loader}>
        <Loader />
      </div>
    </div>
  );
};

export default Splash;
