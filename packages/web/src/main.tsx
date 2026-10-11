import { LazyMotion, MotionConfig } from 'motion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

// Loaded as a separate chunk after first paint. `strict` makes any full `motion.*`
// component throw, since it would pull the whole library back into the main bundle;
// use `m.*` instead.
const loadMotionFeatures = () => import('./motionFeatures').then((module) => module.default);

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element');

createRoot(root).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <App />
      </LazyMotion>
    </MotionConfig>
  </StrictMode>,
);
