import { formatTime, useTimer } from './useTimer';

const WORK_SESSION_MS = 25 * 60 * 1000;

export function Timer() {
  const timer = useTimer(WORK_SESSION_MS);

  return (
    <section aria-label="Work timer">
      <p role="timer">{formatTime(timer.remainingMs)}</p>

      {timer.status === 'running' ? (
        <button type="button" onClick={timer.pause}>
          Pause
        </button>
      ) : (
        <button type="button" onClick={timer.start} disabled={timer.status === 'finished'}>
          {timer.status === 'paused' ? 'Resume' : 'Start'}
        </button>
      )}

      <button type="button" onClick={timer.reset} disabled={timer.status === 'idle'}>
        Reset
      </button>

      {timer.status === 'finished' && <p>Session complete</p>}
    </section>
  );
}
