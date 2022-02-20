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
// 如果children是一个原始值，创建一个textnode的vnode
export function normalizeChildren(children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
    ? normalizeArrayChildren(children)
    : undefined;
}

function normalizeArrayChildren(children) {
  console.log("this is children in normalizeArrayChildren", children);
  const res = [];
  let i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === "boolean") continue;
    if (Array.isArray(c)) {
      if (c.length > 0) {
      }
    } else if (isPrimitive(c)) {
    } else {
      res.push(c);
    }
  }
  return res;
}
