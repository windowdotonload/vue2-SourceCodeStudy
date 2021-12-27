import VNode, { createTextVNode } from "../vnode";
import { isPrimitive } from "../../../shared/util";

export function simpleNormalizeChildren(children) {
  for (let i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}

export function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : undefined;
}
