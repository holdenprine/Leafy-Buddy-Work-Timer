import type { CSSProperties } from 'react';
import { PlantDebug } from './PlantDebug';
import { growthRate, PLANT_FULL_SIZE, PLANT_START_SIZE } from './plantGrowth';
import './PlantSection.css';

// Open the app with `?debug-plant` to show the growth debug square.
const isPlantDebug =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('debug-plant');

interface PlantSectionProps {
  /** Length of the timer session the plant grows over. */
  durationMs: number;
  remainingMs: number;
}

export function PlantSection({ durationMs, remainingMs }: PlantSectionProps) {
  const rate = growthRate(durationMs, PLANT_START_SIZE, PLANT_FULL_SIZE);

  return (
    <section
      className="plant-section"
      aria-label="Plant"
      style={{ '--growth-rate': rate } as CSSProperties}
    >
      <h1>Plant Section</h1>
      {isPlantDebug && <PlantDebug durationMs={durationMs} remainingMs={remainingMs} rate={rate} />}
    </section>
  );
}
