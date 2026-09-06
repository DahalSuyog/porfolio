"use client";

import React, { useEffect, useState } from "react";
import styles from "./footer.module.css";

interface FooterProps {
  onContactClick: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kathmandu",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div>
          <p className={styles.brand}>Suyog Dahal</p>
          <p className={styles.tagline}>AI engineer and software developer.</p>
        </div>
        <div className={styles.links}>
          <a
            className={styles.link}
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className={styles.link}
            href="https://linkedin.com/in/suyog-dahal"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <button onClick={onContactClick} className={styles.link}>
            Contact
          </button>
        </div>
        <div className={styles.meta}>
          <p className={styles.clock} suppressHydrationWarning>
            Kathmandu <span className={styles.clockTime}>{time ?? "NPT"}</span>
          </p>
          <p className={styles.copyright}>© {new Date().getFullYear()} Suyog Dahal</p>
        </div>
      </div>
    </footer>
  );
}
