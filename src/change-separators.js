import changeThousandsSeparator from './change-thousands-separator';

/**
 * Change decimal separator
 *
 * @example Sample input:
 * ```js
 * changeSeparators(' ', ',')(123456789.12); // 123 456 789,12
 * changeSeparators('', '.')(123456789.12); // 123456789.12
 * ```
 *
 * @param {String} thousandSep Thousands separator
 * @param {String} decimalSep Decimal separator
 */
const changeSeparators = (thousandSep = ',', decimalSep = '.') => number => {
  const [int, dec] = `${number}`.split('.');

  const sep = changeThousandsSeparator(thousandSep)(int);

  if (!dec) {
    return sep;
  }

  return `${sep}${decimalSep}${dec}`;
};

export default changeSeparators;
