/**
 * Humanize Anything formatting options.
 */
export interface HumanizeOptions {
  /**
   * The maximum length of a stringified value before its type is used instead.
   *
   * Defaults to `25`.
   */
  maxLength?: number;

  /**
   * Indicates whether the value string should be capitalized if applicable
   * (e.g. "Number" instead of "number").
   *
   * Defaults to `false`.
   */
  capitalize?: boolean;

  /**
   * Indicates whether the value string should be prefixed with an article if applicable
   * (e.g. "an object" instead of "object").
   *
   * Defaults to `false`.
   */
  article?: boolean;

  /**
   * The string used to join a list of values when calling `valuesToString()`.
   * This is usually either "and" or "or".
   *
   * Defautls to "and".
   */
  conjunction?: string;
}
