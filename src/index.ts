import { XSadd } from 'ml-xsadd';

import { ChoiceOptions } from './Options';
import { RandomNumberGenerator } from './RandomNumberGenerator';
import choice from './choice';

/**
 * @classdesc Random class
 */
export default class Random {
  private randomGenerator: RandomNumberGenerator;
  /**
   * @param [seedOrRandom=Math.random] - Control the random number generator used by the Random class instance. Pass a random number generator function with a uniform distribution over the half-open interval [0, 1[. If seed will pass it to ml-xsadd to create a seeded random number generator. If undefined will use Math.random.
   */
  constructor(seedOrRandom: RandomNumberGenerator | number = Math.random) {
    if (typeof seedOrRandom === 'number') {
      const xsadd = new XSadd(seedOrRandom);
      this.randomGenerator = xsadd.random;
    } else {
      this.randomGenerator = seedOrRandom;
    }
  }

  /**
   * Returns an array of elements choosen from a list
   * @param values  - The values to choose from. If a number, the list will be a range of integer from 0 to that number.
   * @param options - option object
   * @returns The choosen values
   */

  public choice<T>(values: T[], options?: ChoiceOptions): T[];
  public choice(values: number, options?: ChoiceOptions): number[];
  public choice<T>(
    values: T[] | number,
    options?: ChoiceOptions,
  ): Array<T | number> {
    if (typeof values === 'number') {
      return choice(values, options, this.randomGenerator);
    }
    return choice(values, options, this.randomGenerator);
  }

  /**
   * Draw a random number from a uniform distribution on [0,1)
   * @returns The random number
   */
  public random(): number {
    return this.randomGenerator();
  }

  /**
   * Draw a random integer from a uniform distribution on [low, high). If only low is specified, the number is drawn on [0, low)
   * @param low - The lower bound of the uniform distribution interval.
   * @param high - The higher bound of the uniform distribution interval.
   */
  public randInt(low: number, high?: number): number {
    if (high === undefined) {
      high = low;
      low = 0;
    }
    return low + Math.floor(this.randomGenerator() * (high - low));
  }

  /**
   * Draw several random number from a uniform distribution on [0, 1)
   * @param size - The number of number to draw
   * @returns - The list of drawn numbers.
   */
  public randomSample(size: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < size; i++) {
      result.push(this.random());
    }
    return result;
  }
}

export * from './Options';
export * from './RandomNumberGenerator';
