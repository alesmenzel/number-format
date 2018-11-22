import changeSeparators from './change-separators';

describe('changeSeparators', () => {
  test('add the default thousand and decimal separator for a large number', () => {
    const input = 152000000.123;
    const format = changeSeparators();
    expect(format(input)).toBe('152000000.123');
  });

  test('add the thousand separator and change decimal point for a large number', () => {
    const input = 152000000;
    const format = changeSeparators(' ', ',');
    expect(format(input)).toBe('152 000 000');
  });

  test('add the thousand separator and change decimal point for a decimal number', () => {
    const input = 152000000.15;
    const format = changeSeparators(' ', ',');
    expect(format(input)).toBe('152 000 000,15');
  });

  test('add the thousand separator and change decimal point for zero', () => {
    const input = 0;
    const format = changeSeparators(' ', ',');
    expect(format(input)).toBe('0');
  });

  test('add the thousand separator and change decimal point for negative number', () => {
    const input = -152000000;
    const format = changeSeparators(' ', ',');
    expect(format(input)).toBe('-152 000 000');
  });

  test('add the thousand separator and change decimal point for negative decimal number', () => {
    const input = -152000000.156;
    const format = changeSeparators(' ', ',');
    expect(format(input)).toBe('-152 000 000,156');
  });
});
