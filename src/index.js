/**
 * Returns an array of elements selected
 * @return {Array<number>}
 */
export default function randomChoice(elements, options = {}) {
  if (typeof elements === 'number') {
    elements = getArray(elements);
  } else {
    elements = elements.slice();
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

  if (options.replace === false && options.size > elements.length) {
    throw new Error('size option is too large');
  }
  const result = [];
  for (let i = 0; i < options.size; i++) {
    const index = randomIndex(elements.length, options.random);
    result.push(elements[index]);
    if (!options.replace) {
      elements.splice(index, 1);
    }
  }
  return result;
}

function getArray(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
}

function randomIndex(n, random) {
  return Math.floor(random() * n);
}
