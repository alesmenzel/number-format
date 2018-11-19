import humanize from './humanize';

describe('humanize', () => {
  test('convert to human readable format a unsupported big number', () => {
    const input = 1465849859165153;
    const format = humanize();
    expect(format(input)).toBe(1465849859165153);
  });

  test('convert to human readable format a trilion', () => {
    const input = 1465849859165;
    const format = humanize();
    expect(format(input)).toBe('1.465849859165T');
  });

  test('convert to human readable format a bilion', () => {
    const input = 1465849859;
    const format = humanize();
    expect(format(input)).toBe('1.465849859B');
  });

  test('convert to human readable format a milion', () => {
    const input = 1465849;
    const format = humanize();
    expect(format(input)).toBe('1.465849M');
  });

  test('convert to human readable format a thousand', () => {
    const input = 1465;
    const format = humanize();
    expect(format(input)).toBe('1.465K');
  });

  test('convert to human readable format a zero', () => {
    const input = 0;
    const format = humanize();
    expect(format(input)).toBe(0);
  });

  test('convert to human readable format a negative thousand', () => {
    const input = -1465;
    const format = humanize();
    expect(format(input)).toBe('-1.465K');
  });

  test('convert to human readable format a negative milion', () => {
    const input = -1465849;
    const format = humanize();
    expect(format(input)).toBe('-1.465849M');
  });

  test('formats positive number before coverting to human readable format', () => {
    const input = 1465;
    const transform = num => num.toFixed(5);
    const format = humanize(transform);
    expect(format(input)).toBe('1.46500K');
  });

  test('formats negative number before coverting to human readable format', () => {
    const input = -1465;
    const transform = num => num.toFixed(5);
    const format = humanize(transform);
    expect(format(input)).toBe('-1.46500K');
  });
});
