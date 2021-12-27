/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */

export function query(el) {
  if (typeof el === "string") {
    const selected = document.querySelector(el);
    if (!selected) {
      console.warn("Cannot find element: " + el);
      return document.createElement("div");
    }
    return selected;
  } else {
    return el;
  }
}

export function isPrimitive(value) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
}
