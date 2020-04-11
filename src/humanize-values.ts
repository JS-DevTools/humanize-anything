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
  if (values.length === 0) {
    return "";
  }

  if (values.length === 1) {
    return values[0];
  }

  values = values.slice();
  let firstValue = String(values.shift()!);
  let lastValue = String(values.pop()!);
  let maxLength = options.maxLength;
  let conjunction = options.conjunction;

  if (maxLength) {
    let length = firstValue.length + lastValue.length + 2;

    for (let i = 0; i < values.length; i++) {
      length += values[i].length + 2;

      if (length >= maxLength) {
        // The list is too long, so remove some middle items
        values = [firstValue].concat(values.slice(0, i), "...", lastValue);
        return values.join(", ");
      }
    }
  }

  if (conjunction !== false) {
    lastValue = `${conjunction || "and"} ${lastValue}`;
  }

  let oxfordComma = (values.length > 0 || conjunction === false) ? "," : "";

  return [firstValue].concat(values).join(", ") + oxfordComma + " " + lastValue;
}
