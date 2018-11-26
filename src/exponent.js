import log from './log';

/**
 * Return exponent of a number
 *
 * @example Sample input:
 * ```js
 * exponent()(123456789); // 8
 * exponent()(-123456789); // 8
 * exponent(10)(0.001); // -3
 * exponent(10)(-0.001); // -3
 * exponent(10)(1); // 0
 * ```
 * @param {Number} base The base (defaults to 10)
 */
const exponent = (base = 10) => number => {
  if (!number) {
    return 0;
  }

  return Math.floor(log(base, Math.abs(number)));
};

export default exponent;
