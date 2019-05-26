import format from './format';

const isNil = val => val === undefined || val === null;

class Formatter {
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Set whether to prefix positive numbers with a plus or returns current settings if called without a value
   *
   * @param {Boolean} plus Plus
   * @returns {Formatter|Boolean} this or current plus option
   */
  plus(plus) {
    if (isNil(plus)) {
      return this.options.plus;
    }

    this.options.plus = plus;
    return this;
  }

  /**
   * Set whether to suffix numbers with a % or returns current settings if called without a value
   *
   * @param {Boolean} percentage Percentage
   * @returns {Formatter|Boolean} this or current percentage option
   */
  percentage(percentage) {
    if (isNil(percentage)) {
      return this.options.percentage;
    }

    this.options.percentage = percentage;
    return this;
  }

  /**
   * Set humanize options or returns current settings if called without a value
   *
   * @param {Object} humanize Humanize config
   * @returns {Formatter|Object} this or current humanize config
   */
  humanize(humanize) {
    if (isNil(humanize)) {
      return this.options.humanize;
    }

    this.options.humanize = humanize;
    return this;
  }

  /**
   * Set rounding or returns current rounding if called without a value
   *
   * @param {Number} round Round
   * @returns {Formatter|Number} this or current rounding
   */
  round(round) {
    if (isNil(round)) {
      return this.options.round;
    }

    this.options.round = round;
    return this;
  }

  /**
   * Set prefix or return current prefix if called without a prefix
   *
   * @param {String} prefix Prefix
   * @returns {Formatter|String} this or current prefix
   */
  prefix(prefix) {
    if (isNil(prefix)) {
      return this.options.prefix;
    }

    this.options.prefix = prefix;
    return this;
  }

  /**
   * Set suffix or return current suffix if called without a suffix
   *
   * @param {String} suffix Suffix
   * @returns {Formatter|String} this or current suffix
   */
  suffix(suffix) {
    if (isNil(suffix)) {
      return this.options.suffix;
    }

    this.options.suffix = suffix;
    return this;
  }

  /**
   * Set decimal point or return current decimal point if called without a decimal point
   *
   * @param {String} decimalPoint Decimal point
   * @returns {Formatter|String} this or current decimal point
   */
  decimalPoint(decimalPoint) {
    if (isNil(decimalPoint)) {
      return this.options.decimalPoint;
    }

    this.options.decimalPoint = decimalPoint;
    return this;
  }

  /**
   * Set thousands separator or return current thousands separator if called without a thousands separator
   *
   * @param {String} thousandsSeparator Thousands separator
   * @returns {Formatter|String} this or current thousands separator
   */
  thousandsSeparator(thousandsSeparator) {
    if (isNil(thousandsSeparator)) {
      return this.options.thousandsSeparator;
    }

    this.options.thousandsSeparator = thousandsSeparator;
    return this;
  }

  /**
   * Set config or return current config if called without a config
   *
   * @param {Object} options Configuration
   */
  config(options) {
    if (isNil(options)) {
      return this.options;
    }

    this.options = options;
    return this;
  }

  /**
   * Get the formatter function
   *
   * @returns {Function} formatting function
   */
  fnc() {
    return format(this.options);
  }
}

export default Formatter;
