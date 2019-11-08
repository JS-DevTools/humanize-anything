/**
 * Returns the type name of the given value.
 */
export function stringifyType(value: unknown): string {
  let type = typeof value;

  if (value === null) {
    return "null";
  }
  else if (type === "number" && Number.isNaN(value as number)) {
    return "NaN";
  }
  else if (type === "object") {
    return stringifyClass(value as object);
  }

  return type;
}

/**
 * Returns the class name of the given value.
 */
export function stringifyClass(obj: object): string {
  let name = Object.prototype.toString.call(obj).slice(8, -1);

  if ((name === "Object" || name === "Error") && obj.constructor) {
    return stringifyFunction(obj.constructor);
  }

  return name;
}

/**
 * Returns the name of the given function.
 */
export function stringifyFunction(func: Function): string {  // tslint:disable-line: ban-types
  if (func.name) {
    return func.name;
  }

  let match = /^\s*function\s*([^\(]*)/im.exec(func.toString());
  return match ? match[1] : "";
}
