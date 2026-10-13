import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('web', () => {
  it('renders the app name, a fresh timer, and the plant section', () => {
    const html = renderToString(<App />);
    expect(html).toContain('Leafy Buddy');
    expect(html).toContain('25:00');
    expect(html).toContain('aria-label="Plant"');
  });
});
