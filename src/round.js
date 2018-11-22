import exponent from './exponent';

const base10Exponent = exponent(10);

/**
 * Round number to a precision
 *
 * @example Sample inputs:
 * ```js
 * round(1000)(12345.123); // 12000
 * round(1)(12345.123); // 12345
 * round(0.01)(12345.123); // 12345.12
 * ```
 *
 * @param {Number} precision Precision in multiplication of 10 (e.g. 1000, 1, 0.1, 0.001)
 */
const round = precision => {
  const exp = base10Exponent(precision);

  // We dont use `Math.round(number / precision) * precision` because of the imprecision
  return number => +`${Math.round(+`${number}e${-exp}`)}e${exp}`;
};

export default round;
