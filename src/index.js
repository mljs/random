import XSAdd from 'ml-xsadd';

import choice from './choice';

/**
 * @classdesc Random class
 */
export default class Random {
  /**
   * @param {function|number} [seedOrRandom=Math.random] - Control the random number generator used by the Random class instance. Pass a random number generator function with a uniform distribution over the half-open interval [0, 1[. If seed will pass it to ml-xsadd to create a seeded random number generator. If undefined will use Math.random.
   */
  constructor(seedOrRandom) {
    if (typeof seedOrRandom === 'number') {
      const xsadd = new XSAdd(seedOrRandom);
      this.random = xsadd.random;
    } else if (seedOrRandom === undefined) {
      this.random = Math.random;
    } else {
      this.random = seedOrRandom;
    }
  }

  /**
   * Returns an array of elements choosen from a list
   * @param {Array|number} values  - The values to choose from. If a number, the list will be a range of integer from 0 to that number.
   * @param {object} [options] - option object
   * @param {number} [options.size=1] - number of elements to select from the list
   * @param {boolean} [options.replace=false] - with or without replacement.
   * @return {Array<number>}
   */
  choice(values, options = {}) {
    options.random = this.random;
    return choice(values, options);
  }
}
