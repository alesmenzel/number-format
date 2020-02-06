import compose from './compose';

describe('compose', () => {
  test('composes functions', () => {
    const fncA = a => a + 5;
    const fncB = a => a + 10;
    const fncC = a => a - 80;
    const composedFnc = compose(fncA, fncB, fncC);
    const input = 100;
    expect(composedFnc(input)).toBe(35);
  });
});
