import type { ChoiceOptions } from './Options.ts';
import type { RandomNumberGenerator } from './RandomNumberGenerator.ts';

const PROB_TOLERANCE = 0.00000001;

function randomChoice<T>(
  values: T[],
  options?: ChoiceOptions,
  random?: RandomNumberGenerator,
): T[];
function randomChoice(
  values: number,
  options?: ChoiceOptions,
  random?: RandomNumberGenerator,
): number[];
function randomChoice<T>(
  values: T[] | number,
  options: ChoiceOptions = {},
  random: RandomNumberGenerator = Math.random,
): Array<T | number> {
  const { size = 1, replace = false, probabilities } = options;

  let valuesArray: Array<number | T>;
  let cumSum: Float64Array | undefined;
  if (typeof values === 'number') {
    valuesArray = getArray(values);
  } else {
    valuesArray = values.slice();
  }

  if (probabilities) {
    if (!replace) {
      throw new Error(
        'choice with probabilities and no replacement is not implemented',
      );
    }
    // check input is sane
    if (probabilities.length !== valuesArray.length) {
      throw new Error(
        'the length of probabilities option should be equal to the number of choices',
      );
    }
    cumSum = new Float64Array(probabilities.length);
    let sum = 0;
    for (let i = 0; i < probabilities.length; i++) {
      sum += probabilities[i] as number;
      cumSum[i] = sum;
    }

    if (Math.abs(1 - sum) > PROB_TOLERANCE) {
      throw new Error(
        `probabilities should sum to 1, but instead sums to ${sum}`,
      );
    }
  }

  if (!replace && size > valuesArray.length) {
    throw new Error('size option is too large');
  }
  const result: Array<number | T> = [];
  for (let i = 0; i < size; i++) {
    const index = randomIndex(valuesArray.length, random, cumSum);
    result.push(valuesArray[index] as number | T);
    if (!replace) {
      valuesArray.splice(index, 1);
    }
  }
  return result;
}

function getArray(n: number) {
  const array: number[] = [];
  for (let i = 0; i < n; i++) {
    array.push(i);
  }
  return array;
}

function randomIndex(
  n: number,
  random: RandomNumberGenerator,
  cumSum: Float64Array | undefined,
) {
  const rand = random();
  if (!cumSum) {
    return Math.floor(rand * n);
  }
  // The probabilities may sum to slightly less than 1 (see PROB_TOLERANCE).
  const lastIndex = cumSum.length - 1;
  let index = 0;
  while (index < lastIndex && rand > (cumSum[index] as number)) {
    index++;
  }
  return index;
}

export default randomChoice;
