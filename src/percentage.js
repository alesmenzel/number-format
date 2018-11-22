/**
 * Convert number to percentage
 *
 * @example Sample input:
 * ```js
 * percentage(0.12); // 12
 * percentage(0); // 0
 * percentage(-1.23); // -123
 * ```
 */
const percentage = () => number => +`${number}e+2`;

export default percentage;
