import React from "react";
import Reveal from "./Reveal";

/**
 * A thin reward-curve rule that draws itself left-to-right when it enters the
 * viewport. The noisy start converging to a plateau is the site's signature
 * motif: a training run settling.
 */
export default function CurveDivider() {
  return (
    <Reveal variant="fade" className="curveDivider">
      <svg
        viewBox="0 0 1200 56"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="curveDraw"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          d="M0 46 L28 34 L56 42 L84 26 L112 36 L140 20 L168 30 L196 16 L224 26 L252 14 L280 22 L308 12 L336 20 L364 10 L392 18 L420 9 L460 15 L500 7 L540 12 L580 6 L620 10 L660 5 L700 8 L740 4 L780 7 L820 4 L860 6 L900 4 L940 6 L980 4 L1020 5 L1060 4 L1100 5 L1140 4 L1200 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </Reveal>
  );
}
