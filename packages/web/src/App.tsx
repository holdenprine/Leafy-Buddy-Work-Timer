import { APP_NAME } from '@app/shared';
import './App.css';
import { Timer } from './Timer';

export function App() {
  return (
    <main className="app">
      <p className="app-name">{APP_NAME}</p>
      <Timer />
    </main>
  );
}
