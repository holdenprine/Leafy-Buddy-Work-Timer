import { APP_NAME } from '@app/shared';
import './App.css';
import { AppBackground } from './AppBackground';
import { PlantSection } from './PlantSection';
import { Timer } from './Timer';
import { useTimer } from './useTimer';
import { Link } from 'react-router';

const WORK_SESSION_MS = 25 * 60 * 1000;

export function App() {
  const timer = useTimer(WORK_SESSION_MS);

  return (
    <>
      <AppBackground />

      <main className="app">
        <p className="app-name">{APP_NAME}</p>
        <Link to="/account" className="account-link">Profile</Link>
        <div className="app-pane">
          <Timer timer={timer} />
        </div>

        <div className="app-pane">
          <PlantSection durationMs={timer.durationMs} remainingMs={timer.remainingMs} />
        </div>
      </main>
    </>
  );
}
