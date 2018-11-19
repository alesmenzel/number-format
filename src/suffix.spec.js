import suffix from './suffix';

describe('suffix', () => {
  test('append suffix', () => {
    const input = 15;
    const format = suffix(' %');
    expect(format(input)).toBe('15 %');
  });
});
