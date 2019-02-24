import nf from '../number-format';

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
