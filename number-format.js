import changeSeparators from './src/change-separators';
import changeThousandsSeparator from './src/change-thousands-separator';
import compose from './src/compose';
import humanize, * as humanizeOptions from './src/humanize';
import percentage from './src/percentage';
import plus from './src/plus';
import prefix from './src/prefix';
import round from './src/round';
import suffix from './src/suffix';

export {
  changeSeparators,
  changeThousandsSeparator,
  compose,
  humanize,
  percentage,
  plus,
  prefix,
  round,
  suffix,
};

export * from './src/humanize';

export default {
  changeSeparators,
  changeThousandsSeparator,
  compose,
  humanize,
  percentage,
  plus,
  prefix,
  round,
  suffix,
  ...humanizeOptions,
};
