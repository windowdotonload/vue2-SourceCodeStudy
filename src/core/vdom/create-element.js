/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
import VNode from "./vnode";
import { isPrimitive, isTrue } from "../utils/index";
import { normalizeChildren, simpleNormalizeChildren } from "./helpers/index";
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
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
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
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  let vnode, ns;
  if (typeof tag === "string") {
    // 判断是否为保留标签
    if (false) {
    } else {
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  }

  return vnode;
}
