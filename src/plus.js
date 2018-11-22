/**
 * Add plus sign to positive number
 *
 * @example Sample input:
 * ```js
 * plus(123456); // +123456
 * plus(0); // 0
 * plus(-123456); // -123456
 * ```
 */
const plus = () => number => (number > 0 ? `+${number}` : number);

export default plus;
