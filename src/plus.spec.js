import plus from './plus';

describe('plus', () => {
  test('add plus for a positive number', () => {
    const input = 15;
    expect(plus(input)).toBe('+15');
  });

  test('does not add plus for a negative number', () => {
    const input = -15;
    expect(plus(input)).toBe(-15);
  });

  test('does not add plus for a zero', () => {
    const input = 0;
    expect(plus(input)).toBe(0);
  });
});
