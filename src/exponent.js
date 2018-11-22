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
const exponent = (base = 10) => number =>
  number ? Math.floor(Math.log(Math.abs(number)) / Math.log(base)) : 0;

export default exponent;
