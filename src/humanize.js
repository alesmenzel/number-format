import identity from './identity';
import exponent from './exponent';

const HUMANIZE_SUFFIXES = ['', 'K', 'M', 'B', 'T'];

/**
 * Returns number in human readable format
 * ( Handles up to trilions, then it shows e<x> )
 *
 * @example Sample input:
 * ```js
 * humanize()(123000); // 123K
 * humanize()(123456789); // 123.456789M
 * humanize()(-123456789); // -123.456789M
 * humanize()(100); // 100
 * ```
 *
 * @param {Function} transform [optional] Transform function (number => number)
 */
const humanize = (transform = identity) => number => {
  const numStr = `${Math.abs(number)}`;
  const [int] = numStr.split('.');
  const intLen = int.length;

  const index = Math.floor((intLen - 1) / 3);
  const precision = 1000 ** index;
  const exp = exponent(precision);
  const suffix = HUMANIZE_SUFFIXES[index];

  if (!suffix) {
    return number;
  }

  const formatted = transform(+`${number}e${-exp}`);

  return `${formatted}${suffix}`;
};

export default humanize;
