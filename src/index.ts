// tslint:disable-next-line
const XSAdd = require('ml-xsadd');
import choice from './choice';
import { IChoiceOptions } from './Options';
import IRandomGenerator from './RandomGenerator';

/**
 * @classdesc Random class
 */
export default class Random {
  private random: IRandomGenerator;
  /**
   * @param [seedOrRandom=Math.random] - Control the random number generator used by the Random class instance. Pass a random number generator function with a uniform distribution over the half-open interval [0, 1[. If seed will pass it to ml-xsadd to create a seeded random number generator. If undefined will use Math.random.
   */
  constructor(seedOrRandom: IRandomGenerator | number = Math.random) {
    if (typeof seedOrRandom === 'number') {
      const xsadd: any = new XSAdd(seedOrRandom);
      this.random = xsadd.random;
    } else {
      this.random = seedOrRandom;
    }
  }

  /**
   * Returns an array of elements choosen from a list
   * @param values  - The values to choose from. If a number, the list will be a range of integer from 0 to that number.
   * @param options - option object
   * @return The choosen values
   */

  public choice<T>(values: T[], options?: IChoiceOptions): T[];
  public choice(values: number, options?: IChoiceOptions): number[];
  public choice<T>(
    values: T[] | number,
    options?: IChoiceOptions
  ): Array<T | number> {
    if (typeof values === 'number') {
      return choice(values, options, this.random);
    }
    return choice(values, options, this.random);
  }
}
