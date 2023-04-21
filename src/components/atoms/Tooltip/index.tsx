import React, { ReactNode, useState } from "react";
import styles from "./Tooltip.module.scss";

type Props = {
  text: string;
  children: ReactNode;
};

const Tooltip = ({ text, children }: Props) => {
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const showTooltip = () => {
    setVisible(true);
    setTimeout(() => {
      setOpacity(1);
    }, 50);
  };
  const hideTooltip = () => {
    setOpacity(0);
    setTimeout(() => {
      setVisible(false);
    }, 350);
  };

  return (
    <div className={styles.tooltipWrapper}>
      <div
        style={{ opacity, display: visible ? "block" : "none" }}
        className={styles.tooltip}
      >
        {text}
      </div>
      <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
