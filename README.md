# Number Format 🍀 [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/alesmenzel/number-format/blob/master/LICENCE)

Utility for formatting numbers for Node and Browser.

## Instalation

```bash
npm install --save @alesmenzel/number-format
```

## Usage

Please check the [tests](./src) or function [documentation](./src) to see usage.

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

## License

This project is licensed under the terms of the [MIT license](./LICENCE).
