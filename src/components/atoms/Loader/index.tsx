import styles from "./Loader.module.scss";

type Props = {
  size?: "m" | "l";
};

const Loader = ({ size = "l" }: Props) => (
  <div
    className={styles.spinnerLoaderContainer}
    style={{ transform: `scale(${size === "m" ? 0.6 : 1})` }}
  >
    <span className={styles.spinnerLoader} />
  </div>
);

export default Loader;
