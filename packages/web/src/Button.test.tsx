import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('defaults to a primary, non-submitting button', () => {
    const html = renderToString(<Button>Start</Button>);
    expect(html).toContain('type="button"');
    expect(html).toContain('class="button button-primary"');
  });

  it('applies the variant and any extra class names', () => {
    const html = renderToString(
      <Button variant="secondary" className="wide">
        Reset
      </Button>,
    );
    expect(html).toContain('class="button button-secondary wide"');
  });
});
