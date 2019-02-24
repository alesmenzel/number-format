import Numeric from './numeric';
import round from './round';

describe('Number', () => {
  test('add prefix', () => {
    const number = new Numeric(12345678);
    number.prefix('$ ');
    expect(number.format()).toBe('$ 12345678');
  });

  test('add suffix', () => {
    const number = new Numeric(12345678);
    number.suffix(' %');
    expect(number.format()).toBe('12345678 %');
  });

  test('change decimal point', () => {
    const number = new Numeric(12345678.467);
    number.decimalPoint('_DEC_');
    expect(number.format()).toBe('12345678_DEC_467');
  });

  test('change thousands separator', () => {
    const number = new Numeric(12345678);
    number.thousandsSeparator(' ');
    expect(number.format()).toBe('12 345 678');
  });

  test('make positive number from negative', () => {
    const number = new Numeric(-12345678.5678);
    number.negative(false);
    expect(number.format()).toBe('12345678.5678');
  });

  test('change multiple properties', () => {
    const number = new Numeric(-12345678.5678);
    const rounder = round(0.1);
    number
      .number(rounder(number.number()))
      .negative(false)
      .prefix('$ ')
      .suffix(' %')
      .decimalPoint(',')
      .thousandsSeparator(' ');
    expect(number.format()).toBe('$ 12 345 678,6 %');
  });
});
