import percentage from './percentage';

describe('percentage', () => {
  test('convert to percent format 0.12 -> 12', () => {
    const input = 0.152;
    expect(percentage(input)).toBe(15.2);
  });
});
