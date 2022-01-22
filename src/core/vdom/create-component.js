import { isUndef, isObject } from "../utils/index";
import VNode from "./vnode";
// import { resolveConstructorOptions } from "../instance/init";

export function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  const baseCtor = context.$options._base;

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }
  if (typeof Ctor !== "function") {
    return;
  }
  data = data || {};
  // resolveConstructorOptions(Ctor);
  installComponentHooks(data);
  const name = Ctor.options.name || tag;
  const vnode = new VNode(undefined, undefined, undefined, "createComponent");
  console.dir(Ctor);
  console.log("createComponent", Ctor, data, context, children, tag);
  return vnode;
}

function installComponentHooks(data) {
  console.log("this is hoooooook", data);
}
