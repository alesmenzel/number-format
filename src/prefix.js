/**
 * Add arbitrary prefix to number
 *
 * @example Sample input:
 * ```js
 * prefix('$')(123456); // $123456
 * prefix('$')(0); // $0
 * prefix('$')(-123456); // $-123456
 * ```
 *
 * @param {String} str Prefix to prepend
 */
const prefix = str => number => `${str}${number}`;

export default prefix;
