import { LazyMotion, MotionConfig } from 'motion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Profile } from './Profile';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import { h1 } from 'motion/react-client';

// Loaded as a separate chunk after first paint. `strict` makes any full `motion.*`
// component throw, since it would pull the whole library back into the main bundle;
// use `m.*` instead.
const loadMotionFeatures = () => import('./motionFeatures').then((module) => module.default);

const Main = () => <h1>Main Page</h1>
const Account = () => <h1>Account Page</h1>

const router = createBrowserRouter([
  { path: '/', element: <App />, },
  { path: '/account', element: <Profile />, }, 
])

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element');

createRoot(root).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <RouterProvider router={router} />
      </LazyMotion>
    </MotionConfig>
  </StrictMode>,
);
