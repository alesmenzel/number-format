import prefix from './prefix';

describe('prefix', () => {
  test('prepend prefix', () => {
    const input = 15;
    const format = prefix('~');
    expect(format(input)).toBe('~15');
  });
});
