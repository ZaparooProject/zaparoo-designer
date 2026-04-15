import { describe, expect, it } from 'vitest';
import { DEFAULT_USER_TEXT, getUserTextboxOptions } from './userTextLayer';

describe('DEFAULT_USER_TEXT', () => {
  it('should provide the default label for a new user textbox', () => {
    expect(DEFAULT_USER_TEXT).toBe('New text');
  });
});

describe('getUserTextboxOptions', () => {
  it('should center and mark a new textbox as a user layer', () => {
    const options = getUserTextboxOptions(320, 200);

    expect(options).toMatchObject({
      left: 160,
      top: 100,
      width: 240,
      originX: 'center',
      originY: 'center',
      fill: '#000000',
      fontFamily: 'Noto Sans',
      fontSize: 32,
      textAlign: 'center',
      'zaparoo-user-layer': true,
    });
  });

  it('should fall back to safe defaults when the canvas size is invalid', () => {
    const options = getUserTextboxOptions(0, Number.NaN);

    expect(options.left).toBe(120);
    expect(options.top).toBe(60);
    expect(options.width).toBe(208);
  });
});
