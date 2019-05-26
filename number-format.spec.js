/* eslint-disable no-shadow */
import {
  format,
  createFormatter,
  compose,
  round,
  changeSeparators,
  SI_SUFFIXES,
} from './number-format';

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

describe('readme', () => {
  test('format', () => {
    const input = 12345607.55678;
    const fnc = format({
      round: 0.1,
      plus: true,
      humanize: {
        suffixes: SI_SUFFIXES,
      },
    });

    const formatted = fnc(input);
    expect(formatted).toBe('+12.3MB');
  });

  test('formatter', () => {
    const input = 12345607.55678;
    const formatter = createFormatter({
      round: 0.1,
      plus: true,
      humanize: {
        suffixes: SI_SUFFIXES,
      },
    });
    const format = formatter.fnc();
    const formatted = format(input);
    expect(formatted).toBe('+12.3MB');
  });
});
