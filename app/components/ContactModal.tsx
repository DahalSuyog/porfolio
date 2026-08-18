"use client";

import React from "react";
import styles from "./contact-modal.module.css";

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const email = "sonofdahal@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    alert("Email copied to clipboard.");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <button onClick={onClose} className={styles.close} aria-label="Close">
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className={styles.iconBox}>
          <span className="material-symbols-outlined text-2xl">mail</span>
        </div>

        <h3 className={styles.title}>Get in touch</h3>
        <p className={styles.subtitle}>
          Questions, opportunities, or just a hello — my inbox is open.
        </p>

        <div className={styles.emailBox}>
          <span className={styles.emailLabel}>Email</span>
          <span className={styles.emailAddress}>{email}</span>
          <button onClick={handleCopy} className={styles.copyBtn}>
            <span className="material-symbols-outlined text-sm">content_copy</span>
            Copy address
          </button>
        </div>

        <div className={styles.socialSection}>
          <span className={styles.socialLabel}>Elsewhere</span>
          <a
            href="https://linkedin.com/in/suyog-dahal"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
            title="Open LinkedIn profile"
          >
            <svg
              className={styles.socialIcon}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
