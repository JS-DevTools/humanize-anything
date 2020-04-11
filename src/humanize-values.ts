import { humanizeValue } from "./humanize-value";
import { HumanizeOptions } from "./options";

/**
 * Returns a list of values as a comma separated string
 *
 * @example
 * ["one", true, 3, { four: 4 }]    =>    '"one", true, 3, and {four}'
 */
export function humanizeValues(values: unknown[], options: HumanizeOptions = {}): string {
  let stringValues = values.map((value) => humanizeValue(value, options));
  return humanizeList(stringValues, options);
}

/**
 * Returns a list of strings as a comma separated string
 *
 * @example
 * ["one", "two", "three", "four"]   =>   "one, two, three, and four"
 */
export function humanizeList(values: string[], options: HumanizeOptions = {}): string {
  let lastValue = "", oxfordComma = "";
  values = values.slice();

  if (values.length > 1) {
    let conjunction = options.conjunction || "and";
    lastValue = ` ${conjunction} ${values.pop()!}`;
  }

  if (options.maxLength) {
    let length = lastValue.length;
    for (let i = 0; i < values.length; i++) {
      length += values[i].length + 2;

      if (length > options.maxLength + 1) {
        values = values.slice(0, i);
        values.push("...");
        break;
      }
    }
  }

  if (values.length > 1) {
    oxfordComma = ",";
  }

  return values.join(", ") + oxfordComma + lastValue;
}
