"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactButton from "./ContactButton";
import styles from "./navbar.module.css";

const LINKS = [
  { href: "/#projects", label: "Projects", match: "/projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  // from a case study, every nav link leads back up to the home page
  const transitionTypes = pathname.startsWith("/projects") ? ["nav-back"] : undefined;

  return (
    <header className={styles.navbar} style={{ viewTransitionName: "site-header" }}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.logo}
          transitionTypes={transitionTypes}
          onClick={() => setMenuOpen(false)}
        >
          Suyog Dahal
        </Link>

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <nav
          id="site-nav"
          aria-label="Main"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
        >
          {LINKS.map((link) => {
            const active = link.match !== undefined && pathname.startsWith(link.match);
            return (
              <Link
                key={link.href}
                href={link.href}
                transitionTypes={transitionTypes}
                className={active ? styles.linkActive : styles.link}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <ContactButton className={styles.contactBtn} onOpen={() => setMenuOpen(false)}>
            Contact
          </ContactButton>
        </nav>
      </div>
    </header>
  );
}
