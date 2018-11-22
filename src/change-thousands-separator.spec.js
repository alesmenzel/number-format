import changeThousandsSeparator from './change-thousands-separator';

describe('changeThousandsSeparator', () => {
  test('add the default thousand separator to large number', () => {
    const input = 152000000;
    const format = changeThousandsSeparator();
    expect(format(input)).toBe('152000000');
  });

  test('add the thousand separator to large number', () => {
    const input = 152000000;
    const format = changeThousandsSeparator(' ');
    expect(format(input)).toBe('152 000 000');
  });

  test('add the thousand separator to decimal number', () => {
    const input = 152000000.15;
    const format = changeThousandsSeparator(' ');
    expect(format(input)).toBe('152 000 000.15');
  });

  test('add the thousand separator to zero', () => {
    const input = 0;
    const format = changeThousandsSeparator(' ');
    expect(format(input)).toBe('0');
  });

  test('add the thousand separator to negative number', () => {
    const input = -152000000;
    const format = changeThousandsSeparator(' ');
    expect(format(input)).toBe('-152 000 000');
  });

  test('add the thousand separator to negative decimal number', () => {
    const input = -152000000.156;
    const format = changeThousandsSeparator(' ');
    expect(format(input)).toBe('-152 000 000.156');
  });
});
