import exponent from './exponent';

describe('exponent', () => {
  test('returns the exponent for a big number', () => {
    const input = 1500000000;
    expect(exponent(input)).toBe(9);
  });

  test('returns the exponent for zero', () => {
    const input = 0;
    expect(exponent(input)).toBe(0);
  });

  test('returns the exponent for a small number', () => {
    const input = 0.000000015;
    expect(exponent(input)).toBe(-8);
  });
});
