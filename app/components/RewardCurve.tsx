import React from "react";

/**
 * A reward curve: noisy at the start of training, converging to a plateau.
 * Rendered once in the hero; the draw animation lives in globals.css and runs
 * on page load, after the name reveal.
 */
export default function RewardCurve() {
  return (
    <svg
      className="rewardCurve"
      viewBox="0 0 480 220"
      role="img"
      aria-label="Reward per episode rising from noisy starts to a plateau over 500 training episodes"
    >
      <line className="rewardAxis" x1="0" y1="205" x2="480" y2="205" />
      <path
        className="rewardPath"
        pathLength={1}
        d="M0 196 L16 180 L32 190 L48 162 L64 176 L80 146 L96 160 L112 132 L128 146 L144 116 L160 132 L176 104 L192 118 L208 92 L224 102 L240 80 L260 88 L280 68 L300 74 L320 58 L340 64 L360 52 L380 56 L400 46 L420 50 L440 44 L480 45"
      />
      <circle className="rewardDot" cx="472" cy="45" r="4" />
    </svg>
  );
}
