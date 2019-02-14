import humanize, { GENERAL_SUFFIXES, TIME_SUFFIXES } from './humanize';

describe('humanize', () => {
  test('convert to human readable format an unsupported big number', () => {
    const input = 146584985916515315498494894849;
    const format = humanize();
    expect(format(input)).toBe(146584985916515315498494894849);
  });

  test('convert to human readable format a trilion', () => {
    const input = 1465849859165;
    const format = humanize();
    expect(format(input)).toBe('1.465849859165T');
  });

  test('convert to human readable format a bilion', () => {
    const input = 1465849859;
    const format = humanize();
    expect(format(input)).toBe('1.465849859B');
  });

  test('convert to human readable format a milion', () => {
    const input = 1465849;
    const format = humanize();
    expect(format(input)).toBe('1.465849M');
  });

  test('convert to human readable format a thousand', () => {
    const input = 1465;
    const format = humanize();
    expect(format(input)).toBe('1.465k');
  });

  test('convert to human readable format a zero', () => {
    const input = 0;
    const format = humanize();
    expect(format(input)).toBe(0);
  });

  test('convert to human readable format a negative thousand', () => {
    const input = -1465;
    const format = humanize();
    expect(format(input)).toBe('-1.465k');
  });

  test('convert to human readable format a negative milion', () => {
    const input = -1465849;
    const format = humanize();
    expect(format(input)).toBe('-1.465849M');
  });

  test('formats positive number before coverting to human readable format', () => {
    const input = 1465;
    const transform = num => num.toFixed(5);
    // @ts-ignore
    const format = humanize({ transform });
    expect(format(input)).toBe('1.46500k');
  });

  test('formats negative number before coverting to human readable format', () => {
    const input = -1465;
    const transform = num => num.toFixed(5);
    // @ts-ignore
    const format = humanize({ transform });
    expect(format(input)).toBe('-1.46500k');
  });

  test('disabled big numbers', () => {
    const input = 156949847;
    const options = {
      transform: number => number.toFixed(2),
      base: 1024,
      suffixes: {
        big: ['', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        small: [],
      },
      big: false,
      small: true,
    };
    const format = humanize(options);
    expect(format(input)).toBe('156949847.00');
  });

  test('disabled small numbers', () => {
    const input = 156949847;
    const options = {
      transform: number => number.toFixed(2),
      base: 1024,
      suffixes: GENERAL_SUFFIXES,
      big: true,
      small: false,
    };
    const format = humanize(options);
    expect(format(input)).toBe('149.68M');
  });

  test('handle suffix for a small number when enabled', () => {
    const input = 0.001;
    const options = {
      base: 1000,
      suffixes: TIME_SUFFIXES,
      big: true,
      small: true,
    };
    // @ts-ignore
    const format = humanize(options);
    expect(format(input)).toBe('1ms');
  });

  test('small numbers for a small number', () => {
    const input = 0.0000000156949847;
    const options = {
      transform: number => number.toFixed(2),
      base: 1000,
      suffixes: GENERAL_SUFFIXES,
      big: true,
      small: true,
    };
    const format = humanize(options);
    expect(format(input)).toBe('15.69n');
  });

  test('disabled small numbers for a small number', () => {
    const input = 0.0000000156949847;
    const options = {
      transform: number => number.toFixed(2),
      base: 1000,
      suffixes: GENERAL_SUFFIXES,
      big: true,
      small: false,
    };
    const format = humanize(options);
    expect(format(input)).toBe('0.00');
  });

  test('all in one', () => {
    const input = 156949847;
    const options = {
      transform: number => number.toFixed(2),
      base: 1024,
      suffixes: {
        big: ['', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        small: [],
      },
      big: true,
      small: true,
    };
    const format = humanize(options);
    expect(format(input)).toBe('149.68MB');
  });
});
