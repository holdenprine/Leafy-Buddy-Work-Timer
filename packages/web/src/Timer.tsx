import './Timer.css';
import { formatTime, useTimer } from './useTimer';

const WORK_SESSION_MS = 25 * 60 * 1000;

export function Timer() {
  const timer = useTimer(WORK_SESSION_MS);

  return (
    <section className="timer" aria-label="Work timer">
      <p className="timer-display" role="timer">
        {formatTime(timer.remainingMs)}
      </p>

      <div className="timer-controls">
        {timer.status === 'running' ? (
          <button type="button" className="button button-primary" onClick={timer.pause}>
            Pause
          </button>
        ) : (
          <button
            type="button"
            className="button button-primary"
            onClick={timer.start}
            disabled={timer.status === 'finished'}
          >
            {timer.status === 'paused' ? 'Resume' : 'Start'}
          </button>
        )}

        <button
          type="button"
          className="button button-secondary"
          onClick={timer.reset}
          disabled={timer.status === 'idle'}
        >
          Reset
        </button>
      </div>

      <p className="timer-status" aria-live="polite">
        {timer.status === 'finished' && 'Session complete'}
      </p>
    </section>
  );
}
