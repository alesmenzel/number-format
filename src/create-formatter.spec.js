import createFormatter from './create-formatter';
import Formatter from './formatter';

describe('createFormatter', () => {
  test('factory', () => {
    const formatter = createFormatter();
    expect(formatter instanceof Formatter).toBe(true);
  });

  test('without options', () => {
    const formatter = createFormatter();
    expect(formatter.config()).toEqual({});
  });

  test('with options', () => {
    const formatter = createFormatter({ a: 'a', b: 'b' });
    expect(formatter.config()).toEqual({ a: 'a', b: 'b' });
  });
});
