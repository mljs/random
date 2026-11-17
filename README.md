# ml-random

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Randomness utilities from a selection of elements.

## Installation

`$ npm install ml-random`

This package is ESM-only. CommonJS consumers need Node.js ≥ 22.12 (or any 24.x or later) to `require()` it, or can migrate to `import`.

## Usage

```js
import { Random } from 'ml-random';

// Pass a seed for reproducible draws, a custom generator function, or nothing to use Math.random.
const random = new Random(42);

random.choice(['a', 'b', 'c', 'd'], { size: 2 }); // ['c', 'd']
random.choice(5, { size: 3 }); // [0, 1, 2], drawn from 0 to 4
random.choice(['heads', 'tails'], {
  size: 4,
  replace: true,
  probabilities: [0.8, 0.2],
}); // ['heads', 'tails', 'tails', 'heads']
random.random(); // 0.09697818756103516, uniform on [0, 1)
random.randInt(10); // 7, integer on [0, 10)
random.randInt(5, 10); // 8, integer on [5, 10)
random.randomSample(3); // [0.5125349164009094, 0.30097395181655884, 0.8842552900314331]
```

### `new Random(seedOrRandom?)`

- a number: seeds an [ml-xsadd](https://github.com/mljs/xsadd) generator.
- a function returning numbers uniformly distributed on [0, 1).
- nothing: uses `Math.random`.

### `random.choice(values, options?)`

Picks elements from `values`, an array or a number `n` (meaning the integers from 0 to `n - 1`).

| Option          | Default | Description                                                                                               |
| --------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `size`          | `1`     | Number of elements to pick.                                                                               |
| `replace`       | `false` | Put each picked element back in the pool before the next draw.                                            |
| `probabilities` | uniform | Probability of each element; must have the same length as the values and sum to 1. Needs `replace: true`. |

### Other methods

- `random.random()`: a number on [0, 1).
- `random.randInt(low, high?)`: an integer on [`low`, `high`), or on [0, `low`) when `high` is omitted.
- `random.randomSample(size)`: an array of `size` numbers on [0, 1).

## [API Documentation](https://mljs.github.io/random/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-random.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/ml-random
[ci-image]: https://github.com/mljs/random/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/mljs/random/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/mljs/random.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/mljs/random
[download-image]: https://img.shields.io/npm/dm/ml-random.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/ml-random
