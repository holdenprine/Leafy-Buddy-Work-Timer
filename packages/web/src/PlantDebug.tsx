import { m } from 'motion/react';
import './PlantDebug.css';
import { GROWTH_STEP_MS, PLANT_START_SIZE } from './plantGrowth';

interface PlantDebugProps {
  durationMs: number;
  remainingMs: number;
  rate: number;
}

const growTransition = { duration: 0.6, ease: 'easeOut' } as const;

/** Visualises discrete growth: a square scaled to x0 * (1 + r)^n after n completed steps. */
export function PlantDebug({ durationMs, remainingMs, rate }: PlantDebugProps) {
  const totalSteps = durationMs / GROWTH_STEP_MS;
  // A session shorter than a whole number of steps still finishes at full size.
  const step = remainingMs === 0 ? totalSteps : Math.floor((durationMs - remainingMs) / GROWTH_STEP_MS);
  const size = PLANT_START_SIZE * (1 + rate) ** step;

  return (
    <div className="plant-debug">
      <div className="plant-debug-stage">
        <m.div
          className="plant-debug-square"
          initial={false}
          animate={{ scale: size }}
          transition={growTransition}
        />
      </div>

      <dl className="plant-debug-readout">
        <dt>step</dt>
        <dd>
          {step} / {totalSteps}
        </dd>
        <dt>rate</dt>
        <dd>{(rate * 100).toFixed(2)}% per step</dd>
        <dt>size</dt>
        <dd>{size.toFixed(3)}</dd>
      </dl>
    </div>
  );
}
