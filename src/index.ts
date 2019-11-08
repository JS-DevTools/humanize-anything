import { StringifyOptions } from "./options";
import { stringifyClass, stringifyFunction, stringifyType } from "./stringify-type";
import { stringifyValue } from "./stringify-value";
import { stringifyList, stringifyValues } from "./stringify-values";

export * from "./options";

/**
 * Converts values to user-friendly strings for error messages and logs
 */
export interface Stringify {
  /**
   * Returns a short, user-friendly string that represents the given value.
   */
  (value: unknown, options?: StringifyOptions): string;

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
  function(func: Function): string;  // tslint:disable-line: ban-types

  /**
   * Returns a comma separated list of stringified values.
   *
   * @example
   * ["one", true, 3, { four: 4 }]    =>    '"one", true, 3, and {four}'
   */
  values(values: unknown[], options?: StringifyOptions): string;

  /**
   * Returns a comma separated list of strings.
   *
   * @example
   * ["one", "two", "three", "four"]   =>   "one, two, three, and four"
   */
  list(values: string[], options?: StringifyOptions): string;
}

/**
 * Converts values to user-friendly strings for error messages and logs
 */
export const stringify = stringifyValue as Stringify;
stringify.type = stringifyType;
stringify.class = stringifyClass;
stringify.function = stringifyFunction;
stringify.values = stringifyValues;
stringify.list = stringifyList;

// Export `stringify` as the default export
// tslint:disable: no-default-export
export default stringify;

// CommonJS default export hack
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);  // tslint:disable-line: no-unsafe-any
}
