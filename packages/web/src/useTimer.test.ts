import { describe, expect, it } from 'vitest';
import { createTimerState, formatTime, timerReducer } from './useTimer';

const MINUTE = 60_000;

describe('timerReducer', () => {
  it('starts idle with the full duration remaining', () => {
    expect(createTimerState(MINUTE)).toEqual({
      durationMs: MINUTE,
      remainingMs: MINUTE,
      status: 'idle',
      endsAt: null,
    });
  });

  it('counts down from the start time', () => {
    let state = timerReducer(createTimerState(MINUTE), { type: 'start', now: 1_000 });
    expect(state).toMatchObject({ status: 'running', endsAt: 61_000 });

    state = timerReducer(state, { type: 'tick', now: 21_000 });
    expect(state.remainingMs).toBe(40_000);
  });

  it('keeps remaining time across pause and resume', () => {
    let state = timerReducer(createTimerState(MINUTE), { type: 'start', now: 0 });
    state = timerReducer(state, { type: 'pause', now: 15_000 });
    expect(state).toMatchObject({ status: 'paused', remainingMs: 45_000, endsAt: null });

    state = timerReducer(state, { type: 'tick', now: 100_000 });
    expect(state.remainingMs).toBe(45_000);

    state = timerReducer(state, { type: 'start', now: 100_000 });
    expect(state.endsAt).toBe(145_000);
  });

  it('finishes when time runs out and cannot be restarted until reset', () => {
    let state = timerReducer(createTimerState(MINUTE), { type: 'start', now: 0 });
    state = timerReducer(state, { type: 'tick', now: 90_000 });
    expect(state).toMatchObject({ status: 'finished', remainingMs: 0, endsAt: null });

    expect(timerReducer(state, { type: 'start', now: 90_000 })).toBe(state);

    state = timerReducer(state, { type: 'reset' });
    expect(state).toEqual(createTimerState(MINUTE));
  });
});

describe('formatTime', () => {
  it('formats as mm:ss and rounds partial seconds up', () => {
    expect(formatTime(25 * MINUTE)).toBe('25:00');
    expect(formatTime(61_000)).toBe('01:01');
    expect(formatTime(500)).toBe('00:01');
    expect(formatTime(0)).toBe('00:00');
  });
});
