/* eslint-disable no-shadow */
import {
  format,
  createFormatter,
  compose,
  humanize,
  round,
  prefix,
  suffix,
  plus,
  percentage,
  changeSeparators,
  SI_SUFFIXES,
} from './number-format';

describe('number-format', () => {
  test('czech format', () => {
    const input = 1596849.19;
    const czechFormat = compose(round(0.1), changeSeparators(' ', '.'));
    expect(czechFormat(input)).toBe('1 596 849.2');
  });

  test('us format', () => {
    const input = 1596849.19;
    const usFormat = compose(round(0.1), changeSeparators(',', '.'));
    expect(usFormat(input)).toBe('1,596,849.2');
  });

  test('norwegian format', () => {
    const input = 1596849.19;
    const norwegianFormat = compose(round(0.1), changeSeparators('.', ','));
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

  test('round #01', () => {
    const format = round(1000);
    const formatted = format(12345.123);
    expect(formatted).toBe(12000);
  });

  test('round #02', () => {
    const format = round(1);
    const formatted = format(12345.123);
    expect(formatted).toBe(12345);
  });

  test('round #02', () => {
    const format = round(0.01);
    const formatted = format(12345.12345);
    expect(formatted).toBe(12345.12);
  });

  test('humanize #01', () => {
    const format = humanize();
    const formatted = format(123000);
    expect(formatted).toBe('123k');
  });

  test('humanize #02', () => {
    const format = humanize();
    const formatted = format(123456789);
    expect(formatted).toBe('123.456789M');
  });

  test('humanize #03', () => {
    const format = humanize();
    const formatted = format(-123456789);
    expect(formatted).toBe('-123.456789M');
  });

  test('humanize #04', () => {
    const format = humanize();
    const formatted = format(100);
    expect(formatted).toBe(100);
  });

  test('humanize #04', () => {
    const format = humanize({
      transform: round(0.01),
    });
    const formatted = format(123456789);
    expect(formatted).toBe('123.46M');
  });

  test('humanize #05', () => {
    const format = humanize({
      transform: round(0.01),
      base: 1024,
      suffixes: {
        // Custom suffixes or you can use any of the predeffined (or combine them)
        big: ['', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        small: [],
      },
      big: true,
      small: false,
    });
    const formatted = format(156949847);
    expect(formatted).toBe('149.68MB');
  });

  test('percentage #01', () => {
    const format = percentage();
    const formatted = format(0.12);
    expect(formatted).toBe(12);
  });
  test('percentage #02', () => {
    const format = percentage();
    const formatted = format(0);
    expect(formatted).toBe(0);
  });
  test('percentage #03', () => {
    const format = percentage();
    const formatted = format(-1.23);
    expect(formatted).toBe(-123);
  });

  test('plus #01', () => {
    const format = plus();
    const formatted = format(123456);
    expect(formatted).toBe('+123456');
  });
  test('plus #02', () => {
    const format = plus();
    const formatted = format(0);
    expect(formatted).toBe(0);
  });
  test('plus #03', () => {
    const format = plus();
    const formatted = format(-123456);
    expect(formatted).toBe(-123456);
  });

  test('prefix #01', () => {
    const format = prefix('$ ');
    const formatted = format(123456);
    expect(formatted).toBe('$ 123456');
  });
  test('prefix #02', () => {
    const format = prefix('$ ');
    const formatted = format(0);
    expect(formatted).toBe('$ 0');
  });
  test('prefix #03', () => {
    const format = prefix('$ ');
    const formatted = format(-123456);
    expect(formatted).toBe('$ -123456');
  });

  test('suffix #01', () => {
    const format = suffix('€');
    const formatted = format(123456);
    expect(formatted).toBe('123456€');
  });
  test('suffix #02', () => {
    const format = suffix('€');
    const formatted = format(0);
    expect(formatted).toBe('0€');
  });
  test('suffix #03', () => {
    const format = suffix('€');
    const formatted = format(-123456);
    expect(formatted).toBe('-123456€');
  });

  test('custom formatter #01', () => {
    const lastDigits = options => {
      const { length } = options;
      return number => `${number}`.slice(-length);
    };
    const format = lastDigits({ length: 3 });
    const formatted = format(123456789);
    expect(formatted).toBe('789');
  });

  test('custom formatter #02', () => {
    const lastDigits = options => {
      const { length } = options;
      return number => `${number}`.slice(-length);
    };
    const format = compose(round(10), lastDigits({ length: 3 }));
    const formatted = format(123456789);
    expect(formatted).toBe('790');
  });
});
