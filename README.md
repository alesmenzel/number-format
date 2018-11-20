# Number Format 🍀 [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/alesmenzel/number-format/blob/master/LICENCE)

Utility for formatting numbers for Node and Browser that handles floating point number imprecission.

## Instalation

```bash
npm install --save @alesmenzel/number-format
```

## Table of Contents

1. [Usage](#usage)
   1. [Round](#round)
   2. [Humanize](#humanize)
   3. [Compose](#compose)
   4. [Separators](#separators)
   5. [Custom formatter](#custom-formatter)
2. [Request a feature](#request-a-feature)
3. [Licence](#licence)

## Usage

Please check the [tests](./src) or function [documentation](./src) to see usage.

### Round

Round number to given precision. Handles rounding of integers as well as decimals. Precision is given as base 10 number (e.g. `1e3` = 1000 to round to thousands or `1e-2` = 0.01 to round to 2 decimal places). Handles imprecision caused by JavaScript´s floating point system (e.g. formatting `0.1 + 0.2`).

Parameters:

| Name        | Type     | Description                | Default |
| ----------- | -------- | -------------------------- | ------- |
| `precision` | `Number` | The precision to round to. | -       |

```js
import { round } from '@alesmenzel/number-format';

const format = round(1000);
format(12345.123); // 12000

const format = round(1);
format(12345.123); // 12345

const format = round(0.001);
format(12345.123); // 12345.12
```

### Humanize

Converts number to a human readable format. Handles numbers up to trilions.

Parameters:

| Name        | Type                         | Description                                                                                 | Default |
| ----------- | ---------------------------- | ------------------------------------------------------------------------------------------- | ------- |
| `transform` | `Function(String => String)` | Function to transform the number before appending the sufix (e.g. to be used for rounding). | -       |

```js
import { humanize, round } from '@alesmenzel/number-format';

const format = humanize();

format(123000); // 123K
format(123456789); // 123.456789M
format(-123456789); // -123.456789M
format(100); // 100

const formatAndRound = humanize(round(0.01));

formatAndRound(123456789); // 123.45M
```

### Compose

You can also compose formatters into a single one with the `compose` function.

Parameters:

| Name           | Type         | Description                                                                                                                                                                | Default |
| -------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `...functions` | `Function[]` | Array of formatter functions. A formatter function accepts single value (Number or String) and returns a single value (Number or String). `Number|String => Number|String` | -       |

```js
import { compose, round, changeSeparators } from '@alesmenzel/number-format';

const czechFormat = compose(
  round(0.1),
  changeSeparators(' ', '.')
);
czechFormat(1596849.19); // '1 596 849.2'

const usFormat = compose(
  round(0.1),
  changeSeparators(',', '.')
);
usFormat(1596849.19); // '1,596,849.2'

const norwegianFormat = compose(
  round(0.1),
  changeSeparators('.', ',')
);
norwegianFormat(1596849.19); // '1.596.849,2'
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

### Custom formatter

Any formatter should be of type `Number|String => Number|String`.

```js
import { compose, round, changeSeparators } from '@alesmenzel/number-format';

// Here we define our custom formatter that returns specified number of last digits
const lastDigits = (options) => {
  const { length } = options;

  return (number) => {
    return `${number}`.slice(-options.length);
  };
}

const format = lastDigits({ length: 3 });

format(123456789); // 789

// Use it in composition
const format = compose(round(10), lastDigits({ length: 3 }));

format(123456789); // 790
```

## Request a feature

If you are missing a feature, please [open a new issue](https://github.com/alesmenzel/number-format/issues/new) with the feature request. [PRs](https://github.com/alesmenzel/number-format/compare) are welcome as well.

## License

This project is licensed under the terms of the [MIT license](./LICENCE).
