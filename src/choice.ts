import IRandomGenerator from './RandomGenerator';
import { IChoiceOptions } from './Options';

function randomChoice<T>(
  values: T[],
  options?: IChoiceOptions,
  random?: IRandomGenerator
): T[];
function randomChoice<T>(
  values: number,
  options?: IChoiceOptions,
  random?: IRandomGenerator
): number[];
function randomChoice<T>(
  values: T[] | number,
  options: IChoiceOptions = {},
  random: IRandomGenerator = Math.random
): Array<T | number> {
  let { size = 1, replace = false } = options;
  let valuesArr;
  if (typeof values === 'number') {
    valuesArr = getArray(values);
  } else {
    valuesArr = values.slice();
  }
  options = Object.assign(
    {},
    {
      size: 1,
      replace: false,
      random: Math.random
    },
    options
  );

  if (options.replace === false && size > valuesArr.length) {
    throw new Error('size option is too large');
  }
  const result = [];
  for (let i = 0; i < size; i++) {
    const index = randomIndex(valuesArr.length, random);
    result.push(valuesArr[index]);
    if (!replace) {
      valuesArr.splice(index, 1);
    }
  }
  return result;
}

function getArray(n: number) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
}

function randomIndex(n: number, random: IRandomGenerator) {
  return Math.floor(random() * n);
}

export default randomChoice;
