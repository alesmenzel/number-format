import formatter from './format';
import { GENERAL_NAME_SUFFIXES, SI_SUFFIXES } from './humanize';
import suffix from './suffix';

describe('format', () => {
  test('default options', () => {
    const input = 12345607.55678;
    const format = formatter();

    expect(format(input)).toBe('12345607.55678');
  });

  test('round option', () => {
    const input = 12345607.55678;
    const format = formatter({
      round: 0.1,
    });

    expect(format(input)).toBe('12345607.6');
  });

  test('humanize', () => {
    const input = 12345607.55678;
    const format = formatter({
      humanize: {
        suffixes: GENERAL_NAME_SUFFIXES,
      },
    });

    expect(format(input)).toBe('12.34560755678million');
  });

  test('humanize, round', () => {
    const input = 12345607.55678;
    const format = formatter({
      round: 0.1,
      humanize: {
        suffixes: GENERAL_NAME_SUFFIXES,
      },
    });

    expect(format(input)).toBe('12.3million');
  });

  test('humanize, plus, round', () => {
    const input = 12345607.55678;
    const format = formatter({
      round: 0.1,
      plus: true,
      humanize: {
        suffixes: GENERAL_NAME_SUFFIXES,
      },
    });

    expect(format(input)).toBe('+12.3million');
  });

  test('humanize, plus, round', () => {
    const input = 12345607.55678;
    const format = formatter({
      round: 0.1,
      plus: true,
      humanize: {
        suffixes: SI_SUFFIXES,
      },
    });

    expect(format(input)).toBe('+12.3MB');
  });

  test('humanize + transform, plus, round', () => {
    const input = 12345607.55678;
    const format = formatter({
      round: 0.1,
      plus: true,
      humanize: {
        transform: suffix(' '),
        suffixes: SI_SUFFIXES,
      },
    });

    expect(format(input)).toBe('+12.3 MB');
  });

  test('percentage option', () => {
    const input = 1.55678;
    const format = formatter({
      percentage: true,
    });

    expect(format(input)).toBe('155.678 %');
  });

  test('prefix option', () => {
    const input = 1.55678;
    const format = formatter({
      prefix: '_PREFIX_',
    });

    expect(format(input)).toBe('_PREFIX_1.55678');
  });

  test('suffix option', () => {
    const input = 1.55678;
    const format = formatter({
      suffix: '_SUFFIX_',
    });

    expect(format(input)).toBe('1.55678_SUFFIX_');
  });

  test('plus option for a negative number', () => {
    const input = -1478.55678;
    const format = formatter({
      plus: false,
    });

    expect(format(input)).toBe('-1478.55678');
  });

  test('plus option for a positive number', () => {
    const input = 1478.55678;
    const format = formatter({
      plus: true,
    });

    expect(format(input)).toBe('+1478.55678');
  });

  test('thousands separator option', () => {
    const input = 14784379.55678;
    const format = formatter({
      thousandsSeparator: ' ',
    });

    expect(format(input)).toBe('14 784 379.55678');
  });

  test('decimal point option', () => {
    const input = 1478.55678;
    const format = formatter({
      decimalPoint: ',',
    });

    expect(format(input)).toBe('1478,55678');
  });
});
