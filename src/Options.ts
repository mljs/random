/**
 * The options object for random.choice
 */
export interface ChoiceOptions {
  /**
   * number of element to choose
   * @default 1
   */
  size?: number;
  /**
   * Whether to replace the chosen element in the pool after each draw
   * @default false
   */
  replace?: boolean;
  /**
   * The probabilities associated with each element. Probabilities should sum to 1 and be the same length as the values. If not specified a uniform distribution is assumed.
   * @default undefined
   */
  probabilities?: number[];
}
