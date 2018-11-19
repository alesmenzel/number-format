import exponent from './exponent';

/**
 * Round number to a precision
 *
 * @example Sample inputs:
 * ```js
 * round(12345.123, 1000); // 12000
 * round(12345.123, 1); // 12345
 * round(12345.123, 0.01); // 12345.12
 * ```
 *
 * @param {Number} precision Precision in multiplication of 10 (e.g. 1000, 1, 0.1, 0.001)
 */
const round = precision => number => {
  const exp = exponent(precision);

  // We dont use `Math.round(number / precision) * precision` because of the imprecision
  return +`${Math.round(+`${number}e${-exp}`)}e${exp}`;
};

export default round;