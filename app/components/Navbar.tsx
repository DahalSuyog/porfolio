"use client";

import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

interface NavbarProps {
  onContactClick: () => void;
  activePage?: "home" | "demos";
}

export default function Navbar({ onContactClick, activePage = "home" }: NavbarProps) {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navbarLogo}>
        Suyog.AI
      </Link>
      <div className={styles.navLinks}>
        <a
          className={activePage === "home" ? styles.navLinkActive : styles.navLink}
          href="/#about"
        >
          Neural Labs
        </a>
        <a className={styles.navLink} href="/#stack">
          Stack
        </a>
        <a className={styles.navLink} href="/#archive">
          Archive
        </a>
        <Link
          className={activePage === "demos" ? styles.navLinkActive : styles.navLinkDemos}
          href="/demos"
        >
          Demos
        </Link>
        <a className={styles.navLink} href="/#experience">
          History
        </a>
      </div>
      <div className={styles.navRight}>
        <button className={styles.terminalBtn}>
          <span className={`material-symbols-outlined ${styles.terminalIcon}`}>terminal</span>
        </button>
        <button onClick={onContactClick} className={styles.contactBtn}>
          Contact Me
        </button>
      </div>
    </nav>
  );
}
