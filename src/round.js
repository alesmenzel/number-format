import exponent from './exponent';

const base10 = exponent(10);

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
  const exp = base10(precision);
  return number => {
    let rounded = (number / precision).toFixed() * precision;
    // fix imprecission (e.g. '0.00000023 / 0.1 * 0.1' -> '2.3000000000000002e-7')
    if (exp < 0) {
      rounded = rounded.toFixed(Math.abs(exp));
    }
    return +rounded;
  };
};

export default round;
