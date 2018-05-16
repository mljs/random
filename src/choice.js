export default function randomChoice(values, options = {}) {
  if (typeof values === 'number') {
    values = getArray(values);
  } else {
    values = values.slice();
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

  if (options.replace === false && options.size > values.length) {
    throw new Error('size option is too large');
  }
  const result = [];
  for (let i = 0; i < options.size; i++) {
    const index = randomIndex(values.length, options.random);
    result.push(values[index]);
    if (!options.replace) {
      values.splice(index, 1);
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
