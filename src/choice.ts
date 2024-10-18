import { ChoiceOptions } from './Options';
import { RandomNumberGenerator } from './RandomNumberGenerator';

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

  let valuesArr: Array<number | T>;
  let cumSum: number[] | undefined;
  if (typeof values === 'number') {
    valuesArr = getArray(values);
  } else {
    valuesArr = values.slice();
  }

  if (probabilities) {
    if (!replace) {
      throw new Error(
        'choice with probabilities and no replacement is not implemented',
      );
    }
    // check input is sane
    if (probabilities.length !== valuesArr.length) {
      throw new Error(
        'the length of probabilities option should be equal to the number of choices',
      );
    }
    cumSum = [probabilities[0]];
    for (let i = 1; i < probabilities.length; i++) {
      cumSum[i] = cumSum[i - 1] + probabilities[i];
    }

    //@ts-expect-error we know length is at least 1
    if (Math.abs(1 - cumSum.at(-1)) > PROB_TOLERANCE) {
      throw new Error(
        `probabilities should sum to 1, but instead sums to ${cumSum.at(-1)}`,
      );
    }
  }

  if (!replace && size > valuesArr.length) {
    throw new Error('size option is too large');
  }
  const result: Array<number | T> = [];
  for (let i = 0; i < size; i++) {
    const index = randomIndex(valuesArr.length, random, cumSum);
    result.push(valuesArr[index]);
    if (!replace) {
      valuesArr.splice(index, 1);
    }
  }
  return result;
}

function getArray(n: number) {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
}

function randomIndex(
  n: number,
  random: RandomNumberGenerator,
  cumSum: number[] | undefined,
) {
  const rand = random();
  if (!cumSum) {
    return Math.floor(rand * n);
  } else {
    let idx = 0;
    while (rand > cumSum[idx]) {
      idx++;
    }
    return idx;
  }
}

export default randomChoice;
