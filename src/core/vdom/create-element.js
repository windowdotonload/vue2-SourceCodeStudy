/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
import VNode from "./vnode";
import config from "../config";
import { isPrimitive, isTrue, isDef, resolveAsset } from "../utils/index";
import { normalizeChildren, simpleNormalizeChildren } from "./helpers/index";
import { createComponent } from "./create-component";

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
      console.log("1");
      vnode = new VNode(
        config.parsePlatformTagName(tag),
        data,
        children,
        undefined,
        undefined,
        context
      );
    } else if (
      !data &&
      isDef((Ctor = resolveAsset(context.$options, "components", tag)))
    ) {
      console.log("this is Ctor", Ctor);
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  }

  return vnode;
}
