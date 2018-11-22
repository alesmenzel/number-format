import exponent from './exponent';

describe('exponent', () => {
  test('returns the exponent for a big number', () => {
    const input = 1500000000;
    const exp = exponent(10);
    expect(exp(input)).toBe(9);
  });

  test('returns the exponent for zero', () => {
    const input = 0;
    const exp = exponent(10);
    expect(exp(input)).toBe(0);
  });

  test('returns the exponent for a small number', () => {
    const input = 0.000000015;
    const exp = exponent(10);
    expect(exp(input)).toBe(-8);
  });

  test('returns the exponent for a base 1000', () => {
    const input = 1500000000;
    const exp = exponent(1000);
    expect(exp(input)).toBe(3);
  });

  test('returns the exponent for a base 1024', () => {
    const input = 1048576;
    const exp = exponent(1024);
    expect(exp(input)).toBe(2);
  });

  test('returns the exponent for a base 1024', () => {
    const input = 1125899906842624;
    const exp = exponent(1024);
    expect(exp(input)).toBe(5);
  });

  test('returns the exponent for zero', () => {
    const input = 0;
    const exp = exponent();
    expect(exp(input)).toBe(0);
  });
});
