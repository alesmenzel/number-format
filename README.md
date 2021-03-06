# Number Format 🍀 [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/alesmenzel/number-format/blob/master/LICENSE) [![npm version](https://badge.fury.io/js/%40alesmenzel%2Fnumber-format.svg)](https://badge.fury.io/js/%40alesmenzel%2Fnumber-format) [![Build Status](https://travis-ci.com/alesmenzel/number-format.svg?branch=master)](https://travis-ci.com/alesmenzel/number-format)

Utility for formatting numbers for Node and Browser that handles floating point number imprecission.

## Instalation

```bash
npm install --save @alesmenzel/number-format
```

## Table of Contents

1. [Usage](#usage)
   1. [Format](#format)
   1. [Create Formatter (chainable)](#Create-Formatter)
   1. [Round](#round)
   1. [Humanize](#humanize)
   1. [Separators](#separators)
   1. [Plus](#plus)
   1. [Percentage](#percentage)
   1. [Prefix](#prefix)
   1. [Suffix](#suffix)
   1. [Custom formatter](#custom-formatter)
1. [Request a feature](#request-a-feature)
1. [License](#license)

## Usage

### Format

Formatter unifies all of the formating functions into a single interface. Formatter accepts configuration object and returns a formatting function.

Parameters:

| Name                         | Type            | Description                                                                                                                                                                                                                         | Default                                    |
| ---------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `options`                    | `Object`        | The configuration object.                                                                                                                                                                                                           | [See below](#default-configuration-object) |
| `options.decimalPoint`       | `String`        | Decimal point. (e.g. `123.56`)                                                                                                                                                                                                      | `'.'` (dot)                                |
| `options.thousandsSeparator` | `String`        | Thousand separators. (e.g. `1 000 000`)                                                                                                                                                                                             | `''` (empty string)                        |
| `options.round`              | `Number\|Falsy` | Precision (e.g. `0.001` for 3 decimal places or `1000` for rounding to thousands, use `1` to round to whole numbers).                                                                                                               | `false`                                    |
| `options.percentage`         | `Boolean`       | Whether to add `_%` (space percentage) suffix and times the number by `100`. (e.g. `0.124` -> `12.4 %`)                                                                                                                             | `false`                                    |
| `options.humanize`           | `Object\|Falsy` | Whether to transform the number into a human readable format. See [humanize](#humanize) for available options. The only difference is that the `transform()` function runs after adding decimal/thousands separators and plus sign. | `false`                                    |
| `options.plus`               | `Boolean`       | Whether to append `+` to numbers greater then zero.                                                                                                                                                                                 | `false`                                    |
| `options.prefix`             | `String`        | Prepends the given prefix.                                                                                                                                                                                                          | `''` (empty string)                        |
| `options.suffix`             | `String`        | Appends the given suffix.                                                                                                                                                                                                           | `''` (empty string)                        |

#### Default configuration object

```js
{
    decimalPoint = '.',
    thousandsSeparator = '',
    round = false,
    percentage = false,
    humanize = false,
    plus = false,
    prefix = '',
    suffix = '',
  }
```

```js
import { format: formatter, SI_SUFFIXES } from '@alesmenzel/number-format';

const input = 12345607.55678;
const format = formatter({
  round: 0.1,
  plus: true,
  humanize: {
    suffixes: SI_SUFFIXES,
  },
});
format(input); // '+12.3MB'
```

### Create Formatter

Formatter is just a different interface for format functoin. Instead of passing a single config object, it allows you to configure the formatter by chaining format methods.

```js
import { createFormatter, SI_SUFFIXES } from '@alesmenzel/number-format';

const input = 12345607.55678;
const formatter = createFormatter({
  round: 0.1,
  plus: true,
  humanize: {
    suffixes: SI_SUFFIXES,
  },
});
// Call `fnc()` to get formatting function
const format = formatter.fnc();

format(input); // '+12.3MB'
```

### Round

Round number to given precision. Handles rounding of integers as well as decimals. Precision is given as base 10 number (e.g. `1e3` = 1000 to round to thousands or `1e-2` = 0.01 to round to 2 decimal places). Handles imprecision caused by JavaScript´s floating point system (e.g. formatting `0.1 + 0.2`).

Parameters:

| Name        | Type     | Description                                                                   | Default |
| ----------- | -------- | ----------------------------------------------------------------------------- | ------- |
| `precision` | `Number` | The precision to round to. Should be a multiple of 10 (e.g. '1000' or '0.01') | -       |

```js
import { round } from '@alesmenzel/number-format';

const format = round(1000);
format(12345.123); // 12000

const format = round(1);
format(12345.123); // 12345

const format = round(0.01);
format(12345.12345); // 12345.12
```

### Humanize

Converts number to a human readable format. Handles numbers up to trilions.

Parameters:

| Name                     | Type                                 | Description                                                                                 | Default                       |
| ------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------- | ----------------------------- |
| `options`                | `Object`                             | Options                                                                                     | See defaulto options below    |
| `options.transform`      | `Function(Number => Number\|String)` | Function to transform the number before appending the sufix (e.g. to be used for rounding). | `indentity(Number => Number)` |
| `options.base`           | `Number`                             | Base for the numbers.                                                                       | `1000`                        |
| `options.suffixes`       | `Object`                             | Suffixes to use after the number.                                                           | `GENERAL_SUFFIXES`            |
| `options.suffixes.big`   | `Array`                              | Enable adding suffixes for big numbers (`x >= 0`). E.g. `12MB`                              | `true`                        |
| `options.suffixes.small` | `Array`                              | Enable adding suffixes for small numbers (`x < 0`). E.g. `12 nanoseconds`                   | `true`                        |

#### Default options

```js
{
    transform = identity,
    suffixes = GENERAL_SUFFIXES,
    base = 1000,
    big = true,
    small = true,
}
```

#### Available suffixes

```js
// Numbers: https://en.wikipedia.org/wiki/Order_of_magnitude
const GENERAL_SUFFIXES = {
  big: ['', 'k', 'M', 'B', 'T' /* ... */],
  small: ['m', 'µ', 'n' /* ... */],
};
const GENERAL_NAME_SUFFIXES = {
  big: ['', 'thousand', 'million', 'billion' /* ... */],
  small: ['thousandth', 'millionth', 'billionth' /* ... */],
};

// Bytes: https://en.wikipedia.org/wiki/Orders_of_magnitude_(data)
const SI_SUFFIXES = {
  big: ['', 'KB', 'MB', 'GB', 'TB' /* ... */],
  small: [],
};
const SI_NAME_SUFFIXES = {
  big: ['byte', 'kilobyte', 'megabyte', 'gigabyte' /* ... */],
  small: [],
};

// Bytes: https://en.wikipedia.org/wiki/Orders_of_magnitude_(data)
const IT_SUFFIXES = {
  big: ['', 'Kb', 'Mb', 'Gb' /* ... */],
  small: [],
};
const IT_NAME_SUFFIXES = {
  big: ['byte', 'kibibyte', 'mebibyte', 'gibibyte' /* ... */],
  small: [],
};

// Time: https://en.wikipedia.org/wiki/Orders_of_magnitude_(time)
const TIME_SUFFIXES = {
  big: ['', 'ks', 'Ms', 'Gs' /* ... */],
  small: ['ms', 'µs', 'ns' /* ... */],
};
const TIME_NAME_SUFFIXES = {
  big: ['', 'kilosecond', 'megasecond', 'gigasecond' /* ... */],
  small: ['millisecond', 'microsecond', 'nanosecond' /* ... */],
};
```

#### Sample usage

```js
import { humanize, round } from '@alesmenzel/number-format';

const format = humanize();

format(123000); // 123k
format(123456789); // 123.456789M
format(-123456789); // -123.456789M
format(100); // 100

const formatAndRound = humanize({
  transform: round(0.01),
});

formatAndRound(123456789); // 123.46M

const formatBytes = humanize({
  transform: round(0.01),
  base: 1024,
  suffixes: {
    // Custom suffixes or you can use any of the predeffined (or combine them)
    big: ['', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    small: [],
  },
  big: true,
  small: false,
});

formatBytes(156949847); // 149.68MB
```

### Separators

Change decimal and thousands separators.

Parameters:

| Name                 | Type     | Description                      | Default             |
| -------------------- | -------- | -------------------------------- | ------------------- |
| `thousandsSeparator` | `String` | Symbol for separating thousands. | `''` (empty string) |
| `decimalSeparator`   | `String` | Symbol for separating decimals.  | `.` (dot)           |

```js
import { changeSeparators } from '@alesmenzel/number-format';

const czechFormat = changeSeparators(' ', '.');
czechFormat(1596849.19); // '1 596 849.19'

const usFormat = changeSeparators(',', '.');
usFormat(1596849.19); // '1,596,849.19'

const norwegianFormat = changeSeparators('.', ',');
norwegianFormat(1596849.19); // '1.596.849,19'
```

### Percentage

Simply times the value by 100.

```js
import { percentage } from '@alesmenzel/number-format';

percentage()(0.12); // 12
percentage()(0); // 0
percentage()(-1.23); // -123
```

### Plus

Simply adds a plus for positive numbers.

```js
import { plus } from '@alesmenzel/number-format';

plus()(123456); // +123456
plus()(0); // 0
plus()(-123456); // -123456
```

### Prefix

Simply adds a prefix.

Parameters:

| Name     | Type     | Description                                                              | Default |
| -------- | -------- | ------------------------------------------------------------------------ | ------- |
| `prefix` | `String` | Prepends a given prefix and returns a string. `Number\|String => String` | -       |

```js
import { prefix } from '@alesmenzel/number-format';

prefix('$')(123456); // $123456
prefix('$')(0); // $0
prefix('$')(-123456); // $-123456
```

### Suffix

Simply adds a suffix.

Parameters:

| Name     | Type     | Description                                                             | Default |
| -------- | -------- | ----------------------------------------------------------------------- | ------- |
| `suffix` | `String` | Appends a given suffix and returns a string. `Number\|String => String` | -       |

```js
import { suffix } from '@alesmenzel/number-format';

suffix('€')(123456); // 123456€
suffix('€')(0); // 0€
suffix('€')(-123456); // -123456€
```

### Compose

You can also compose formatters into a single one with the `compose` function.

Parameters:

| Name           | Type         | Description                                                                                                                                                                  | Default |
| -------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `...functions` | `Function[]` | Array of formatter functions. A formatter function accepts single value (Number or String) and returns a single value (Number or String). `Number\|String => Number\|String` | -       |

```js
import { compose, round, changeSeparators } from '@alesmenzel/number-format';

const czechFormat = compose(round(0.1), changeSeparators(' ', '.'));
czechFormat(1596849.19); // '1 596 849.2'

const usFormat = compose(round(0.1), changeSeparators(',', '.'));
usFormat(1596849.19); // '1,596,849.2'

const norwegianFormat = compose(round(0.1), changeSeparators('.', ','));
norwegianFormat(1596849.19); // '1.596.849,2'
```

### Custom formatter

Any formatter should be of type `Number|String => Number|String`.

```js
import { compose, round, changeSeparators } from '@alesmenzel/number-format';

// Here we define our custom formatter that returns specified number of last digits
const lastDigits = options => {
  const { length } = options;

  return number => {
    return `${number}`.slice(-length);
  };
};

const format = lastDigits({ length: 3 });

format(123456789); // 789

// Use it in composition
const format = compose(round(10), lastDigits({ length: 3 }));

format(123456789); // 790
```

## Request a feature

If you are missing a feature, please [open a new issue](https://github.com/alesmenzel/number-format/issues/new) with the feature request. [PRs](https://github.com/alesmenzel/number-format/compare) are welcome as well.

## License

This project is licensed under the terms of the [MIT license](./LICENSE).
