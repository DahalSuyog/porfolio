import React from "react";
import Image from "next/image";
import styles from "./hero-episode.module.css";

/*
 * The hero is one training episode: the agent playing, and beneath it the two
 * reward streams PPO + RND optimises. Game score climbs while curiosity (the
 * intrinsic reward) fades as the level becomes familiar. The curves are
 * illustrative shapes, generated deterministically so server and client agree.
 */

const W = 800;
const H = 120;
const STEPS = 72;

function noise(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296 - 0.5;
  };
}

function curve(shape: (t: number) => number, jitter: number, seed: number) {
  const rand = noise(seed);
  const points: string[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    // noise shrinks as training settles
    const v = shape(t) + rand() * jitter * (1 - 0.7 * t);
    const y = H - 8 - Math.min(Math.max(v, 0), 1) * (H - 16);
    points.push(`${i === 0 ? "M" : "L"}${((t * W)).toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join(" ");
}

const SCORE = curve((t) => 0.06 + 0.86 / (1 + Math.exp(-(t - 0.42) * 10)), 0.16, 7);
const CURIOSITY = curve((t) => 0.1 + 0.78 * Math.exp(-3.4 * t), 0.14, 23);

export default function HeroEpisode() {
  return (
    <figure className={styles.episode}>
      <div className={styles.screen}>
        <Image
          src="/demo_gifs/dangerous_dave_rl-gif.gif"
          alt="A reinforcement-learning agent playing a level of Dangerous Dave"
          width={800}
          height={500}
          unoptimized
          loading="eager"
          fetchPriority="high"
          className={styles.gif}
        />
      </div>

      <div className={styles.chart}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <line className={styles.axis} x1="0" x2={W} y1={H - 0.5} y2={H - 0.5} />
          <path className={`${styles.line} ${styles.curiosity}`} d={CURIOSITY} pathLength={1} />
          <path className={`${styles.line} ${styles.score}`} d={SCORE} pathLength={1} />
        </svg>
        <ul className={styles.legend}>
          <li className={styles.legendScore}>Game score</li>
          <li className={styles.legendCuriosity}>Curiosity</li>
        </ul>
      </div>

      <figcaption className={styles.caption}>
        The Dangerous Dave agent. Curves are illustrative: curiosity reward fades
        as a level becomes familiar, while game score climbs.
      </figcaption>
    </figure>
  );
}
