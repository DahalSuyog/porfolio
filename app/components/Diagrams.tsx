import React from "react";
import styles from "./diagrams.module.css";

function d(ms: number) {
  return { "--d": `${ms}ms` } as React.CSSProperties;
}

const PULSE_TOP = "M128 211 H172 V112 H470 V186";
const PULSE_BOTTOM = "M128 211 H172 V288 H470 V214";

/** How RND turns novelty into reward: a frozen random network and a trained
 *  predictor see the same frames; the predictor's error is the curiosity. */
export function RndSchematic() {
  return (
    <svg
      className={styles.diagram}
      viewBox="0 0 640 400"
      role="img"
      aria-labelledby="rnd-title"
    >
      <title id="rnd-title">
        Random Network Distillation: the same observation goes to a frozen target
        network and a trained predictor. The gap between their outputs is the
        curiosity reward, and the predictor is trained to close it.
      </title>
      <defs>
        <marker id="rnd-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" className={styles.arrowHead} />
        </marker>
        <marker id="rnd-arrow-accent" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" className={styles.arrowHeadAccent} />
        </marker>
      </defs>

      {/* Reveal order follows the data: frames, both networks, the error,
          the reward, then the feedback loop. --d is each stage's delay. */}
      <g className={styles.stage} style={d(0)}>
        <rect className={styles.frameBack} x="32" y="165" width="80" height="60" rx="4" />
        <rect className={styles.frameBack} x="40" y="173" width="80" height="60" rx="4" />
        <rect className={styles.frame} x="48" y="181" width="80" height="60" rx="4" />
        <text className={styles.label} x="88" y="268" textAnchor="middle">4 frames</text>
      </g>

      <g className={styles.stage} style={d(200)}>
        <path className={styles.wire} d="M128 211 H172 V112 H226" markerEnd="url(#rnd-arrow)" />
        <path className={styles.wire} d="M172 211 V288 H226" markerEnd="url(#rnd-arrow)" />
      </g>

      <g className={styles.stage} style={d(550)}>
        <path className={styles.wire} d="M400 112 H470 V184" markerEnd="url(#rnd-arrow)" />
        <path className={styles.wire} d="M400 288 H470 V216" markerEnd="url(#rnd-arrow)" />
      </g>

      {/* Data pulses run behind the network boxes (drawn after them), so a
          frame visibly passes through each network before meeting the other
          at the error node. Hidden under reduced motion. */}
      <g className={styles.pulses}>
        <circle className={styles.pulse} r="4">
          <animateMotion dur="3.2s" repeatCount="indefinite" path={PULSE_TOP} keyPoints="0;1;1" keyTimes="0;0.62;1" calcMode="linear" />
          <animate attributeName="opacity" dur="3.2s" repeatCount="indefinite" values="1;1;0;0" keyTimes="0;0.61;0.63;1" />
        </circle>
        <circle className={styles.pulse} r="4">
          <animateMotion dur="3.2s" repeatCount="indefinite" path={PULSE_BOTTOM} keyPoints="0;1;1" keyTimes="0;0.62;1" calcMode="linear" />
          <animate attributeName="opacity" dur="3.2s" repeatCount="indefinite" values="1;1;0;0" keyTimes="0;0.61;0.63;1" />
        </circle>
        <circle className={styles.ripple} cx="470" cy="200" r="14">
          <animate attributeName="r" dur="3.2s" repeatCount="indefinite" values="14;14;30;30" keyTimes="0;0.62;0.8;1" />
          <animate attributeName="opacity" dur="3.2s" repeatCount="indefinite" values="0;0;0.7;0;0" keyTimes="0;0.619;0.62;0.8;1" />
        </circle>
        <circle className={styles.pulseAccent} r="4.5">
          <animateMotion dur="3.2s" repeatCount="indefinite" path="M484 200 H548" keyPoints="0;0;1;1" keyTimes="0;0.63;0.85;1" calcMode="linear" />
          <animate attributeName="opacity" dur="3.2s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.62;0.63;0.85;0.87;1" />
        </circle>
      </g>

      <g className={styles.stage} style={d(350)}>
        <rect className={styles.box} x="230" y="80" width="170" height="64" rx="6" />
        <text className={styles.title} x="315" y="108" textAnchor="middle">Target network</text>
        <text className={styles.label} x="315" y="129" textAnchor="middle">random, frozen</text>

        <rect className={styles.boxAccent} x="230" y="256" width="170" height="64" rx="6" />
        <text className={styles.title} x="315" y="284" textAnchor="middle">Predictor</text>
        <text className={styles.label} x="315" y="305" textAnchor="middle">trained</text>
      </g>

      <g className={styles.stage} style={d(700)}>
        <circle className={styles.node} cx="470" cy="200" r="14" />
        <path className={styles.minus} d="M463 200 H477" />
      </g>

      <g className={styles.stage} style={d(850)}>
        <path className={styles.wireAccent} d="M484 200 H550" markerEnd="url(#rnd-arrow-accent)" />
        <text className={styles.titleAccent} x="558" y="196">Curiosity</text>
        <text className={styles.label} x="558" y="216">reward</text>
      </g>

      {/* the predictor learns familiar frames, so their reward fades */}
      <g className={styles.stage} style={d(1050)}>
        <path className={styles.wireDashed} d="M470 214 V364 H315 V324" markerEnd="url(#rnd-arrow)" />
        <text className={styles.label} x="392" y="388" textAnchor="middle">
          familiar frames stop being rewarding
        </text>
      </g>
    </svg>
  );
}

/** Delay for a detection box: when the scan line reaches it, plus a little
 *  per-row offset so boxes in the same column don't land at once. */
function scan(x: number, y = 0) {
  return d(Math.round((x / 640) * 1300 + y * 0.6));
}

const CARS_W = [52, 92, 132, 172, 212];
const CARS_E = [404, 452];
const CARS_N = [28, 72, 116];
const CARS_S = [270];

/** A top-down intersection: detected vehicles per approach, longest queue
 *  gets the green. A schematic of the system, not footage from it. */
export function TrafficSchematic() {
  return (
    <svg
      className={styles.diagram}
      viewBox="0 0 640 400"
      role="img"
      aria-labelledby="traffic-title"
    >
      <title id="traffic-title">
        Schematic of a four-way intersection with detection boxes around each
        vehicle. Counts per approach: west 5, north 3, east 2, south 1. The west
        approach, with the longest queue, has the green signal.
      </title>

      <rect className={styles.road} x="0" y="160" width="640" height="80" />
      <rect className={styles.road} x="280" y="0" width="80" height="400" />
      <path className={styles.laneMark} d="M0 200 H272 M368 200 H640 M320 0 V152 M320 248 V400" />
      <path className={styles.stopLine} d="M272 162 V196 M368 204 V238 M322 152 H358 M282 248 H318" />

      {CARS_W.map((x) => (
        <g key={`w${x}`}>
          <rect className={styles.car} x={x} y="174" width="26" height="16" rx="3" />
          <rect className={styles.detect} style={scan(x)} x={x - 4} y="170" width="34" height="24" rx="2" />
        </g>
      ))}
      {CARS_E.map((x) => (
        <g key={`e${x}`}>
          <rect className={styles.car} x={x} y="210" width="26" height="16" rx="3" />
          <rect className={styles.detect} style={scan(x)} x={x - 4} y="206" width="34" height="24" rx="2" />
        </g>
      ))}
      {CARS_N.map((y) => (
        <g key={`n${y}`}>
          <rect className={styles.car} x="332" y={y} width="16" height="26" rx="3" />
          <rect className={styles.detect} style={scan(328, y)} x="328" y={y - 4} width="24" height="34" rx="2" />
        </g>
      ))}
      {CARS_S.map((y) => (
        <g key={`s${y}`}>
          <rect className={styles.car} x="292" y={y} width="16" height="26" rx="3" />
          <rect className={styles.detect} style={scan(288, y)} x="288" y={y - 4} width="24" height="34" rx="2" />
        </g>
      ))}

      {/* the detector's scan line sweeps once, left to right */}
      <rect className={styles.scanLine} x="0" y="0" width="2" height="400" />

      <circle className={styles.signalOn} cx="264" cy="148" r="6" />
      <circle className={styles.signalOff} cx="376" cy="252" r="6" />
      <circle className={styles.signalOff} cx="372" cy="140" r="6" />
      <circle className={styles.signalOff} cx="268" cy="260" r="6" />

      <text className={styles.countAccent} style={d(1500)} x="24" y="144">W 5</text>
      <text className={styles.count} style={d(1580)} x="374" y="40">N 3</text>
      <text className={styles.count} style={d(1660)} x="560" y="272">E 2</text>
      <text className={styles.count} style={d(1740)} x="240" y="372">S 1</text>
    </svg>
  );
}
