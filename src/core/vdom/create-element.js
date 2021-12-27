/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
import VNode from "./vnode";
import { isPrimitive } from "../utils/index";

const SIMPLE_NORMALIZE = 1;
const ALWAYS_NORMALIZE = 2;
export function createElement(
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  return _createElement(context, tag, data, children, normalizationType);
}

export function _createElement(
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (normalizationType === ALWAYS_NORMALIZE) {
    // children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    // children = simpleNormalizeChildren(children);
  }
  let vnode, ns;
  if (typeof tag === "string") {
    // TODO

    vnode = new VNode(tag, data, children, undefined, undefined, context);
  }

  return vnode;
}
