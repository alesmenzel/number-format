import identity from './identity';

describe('identity', () => {
  test('returns the same value', () => {
    const input = 15;
    expect(identity(input)).toBe(input);
  });
});
