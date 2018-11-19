/**
 * Return exponent of a number
 *
 * @example Sample input:
 * ```js
 * exponent(123456789); // 8
 * exponent(0.001); // -3
 * exponent(1); // 0
 * ```
 *
 * @param {Number} number
 */
const exponent = number => +number.toExponential().match(/e([+-]\d+)$/)[1];

export default exponent;
