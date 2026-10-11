import { APP_NAME } from '@app/shared';
import './App.css';
import { AppBackground } from './AppBackground';
import { PlantSection } from './PlantSection';
import { Timer } from './Timer';

export function App() {
  return (
    <>
      <AppBackground />

      <main className="app">
        <p className="app-name">{APP_NAME}</p>

        <div className="app-pane">
          <Timer />
        </div>

        <div className="app-pane">
          <PlantSection />
        </div>
      </main>
    </>
  );
}
