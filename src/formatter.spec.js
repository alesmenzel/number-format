import Formatter from './formatter';
import round from './round';

describe('plus', () => {
  test('set/get', () => {
    const formatter = new Formatter();
    formatter.plus(true);
    expect(formatter.plus()).toBe(true);
  });

  test('on positive number', () => {
    const number = 12345678.5678;
    const formatter = new Formatter();
    const format = formatter.plus(true).fnc();
    const formatted = format(number);
    expect(formatted).toBe('+12345678.5678');
  });

  test('on negative number', () => {
    const number = -12345678.5678;
    const formatter = new Formatter();
    const format = formatter.plus('$ ').fnc();
    const formatted = format(number);
    expect(formatted).toBe('-12345678.5678');
  });
});

describe('round', () => {
  test('set/get', () => {
    const formatter = new Formatter();
    formatter.round(0.001);
    expect(formatter.round()).toBe(0.001);
  });

  test('to decimals', () => {
    const number = 12345678.5678;
    const formatter = new Formatter();
    const format = formatter.round(0.01).fnc();
    const formatted = format(number);
    expect(formatted).toBe('12345678.57');
  });

  test('to decimals on smaller number', () => {
    const number = 0.00000045678;
    const formatter = new Formatter();
    const format = formatter.round(0.01).fnc();
    const formatted = format(number);
    expect(formatted).toBe('0');
  });

  test('to thousands', () => {
    const number = -12345678.5678;
    const formatter = new Formatter();
    const format = formatter.round(10000).fnc();
    const formatted = format(number);
    expect(formatted).toBe('-12350000');
  });

  test('to thousands on smaller number', () => {
    const number = -1234.5678;
    const formatter = new Formatter();
    const format = formatter.round(10000).fnc();
    const formatted = format(number);
    expect(formatted).toBe('0');
  });
});

describe('humanize', () => {
  test('set/get', () => {
    const formatter = new Formatter();
    const rounder = round(0.01);
    formatter.humanize({
      transform: rounder,
      base: 1024,
      suffixes: {
        big: ['', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      },
      big: true,
      small: false,
    });
    expect(formatter.humanize()).toEqual({
      transform: rounder,
      base: 1024,
      suffixes: {
        big: ['', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      },
      big: true,
      small: false,
    });
  });

  test('on positive number', () => {
    const number = 12345678.5678;
    const formatter = new Formatter();
    const format = formatter
      .humanize({
        transform: round(0.01),
        base: 1000,
        suffixes: {
          big: ['', ' KB', ' MB', ' GB'],
        },
        big: true,
        small: false,
      })
      .fnc();
    const formatted = format(number);
    expect(formatted).toBe('12.35 MB');
  });

  test('on negative number', () => {
    const number = -12345678.5678;
    const formatter = new Formatter();
    const format = formatter
      .humanize({
        transform: round(0.01),
        base: 1000,
        suffixes: {
          big: ['', ' KB', ' MB', ' GB'],
        },
        big: true,
        small: false,
      })
      .fnc();
    const formatted = format(number);
    expect(formatted).toBe('-12.35 MB');
  });
});

describe('prefix', () => {
  test('set/get', () => {
    const formatter = new Formatter();
    formatter.prefix('$ ');
    expect(formatter.prefix()).toBe('$ ');
  });

  test('on positive number', () => {
    const number = 12345678.5678;
    const formatter = new Formatter();
    const format = formatter.prefix('$ ').fnc();
    const formatted = format(number);
    expect(formatted).toBe('$ 12345678.5678');
  });

  test('on negative number', () => {
    const number = -12345678.5678;
    const formatter = new Formatter();
    const format = formatter.prefix('$ ').fnc();
    const formatted = format(number);
    expect(formatted).toBe('$ -12345678.5678');
  });
});

describe('suffix', () => {
  test('set/get', () => {
    const formatter = new Formatter();
    formatter.suffix(' Kč');
    expect(formatter.suffix()).toBe(' Kč');
  });

  test('on a number', () => {
    const number = 12345678.5678;
    const formatter = new Formatter();
    const format = formatter.suffix(' Kč').fnc();
    const formatted = format(number);
    expect(formatted).toBe('12345678.5678 Kč');
  });
});

describe('decimal point', () => {
  test('set/get', () => {
    const formatter = new Formatter();
    formatter.decimalPoint(',');
    expect(formatter.decimalPoint()).toBe(',');
  });

  test('on a decimal', () => {
    const number = 12345678.5678;
    const formatter = new Formatter();
    const format = formatter.decimalPoint('___').fnc();
    const formatted = format(number);
    expect(formatted).toBe('12345678___5678');
  });

  test('on an integer', () => {
    const number = 12345678;
    const formatter = new Formatter();
    const format = formatter.decimalPoint('___').fnc();
    const formatted = format(number);
    expect(formatted).toBe('12345678');
  });

  test('on a zero', () => {
    const number = 0;
    const formatter = new Formatter();
    const format = formatter.decimalPoint('___').fnc();
    const formatted = format(number);
    expect(formatted).toBe('0');
  });
});

describe('thousands separator', () => {
  test('get/set', () => {
    const formatter = new Formatter();
    formatter.thousandsSeparator(' ');
    expect(formatter.thousandsSeparator()).toBe(' ');
  });

  test('on a positive decimal number', () => {
    const number = 12345678.5788;
    const formatter = new Formatter();
    const format = formatter.thousandsSeparator(' : ').fnc();
    const formatted = format(number);
    expect(formatted).toBe('12 : 345 : 678.5788');
  });

  test('on a negative decimal number', () => {
    const number = -12345678.5788;
    const formatter = new Formatter();
    const format = formatter.thousandsSeparator(' : ').fnc();
    const formatted = format(number);
    expect(formatted).toBe('-12 : 345 : 678.5788');
  });

  test('on a positive integer', () => {
    const number = 12345678;
    const formatter = new Formatter();
    const format = formatter.thousandsSeparator(' : ').fnc();
    const formatted = format(number);
    expect(formatted).toBe('12 : 345 : 678');
  });

  test('on a negative integer', () => {
    const number = -12345678;
    const formatter = new Formatter();
    const format = formatter.thousandsSeparator(' : ').fnc();
    const formatted = format(number);
    expect(formatted).toBe('-12 : 345 : 678');
  });

  test('on a zero', () => {
    const number = 0;
    const formatter = new Formatter();
    const format = formatter.thousandsSeparator(' : ').fnc();
    const formatted = format(number);
    expect(formatted).toBe('0');
  });
});

describe('config', () => {
  test('set/get config from constructor', () => {
    const formatter = new Formatter({ a: 'a', b: 'b' });
    expect(formatter.config()).toEqual({ a: 'a', b: 'b' });
  });

  test('set/get config from setter', () => {
    const formatter = new Formatter();
    formatter.config({ a: 'a', b: 'b' });
    expect(formatter.config()).toEqual({ a: 'a', b: 'b' });
  });

  test('set/get config from setter overriding constructor', () => {
    const formatter = new Formatter({ a: 'x', b: 'y', c: 'z' });
    formatter.config({ a: 'a', b: 'b' });
    expect(formatter.config()).toEqual({ a: 'a', b: 'b' });
  });
});

describe('format function', () => {
  test('get format function with no config', () => {
    const formatter = new Formatter();
    expect(typeof formatter.fnc()).toBe('function');
  });

  test('get format function with config', () => {
    const formatter = new Formatter();
    formatter.decimalPoint('.');
    formatter.thousandsSeparator(',');
    expect(typeof formatter.fnc()).toBe('function');
  });
});

describe('all options together', () => {
  test('get prefix', () => {
    const number = 12345678.5678;
    const formatter = new Formatter();
    const format = formatter
      .plus(true)
      .humanize({})
      .round(0.01)
      .prefix('$ ')
      .suffix(' %')
      .decimalPoint(',')
      .thousandsSeparator(' ')
      .fnc();
    const formatted = format(number);
    expect(formatted).toBe('$ +12,35M %');
  });
});
