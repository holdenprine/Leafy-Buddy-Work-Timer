/** Length of one discrete growth step; the plant compounds once per step. */
export const GROWTH_STEP_MS = 60 * 1000;
export const PLANT_START_SIZE = 0.1;
export const PLANT_FULL_SIZE = 1;

/**
 * Discrete compound growth rate per step: r = (x(t) / x0)^(1 / t) - 1,
 * where t is the number of steps in the session. Returned as a decimal (0.1 = 10%).
 */
export function growthRate(durationMs: number, startSize: number, endSize: number): number {
  const steps = durationMs / GROWTH_STEP_MS;
  if (steps <= 0 || startSize <= 0) return 0;
  return (endSize / startSize) ** (1 / steps) - 1;
}
