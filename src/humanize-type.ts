/**
 * Returns the type name of the given value.
 */
export function humanizeType(value: unknown): string {
  let type = typeof value;

  if (value === null) {
    return "null";
  }
  else if (type === "number" && Number.isNaN(value as number)) {
    return "NaN";
  }
  else if (type === "object") {
    return humanizeClass(value as object);
  }

  return type;
}

/**
 * Returns the class name of the given value.
 */
export function humanizeClass(obj: object): string {
  let name = Object.prototype.toString.call(obj).slice(8, -1);

  if ((name === "Object" || name === "Error") && obj.constructor) {
    return humanizeFunction(obj.constructor);
  }

  return name;
}

/**
 * Returns the name of the given function.
 */
export function humanizeFunction(func: Function): string {
  if (func.name) {
    return func.name;
  }

  let match = /^\s*function\s*([^\(]*)/im.exec(func.toString());
  return match ? match[1] : "";
}
