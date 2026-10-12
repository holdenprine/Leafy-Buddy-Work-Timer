import { describe, expect, it } from 'vitest';
import { GROWTH_STEP_MS, growthRate } from './plantGrowth';

describe('growthRate', () => {
  it('compounds from the start size to the end size over the session', () => {
    const durationMs = 25 * GROWTH_STEP_MS;
    const rate = growthRate(durationMs, 0.1, 1);
    expect(0.1 * (1 + rate) ** 25).toBeCloseTo(1);
  });

  it('is about 9.65% per minute for a 25-minute session growing tenfold', () => {
    expect(growthRate(25 * GROWTH_STEP_MS, 0.1, 1)).toBeCloseTo(0.0965, 4);
  });

  it('returns 0 for an empty session or zero start size', () => {
    expect(growthRate(0, 0.1, 1)).toBe(0);
    expect(growthRate(25 * GROWTH_STEP_MS, 0, 1)).toBe(0);
  });
});
