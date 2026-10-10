import { useEffect, useReducer } from 'react';
import { loadSavedTimer, saveTimer } from './timerStorage';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

export interface TimerState {
  durationMs: number;
  remainingMs: number;
  status: TimerStatus;
  /** Wall-clock time the countdown hits zero; only set while running. */
  endsAt: number | null;
}

export type TimerAction =
  | { type: 'start'; now: number }
  | { type: 'pause'; now: number }
  | { type: 'tick'; now: number }
  | { type: 'reset' };

const TICK_MS = 250;

export function createTimerState(durationMs: number): TimerState {
  return { durationMs, remainingMs: durationMs, status: 'idle', endsAt: null };
}

// Remaining time is derived from `endsAt` rather than decremented per tick, so the
// countdown stays accurate when intervals drift or the tab is throttled in the background.
export function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'start':
      if (state.status === 'running' || state.status === 'finished') return state;
      return { ...state, status: 'running', endsAt: action.now + state.remainingMs };

    case 'pause': {
      if (state.status !== 'running' || state.endsAt === null) return state;
      const remainingMs = Math.max(0, state.endsAt - action.now);
      if (remainingMs === 0) return { ...state, status: 'finished', remainingMs, endsAt: null };
      return { ...state, status: 'paused', remainingMs, endsAt: null };
    }

    case 'tick': {
      if (state.status !== 'running' || state.endsAt === null) return state;
      const remainingMs = Math.max(0, state.endsAt - action.now);
      if (remainingMs === 0) return { ...state, status: 'finished', remainingMs, endsAt: null };
      return { ...state, remainingMs };
    }

    case 'reset':
      return createTimerState(state.durationMs);
  }
}

/**
 * Resumes a saved session, catching up on time that passed while the page was closed.
 * An idle save is discarded so a changed session length takes effect.
 */
export function restoreTimerState(
  saved: TimerState | null,
  durationMs: number,
  now: number,
): TimerState {
  if (!saved || saved.status === 'idle') return createTimerState(durationMs);
  return timerReducer(saved, { type: 'tick', now });
}

/** Formats milliseconds as mm:ss, rounding up so the display only reads 00:00 once finished. */
export function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function useTimer(initialDurationMs: number) {
  const [state, dispatch] = useReducer(timerReducer, initialDurationMs, (durationMs) =>
    restoreTimerState(loadSavedTimer(), durationMs, Date.now()),
  );

  useEffect(() => {
    saveTimer(state);
  }, [state]);

  useEffect(() => {
    if (state.status !== 'running') return;
    const id = setInterval(() => dispatch({ type: 'tick', now: Date.now() }), TICK_MS);
    return () => clearInterval(id);
  }, [state.status]);

  return {
    ...state,
    start: () => dispatch({ type: 'start', now: Date.now() }),
    pause: () => dispatch({ type: 'pause', now: Date.now() }),
    reset: () => dispatch({ type: 'reset' }),
  };
}
