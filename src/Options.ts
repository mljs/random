/**
 * The options object for random.choice
 */
export interface IChoiceOptions {
  /**
   * number of element to choose
   */
  size?: number;
  /**
   * Weather to replace the chosen element in the pool after each draw
   */
  replace?: boolean;
}
