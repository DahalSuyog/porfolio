"use client";

import React, { useEffect, useRef } from "react";
import CopyButton from "./CopyButton";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "./links";
import styles from "./contact-modal.module.css";

interface ContactModalProps {
  onClose: () => void;
}

/*
 * Built on the native <dialog>: showModal() makes the rest of the page inert,
 * traps focus, closes on Escape, and returns focus to the opener on close.
 */
export default function ContactModal({ onClose }: ContactModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // The dialog unmounts before the browser can restore focus, so do it here.
    // Record the opener only once: on Strict Mode's second mount, focus is
    // already inside the dialog.
    openerRef.current ??= document.activeElement as HTMLElement | null;
    const opener = openerRef.current;
    if (!dialog.open) dialog.showModal();
    // No dialog.close() here: it fires the close event, which calls onClose,
    // so Strict Mode's mount/unmount/mount would shut the dialog instantly.
    // Unmounting removes the element from the top layer on its own.
    return () => opener?.focus();
  }, []);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="contact-title"
      onClose={onClose}
      onClick={(e) => {
        // a click on the backdrop lands on the dialog element itself
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.content}>
        <button type="button" onClick={onClose} className={styles.close} aria-label="Close">
          <span className="material-symbols-outlined" aria-hidden="true">close</span>
        </button>

        <h2 id="contact-title" className={styles.title}>Contact</h2>
        <p className={styles.subtitle}>
          Email is the fastest way to reach me, for roles, collaborations, or
          questions about a project.
        </p>

        <div className={styles.emailRow}>
          <a className={styles.emailAddress} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <CopyButton text={EMAIL} label="Copy" className={styles.copyBtn} />
        </div>

        <div className={styles.socialLinks}>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={styles.socialLink}>
            GitHub
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className={styles.socialLink}>
            LinkedIn
          </a>
        </div>
      </div>
    </dialog>
  );
}
