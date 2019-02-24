import isNumber from 'is-number';
import changeThousandsSeparator from './change-thousands-separator';

class Numeric {
  constructor(number) {
    this.data = {};
    this.number(number);
    this.data.suffix = '';
    this.data.thousandsSeparator = '';
  }

  integer(integer) {
    if (isNumber(integer)) {
      this.data.integer = integer;
      return this;
    }

    return this.data.integer;
  }

  decimal(decimal) {
    if (decimal === null) {
      this.data.decimal = '';
      this.data.decimalPoint = '';
      return this;
    }

    if (isNumber(decimal)) {
      this.data.decimal = decimal;
      this.data.decimalPoint = '.';
      return this;
    }

    return this.data.decimal;
  }

  number(number) {
    if (isNumber(number)) {
      try {
        const [integer, decimal = null] = `${Math.abs(+number)}`.split('.');
        this.data.integer = integer;
        this.decimal(decimal);
        this.data.negative = number < 0;
        this.data.prefix = number < 0 ? '-' : '';
      } catch (err) {
        throw new Error(`Cannot parse invalid number, '${number}' given`);
      }
      return this;
    }

    const { negative, integer, decimal } = this.data;
    return `${negative ? '-' : ''}${integer}.${decimal}`;
  }

  negative(negative) {
    if (negative !== undefined) {
      this.data.negative = negative;
      this.data.prefix = negative ? '-' : '';
      return this;
    }

    return this.data.negative;
  }

  prefix(prefix) {
    if (prefix !== undefined) {
      this.data.prefix = prefix;
      return this;
    }

    return this.data.prefix;
  }

  suffix(suffix) {
    if (suffix !== undefined) {
      this.data.suffix = suffix;
      return this;
    }

    return this.data.suffix;
  }

  decimalPoint(decimalPoint) {
    if (decimalPoint !== undefined) {
      this.data.decimalPoint = decimalPoint;
      return this;
    }

    return this.data.decimalPoint;
  }

  thousandsSeparator(thousandsSeparator) {
    if (thousandsSeparator !== undefined) {
      this.data.thousandsSeparator = thousandsSeparator;
      return this;
    }

    return this.data.thousandsSeparator;
  }

  format() {
    const { prefix, integer, thousandsSeparator, decimalPoint, decimal, suffix } = this.data;
    const thousandsSep = changeThousandsSeparator(thousandsSeparator);
    const int = thousandsSep(integer);
    return `${prefix}${int}${decimalPoint}${decimal}${suffix}`;
  }

  toString() {
    return this.format();
  }
}

export default Numeric;
