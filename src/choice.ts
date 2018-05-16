import { IChoiceOptions } from './Options';
import IRandomGenerator from './RandomGenerator';

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
  const { size = 1, replace = false } = options;
  let valuesArr;
  if (typeof values === 'number') {
    valuesArr = getArray(values);
  } else {
    valuesArr = values.slice();
  }

  if (replace === false && size > valuesArr.length) {
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
