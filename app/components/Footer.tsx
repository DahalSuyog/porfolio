"use client";

import React, { useEffect, useState } from "react";
import ContactButton from "./ContactButton";
import { GITHUB_URL, LINKEDIN_URL } from "./links";
import styles from "./footer.module.css";

export default function Footer() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kathmandu",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = setInterval(update, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div>
          <p className={styles.brand}>Suyog Dahal</p>
          <p className={styles.tagline}>
            AI engineer in Kathmandu
            {time && <span className={styles.clock}>, where it&rsquo;s {time}</span>}
          </p>
        </div>
        <div className={styles.links}>
          <a className={styles.link} href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className={styles.link} href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <ContactButton className={styles.link}>Contact</ContactButton>
        </div>
      </div>
    </footer>
  );
}
