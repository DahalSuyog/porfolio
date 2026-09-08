import React from "react";
import styles from "./hero-orbit.module.css";

/** A purely decorative motion study for the landing page hero. */
export default function HeroOrbit() {
  return (
    <div className={styles.field} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 480 340" focusable="false">
        <defs>
          <linearGradient id="orbitStroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="0.52" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.14" />
          </linearGradient>
        </defs>

        <path className={styles.contour} d="M46 255C94 179 158 260 229 206C304 149 340 78 436 111" />
        <path className={styles.contourMuted} d="M24 109C100 65 150 129 215 96C289 59 350 32 461 93" />

        <g className={styles.orbitWide}>
          <ellipse className={styles.orbitLine} cx="240" cy="170" rx="164" ry="68" />
          <circle className={styles.satellite} cx="404" cy="170" r="4" />
        </g>
        <g className={styles.orbitTall}>
          <ellipse className={styles.orbitLine} cx="240" cy="170" rx="78" ry="148" />
          <circle className={styles.satelliteSmall} cx="240" cy="22" r="3" />
        </g>
        <g className={styles.orbitTilt}>
          <ellipse className={styles.orbitLine} cx="240" cy="170" rx="128" ry="91" />
          <circle className={styles.satelliteMuted} cx="368" cy="170" r="3.5" />
        </g>

        <circle className={styles.coreRing} cx="240" cy="170" r="48" />
        <path
          className={styles.core}
          d="M240 133C250 151 267 157 277 170C267 183 250 189 240 207C230 189 213 183 203 170C213 157 230 151 240 133Z"
        />
        <circle className={styles.coreDot} cx="240" cy="170" r="5" />
      </svg>
    </div>
  );
}
