import { APP_NAME } from '@app/shared';
import { Timer } from './Timer';

export function App() {
  return (
    <main>
      <h1>web ok</h1>
      <p>{APP_NAME}</p>
      <Timer />
    </main>
  );
}
