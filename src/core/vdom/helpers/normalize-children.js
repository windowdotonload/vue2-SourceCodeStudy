import VNode, { createTextVNode } from "../vnode";
import { isPrimitive, isUndef } from "../../../shared/util";

export function simpleNormalizeChildren(children) {
  for (let i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}

export function normalizeChildren(children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
    ? normalizeArrayChildren(children)
    : undefined;
}

function normalizeArrayChildren(children) {
  console.log("this is children in normalizeArrayChildren", children);
  let i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === "boolean") continue;
    console.log("ok==========>");
  }
}
