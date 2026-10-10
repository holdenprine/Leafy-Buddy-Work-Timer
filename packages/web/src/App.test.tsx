import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('web', () => {
  it('renders the page with the shared app name', () => {
    const html = renderToString(<App />);
    expect(html).toContain('web ok');
    expect(html).toContain('Leafy Buddy');
  });
});
