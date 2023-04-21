import React, { ReactNode, useState } from "react";
import styles from "./Tooltip.module.scss";

type Props = {
  text: string;
  children: ReactNode;
};

const Tooltip = ({ text, children }: Props) => {
  const [visible, setVisible] = useState(false);
  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div className={styles.tooltipWrapper}>
      <div style={{ opacity: visible ? 1 : 0 }} className={styles.tooltip}>
        {text}
      </div>
      <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
