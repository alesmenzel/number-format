import { compose, round, changeSeparators } from './number-format';

describe('number-format', () => {
  test('czech format', () => {
    const input = 1596849.19;
    const czechFormat = compose(
      round(0.1),
      changeSeparators(' ', '.')
    );
    expect(czechFormat(input)).toBe('1 596 849.2');
  });

  test('us format', () => {
    const input = 1596849.19;
    const usFormat = compose(
      round(0.1),
      changeSeparators(',', '.')
    );
    expect(usFormat(input)).toBe('1,596,849.2');
  });

  test('norwegian format', () => {
    const input = 1596849.19;
    const norwegianFormat = compose(
      round(0.1),
      changeSeparators('.', ',')
    );
    expect(norwegianFormat(input)).toBe('1.596.849,2');
  });
});
