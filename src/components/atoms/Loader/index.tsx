import styles from "./Loader.module.scss";

type Props = {
  size?: "m" | "l";
};

const Loader = ({ size = "l" }: Props) => (
  <div
    className={styles.spinnerLoaderContainer}
    style={{
      transform: `scale(${size === "m" ? 0.6 : 1}) translateY(-${
        size === "m" ? 6 : 0
      }px)`,
    }}
  >
    <span className={styles.spinnerLoader} />
  </div>
);

export default Loader;
