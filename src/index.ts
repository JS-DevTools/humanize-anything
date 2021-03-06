import { humanizeClass, humanizeFunction, humanizeType } from "./humanize-type";
import { humanizeValue } from "./humanize-value";
import { humanizeList, humanizeValues } from "./humanize-values";
import { HumanizeOptions } from "./options";

export * from "./options";

/**
 * Convert any value to a short, human-readable string
 */
export interface Humanize {
  /**
   * Convert any value to a short, human-readable string
   */
  (value: unknown, options?: HumanizeOptions): string;

  /**
   * Returns the type name of the given value.
   */
  type(value: unknown): string;

  /**
   * Returns the class name of the given value.
   */
  class(obj: object): string;

  /**
   * Returns the name of the given function.
   */
  function(func: Function): string;
  /**
   * Returns a comma separated list of humanized values.
   *
   * @example
   * ["one", true, 3, { four: 4 }]    =>    '"one", true, 3, and {four}'
   */
  values(values: unknown[], options?: HumanizeOptions): string;

  /**
   * Returns a comma separated list of strings.
   *
   * @example
   * ["one", "two", "three", "four"]   =>   "one, two, three, and four"
   */
  list(values: string[], options?: HumanizeOptions): string;
}

/**
 * Convert any value to a short, human-readable string
 */
export const humanize = humanizeValue as Humanize;
humanize.type = humanizeType;
humanize.class = humanizeClass;
humanize.function = humanizeFunction;
humanize.values = humanizeValues;
humanize.list = humanizeList;

// Export `humanize` as the default export
export default humanize;

// CommonJS default export hack
/* eslint-env commonjs */
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);
}
