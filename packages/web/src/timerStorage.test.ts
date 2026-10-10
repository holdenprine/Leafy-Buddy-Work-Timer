import { describe, expect, it } from 'vitest';
import { parseTimerState } from './timerStorage';

describe('parseTimerState', () => {
  it('reads back a saved running timer', () => {
    const state = { durationMs: 60_000, remainingMs: 60_000, status: 'running', endsAt: 60_000 };
    expect(parseTimerState(JSON.stringify(state))).toEqual(state);
  });

  it.each([
    ['nothing saved', null],
    ['invalid JSON', '{not json'],
    ['wrong shape', JSON.stringify({ hello: 'world' })],
    [
      'unknown status',
      JSON.stringify({ durationMs: 1, remainingMs: 1, status: 'done', endsAt: null }),
    ],
    [
      'running without an end time',
      JSON.stringify({ durationMs: 1, remainingMs: 1, status: 'running', endsAt: null }),
    ],
  ])('ignores %s', (_label, raw) => {
    expect(parseTimerState(raw)).toBeNull();
  });
});
