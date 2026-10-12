import { Button } from './Button';
import './Timer.css';
import { formatTime, type TimerControls } from './useTimer';

interface TimerProps {
  timer: TimerControls;
}

export function Timer({ timer }: TimerProps) {
  return (
    <section className="timer" aria-label="Work timer">
      <p className="timer-display" role="timer">
        {formatTime(timer.remainingMs)}
      </p>

      <div className="timer-controls">
        {timer.status === 'running' ? (
          <Button onClick={timer.pause}>Pause</Button>
        ) : (
          <Button onClick={timer.start} disabled={timer.status === 'finished'}>
            {timer.status === 'paused' ? 'Resume' : 'Start'}
          </Button>
        )}

        <Button variant="secondary" onClick={timer.reset} disabled={timer.status === 'idle'}>
          Reset
        </Button>
      </div>

      <p className="timer-status" aria-live="polite">
        {timer.status === 'finished' && 'Session complete'}
      </p>

      <div>
        {/* button should open a modal with a confirmation prompt, then based on modal select, return user to Timer menu and clear progress toward plant growth  */}
        <Button variant="secondary" onClick={timer.reset}>Abandon Timer</Button>
      </div>
    </section>
  );
}
