import { APP_NAME } from '@app/shared';
import { describe, expect, it } from 'vitest';

describe('api', () => {
  it('resolves @app/shared through the workspace', () => {
    expect(APP_NAME).toBe('Leafy Buddy');
  });
});
