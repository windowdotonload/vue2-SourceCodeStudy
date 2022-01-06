/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
import VNode from "./vnode";
import config from "../config";
import { isPrimitive, isTrue, isDef } from "../utils/index";
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
    let Ctor;
    // 判断是否为保留标签
    if (config.isReservedTag(tag)) {
      console.warn(
        `The .native modifier for v-on is only valid on components but it was used .`
      );
    } else if (
      !data &&
      isDef((Ctor = resolveAsset(context.$options, "components", tag)))
    ) {
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  }

  return vnode;
}
