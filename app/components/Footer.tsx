"use client";

import React from "react";
import styles from "./footer.module.css";

interface FooterProps {
  onContactClick: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
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
        <p className={styles.copyright}>© {new Date().getFullYear()} Suyog Dahal</p>
      </div>
    </footer>
  );
}
