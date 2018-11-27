import log from './log';

describe('log', () => {
  test('calculates correctly log(e)x', () => {
    const a = Math.E;
    const x = 5;
    expect(log(a, x)).toBe(1.6094379124341);
  });

  test('calculates correctly log(10)x', () => {
    const a = 10;
    const x = 5;
    expect(log(a, x)).toBe(0.698970004336019);
  });

  test('calculates correctly log(a)x', () => {
    const a = 12;
    const x = 5;
    expect(log(a, x)).toBe(0.647685462377997);
  });
});
