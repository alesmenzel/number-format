/**
 * Add arbitrary suffix to number
 *
 * @example Sample input:
 * ```js
 * suffix('€')(123456); // 123456€
 * suffix('€')(0); // 0€
 * suffix('€')(-123456); // -123456€
 * ```
 *
 * @param {String} str Suffix to append
 */
const suffix = str => number => `${number}${str}`;

export default suffix;
