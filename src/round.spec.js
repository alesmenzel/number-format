import round from './round';

describe('round', () => {
  test('round a big number to large precision', () => {
    const input = 1465849859165153;
    const precision = 10000000;
    const format = round(precision);
    expect(format(input)).toBe(1465849860000000);
  });

  test('round a big number to small precision', () => {
    const input = 1465849859165153;
    const precision = 100;
    const format = round(precision);
    expect(format(input)).toBe(1465849859165200);
  });

  test('round a big number to a whole number', () => {
    const input = 1465849859165153;
    const precision = 1;
    const format = round(precision);
    expect(format(input)).toBe(1465849859165153);
  });

  test('round a small number to large precision', () => {
    const input = 1465;
    const precision = 10000000;
    const format = round(precision);
    expect(format(input)).toBe(0);
  });

  test('round a small number to small precision', () => {
    const input = 1465;
    const precision = 100;
    const format = round(precision);
    expect(format(input)).toBe(1500);
  });

  test('round a small number to whole number', () => {
    const input = 1465;
    const precision = 1;
    const format = round(precision);
    expect(format(input)).toBe(1465);
  });

  test('round a small number to larger precision', () => {
    const input = 162.1565849;
    const precision = 1000;
    const format = round(precision);
    expect(format(input)).toBe(0);
  });
});
