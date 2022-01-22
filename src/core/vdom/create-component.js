import { isUndef, isObject } from "../utils/index";
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

  console.dir(Ctor);
  console.log("createComponent", Ctor, data, context, children, tag);
}
