import { useEffect, useState } from "react";
import styles from "./DarkModeSwitch.module.scss";
import Image from "next/image";

const DarkModeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // if user changed dark mode manually sometime, use that. if not, use OS value.
  useEffect(() => {
    const storagePref = localStorage.getItem("data-theme");
    if (storagePref) {
      setIsDarkMode(storagePref === "dark");
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  // ----
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const handleChangeMode = () => {
    localStorage.setItem("data-theme", !isDarkMode ? "dark" : "light");
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={styles.darkModeContainer}
      onClick={handleChangeMode}
      style={{
        backgroundColor: isDarkMode ? "#333" : "#ccc",
      }}
    >
      <div
        className={styles.darkModeSwitch}
        style={{
          marginLeft: isDarkMode ? 25 : 0,
          backgroundColor: isDarkMode ? "#000050" : "#fff",
        }}
      >
        <Image
          alt={isDarkMode ? "moon" : "sun"}
          src={isDarkMode ? "/moonEmoji.png" : "/sunEmoji.png"}
          width={22}
          height={22}
        />
      </div>
    </div>
  );
};

export default DarkModeSwitch;
