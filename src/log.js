/**
 * Calculate logarithm of any base value, also handles javascript impression
 * by rounding to the 15th decimal digit (arbitrary because we lose precision for > 15 digits)
 * ( https://people.richland.edu/james/lecture/m116/logs/properties.html )
 *
 * ```js
 * log(a)x = log x / log a
 * ```
 *
 * @param {Number} base Base value 'a'
 * @param {Number} number Argument 'x'
 */
const log = (base, number) => +(Math.log(number) / Math.log(base)).toFixed(15);

export default log;
