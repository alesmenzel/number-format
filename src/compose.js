/**
 * Compose functions, the output of one functions is input to another function
 *
 * @example Sample input:
 * ```js
 * const multiply = multiplier => number => number * multiplier;
 * const subtract = sub => number => number - sub;
 *
 * const calc = compose(multiply(2), multiply(10), subtract(5));
 * calc(2); // 35
 * ```
 *
 * @param  {Function[]} fncs Functions
 */
const compose = (...fncs) => number => fncs.reduce((acc, fnc) => fnc(acc), number);

export default compose;
