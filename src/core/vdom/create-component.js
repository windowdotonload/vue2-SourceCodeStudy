import { isUndef, isObject } from "../utils/index";
import VNode from "./vnode";
// import { resolveConstructorOptions } from "../instance/init";
const componentVNodeHooks = {
  init() {},
  prepatch() {},
  insert() {},
  destroy() {},
};
const hooksToMerge = Object.keys(componentVNodeHooks);
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
  let asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
  }
  data = data || {};

  // resolveConstructorOptions(Ctor);

  const propsData = "";
  const listeners = data.on;
  installComponentHooks(data);
  const name = Ctor.options.name || tag;
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ""}`,
    data,
    undefined,
    undefined,
    undefined,
    undefined,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  );
  console.log("this is vnode in create-component", vnode);
  return vnode;
}

function installComponentHooks(data) {
  const hooks = data.hook || (data.hook = {});
  for (let i = 0; i < hooksToMerge.length; i++) {}
  console.log("this is hoooooook", data);
}
