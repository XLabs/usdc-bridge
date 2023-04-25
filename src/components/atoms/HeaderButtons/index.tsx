import { getEvmChainId } from "@/constants";
import styles from "./HeaderButtons.module.scss";
import { useRef, useState } from "react";
import { ChainId } from "@certusone/wormhole-sdk";

type Props = {
  isConnected: boolean;
  connect: (a: any) => void;
  sourceChainId: ChainId;
  headerWalletTxt: any;
  disconnect: () => void;
};

const HeaderButtons = ({
  isConnected,
  connect,
  sourceChainId,
  headerWalletTxt,
  disconnect,
}: Props) => {
  const [showDisconnectHeaderBtn, setShowDisconnectHeaderBtn] = useState(false);
  const disconnectHeaderBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.headerButtons}>
      <button
        onClick={() => {
          if (isConnected) {
            if (!showDisconnectHeaderBtn) {
              setShowDisconnectHeaderBtn(true);
              setTimeout(() => {
                disconnectHeaderBtnRef.current?.focus();
              }, 0);
            }
          } else {
            connect({ chainId: getEvmChainId(sourceChainId) });
          }
        }}
      >
        {headerWalletTxt}
      </button>
      {showDisconnectHeaderBtn && (
        <button
          ref={disconnectHeaderBtnRef}
          className={styles.disconnectHeaderBtn}
          onClick={() => {
            disconnect();
            setShowDisconnectHeaderBtn(false);
          }}
          onBlur={() => {
            setTimeout(() => {
              setShowDisconnectHeaderBtn(false);
            }, 150);
          }}
        >
          Disconnect Wallet
        </button>
      )}
    </div>
  );
};

export default HeaderButtons;
