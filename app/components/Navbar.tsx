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
      <Link href="/" className={styles.logo}>
        Suyog Dahal
      </Link>
      <div className={styles.links}>
        <Link
          className={activePage === "home" ? styles.linkActive : styles.link}
          href="/#about"
        >
          About
        </Link>
        <Link className={styles.link} href="/#skills">
          Skills
        </Link>
        <Link className={styles.link} href="/#work">
          Work
        </Link>
        <Link className={styles.link} href="/#experience">
          Experience
        </Link>
        <Link
          className={activePage === "demos" ? styles.linkActive : styles.link}
          href="/demos"
        >
          Demos
        </Link>
      </div>
      <div className={styles.right}>
        <button onClick={onContactClick} className={styles.contactBtn}>
          Contact
        </button>
      </div>
    </nav>
  );
}
