import type { TimerState, TimerStatus } from './useTimer';

const STORAGE_KEY = 'leafy-buddy:timer';
const STATUSES: readonly TimerStatus[] = ['idle', 'running', 'paused', 'finished'];

export function parseTimerState(raw: string | null): TimerState | null {
  if (!raw) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  return isTimerState(value) ? value : null;
}

function isTimerState(value: unknown): value is TimerState {
  if (typeof value !== 'object' || value === null) return false;
  const { durationMs, remainingMs, status, endsAt } = value as Record<string, unknown>;
  return (
    typeof durationMs === 'number' &&
    typeof remainingMs === 'number' &&
    STATUSES.includes(status as TimerStatus) &&
    (status === 'running' ? typeof endsAt === 'number' : endsAt === null)
  );
}

// localStorage can be missing (non-browser environments) or throw (blocked storage,
// quota exceeded), and losing persistence must never break the timer itself.
export function loadSavedTimer(): TimerState | null {
  try {
    return parseTimerState(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function saveTimer(state: TimerState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Keep running without persistence.
  }
}
