/**
 * Change thousands separator
 *
 * @example Sample input:
 * ```js
 * changeThousandsSeparator(',')(1000.12); // 1,000.12
 * changeThousandsSeparator(' ')(0); // 0
 * changeThousandsSeparator('_')(-10000.23); // -10_000.123
 * changeThousandsSeparator('_')(-100.23); // -100.123
 * ```
 *
 * @param {String} thousandSep Thousands separator
 */
const changeThousandsSeparator = (thousandSep = '') => number => {
  const numberString = `${Math.abs(number)}`;
  const [int, dec] = numberString.split('.');
  const decSufix = dec ? `.${dec}` : '';
  const sign = number < 0 ? '-' : '';

  if (int.length <= 3) {
    return `${number}`;
  }

  const overflow = int.length % 3;
  const start = int.slice(0, overflow);
  const end = int
    .slice(overflow)
    .match(/\d{3}/g)
    .join(thousandSep);

  if (!start) {
    return `${sign}${end}${decSufix}`;
  }

  return `${sign}${start}${thousandSep}${end}${decSufix}`;
};

export default changeThousandsSeparator;
