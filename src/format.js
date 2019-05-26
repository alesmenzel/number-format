/* eslint-disable no-shadow */
import prefix from './prefix';
import suffix from './suffix';
import plus from './plus';
import round from './round';
import percentage from './percentage';
import changeSeparators from './change-separators';
import humanize from './humanize';
import compose from './compose';

const nf = {
  prefix,
  suffix,
  plus,
  round,
  percentage,
  changeSeparators,
  humanize,
  compose,
};

const plusPrefix = nf.prefix('+');

const format = (options = {}) => {
  const {
    decimalPoint = '.',
    thousandsSeparator = '',
    round = false,
    percentage = false,
    humanize = false,
    plus = false,
    prefix = '',
    suffix = '',
  } = options;

  const stack = [];
  const separators = nf.changeSeparators(thousandsSeparator, decimalPoint);

  if (percentage) {
    stack.push(nf.percentage());
  }

  if (humanize) {
    const humanizeStack = [];

    if (round) {
      humanizeStack.push(nf.round(round));
    }

    humanizeStack.push(number => {
      let value = separators(number);

      if (plus && number > 0) {
        value = plusPrefix(value);
      }

      return value;
    });

    if (humanize.transform) {
      humanizeStack.push(humanize.transform);
    }

    stack.push(
      nf.humanize({
        ...humanize,
        transform: nf.compose(...humanizeStack),
      })
    );
  } else {
    if (round) {
      stack.push(nf.round(round));
    }

    stack.push(number => {
      let value = separators(number);

      if (plus && number > 0) {
        value = plusPrefix(value);
      }

      return value;
    });
  }

  if (percentage) {
    stack.push(nf.suffix(' %'));
  }

  if (prefix) {
    stack.push(nf.prefix(prefix));
  }

  if (suffix) {
    stack.push(nf.suffix(suffix));
  }

  return nf.compose(...stack);
};

export default format;
