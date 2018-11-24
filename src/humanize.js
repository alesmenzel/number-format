import identity from './identity';
import exponent from './exponent';

export const GENERAL_SUFFIXES = {
  big: ['', 'k', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'],
  small: ['m', 'µ', 'n', 'p'],
};
export const GENERAL_NAME_SUFFIXES = {
  big: [
    '',
    'thousand',
    'million',
    'billion',
    'trillion',
    'quadrillion',
    'quintillion',
    'sextillion',
    'septillion',
  ],
  small: ['thousandth', 'millionth', 'billionth', 'trillionth'],
};

// https://en.wikipedia.org/wiki/Orders_of_magnitude_(data)
export const SI_SUFFIXES = {
  big: ['', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  small: [],
};
export const SI_NAME_SUFFIXES = {
  big: [
    'byte',
    'kilobyte',
    'megabyte',
    'gigabyte',
    'terabyte',
    'petabyte',
    'exabyte',
    'zettabyte',
    'yottabyte',
  ],
  small: [],
};
// https://en.wikipedia.org/wiki/Orders_of_magnitude_(data)
export const IT_SUFFIXES = {
  big: ['', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'],
  small: [],
};
export const IT_NAME_SUFFIXES = {
  big: [
    'byte',
    'kibibyte',
    'mebibyte',
    'gibibyte',
    'tebibyte',
    'pebibyte',
    'exbibyte',
    'zebibyte',
    'yobibyte',
  ],
  small: [],
};
// https://en.wikipedia.org/wiki/Orders_of_magnitude_(time)
export const TIME_SUFFIXES = {
  big: ['', 'ks', 'Ms', 'Gs', 'Ts', 'Ps', 'Es', 'Zs', 'Ys'],
  small: ['ms', 'µs', 'ns', 'ps', 'fs', 'as', 'zs', 'ys'],
};
export const TIME_NAME_SUFFIXES = {
  big: [
    '',
    'kilosecond',
    'megasecond',
    'gigasecond',
    'terasecond',
    'petasecond',
    'exasecond',
    'zettasecond',
    'yottasecond',
  ],
  small: [
    'millisecond',
    'microsecond',
    'nanosecond',
    'picosecond',
    'femtosecond',
    'attosecond',
    'zeptosecond',
    'yoctosecond',
  ],
};

const defaultOptions = {
  transform: undefined,
  suffixes: undefined,
  base: undefined,
  big: undefined,
  small: undefined,
};

/**
 * Returns number in human readable format
 * ( Handles up to trilions, then it shows e<x> )
 *
 * @example Sample input:
 * ```js
 * humanize()(123000); // 123k
 * humanize()(123456789); // 123.456789M
 * humanize()(-123456789); // -123.456789M
 * humanize()(100); // 100
 *
 * humanize({
 *  transform: round(0.01),
 *  base: 1024
 *  suffixes: {
 *    big: ['', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
 *    small: []
 *  },
 *  big: true,
 *  small: true
 * })(156949847); // 149.68MB
 * ```
 *
 * @param {Object} options Options
 * @param {Function} options.transform [optional] Transform the humanized result before appending a sufix (number => number)
 * @param {Object} options.suffixes [optional] Suffixes to use (defaults to GENERAL_SUFFIXES)
 * @param {Number} options.base [optional] Base to use (defaults to 1000)
 * @param {Boolean} options.big [optional] Use suffixes for big numbers if available (defautls to true)
 * @param {Boolean} options.small [optional] Use suffixes for small numbers if available (defautls to false)
 */
const humanize = (options = defaultOptions) => {
  const {
    transform = identity,
    suffixes = GENERAL_SUFFIXES,
    base = 1000,
    big = true,
    small = true,
  } = options;

  const baseExponent = exponent(base);

  return number => {
    const exp = baseExponent(number);

    if (exp > 0 && !big) {
      return number;
    }

    if (exp < 0 && !small) {
      return number;
    }

    const side = exp >= 0 ? 'big' : 'small';
    const index = exp >= 0 ? exp : Math.abs(exp + 1);
    const suffix = suffixes[side][index];

    if (!suffix) {
      return number;
    }

    const res = number / base ** exp;
    const formatted = transform(res);

    return `${formatted}${suffix}`;
  };
};

export default humanize;
