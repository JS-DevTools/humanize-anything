import { StringifyOptions } from "./options";
import { stringifyValue } from "./stringify-value";

/**
 * Returns a list of values as a comma separated string
 *
 * @example
 * ["one", true, 3, { four: 4 }]    =>    '"one", true, 3, and {four}'
 */
export function stringifyValues(values: unknown[], options: StringifyOptions = {}): string {
  let stringValues = values.map((value) => stringifyValue(value, options));
  return stringifyList(stringValues, options);
}

/**
 * Returns a list of strings as a comma separated string
 *
 * @example
 * ["one", "two", "three", "four"]   =>   "one, two, three, and four"
 */
export function stringifyList(values: string[], options: StringifyOptions = {}): string {
  let lastValue = "", oxfordComma = "";

  if (values.length > 1) {
    let conjunction = options.conjunction || "and";
    lastValue = ` ${conjunction} ${values.pop()!}`;
  }

  if (values.length > 1) {
    oxfordComma = ",";
  }

  return values.join(", ") + oxfordComma + lastValue;
}
