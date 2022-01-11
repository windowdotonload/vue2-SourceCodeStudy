import { initRender } from "./render";
import { initProxy } from "./proxy";
import { mergeOptions } from "../utils/index";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    if (options && options._isComponent) {
    } else {
      vm.$options = mergeOptions(
        options || {},
        resolveConstructorOptions(vm.constructor),
        vm
      );
    }
    initProxy(vm);
    initRender(vm);
    if (vm.$options.el) {
      vm.$mount(this.$options.el);
    }
  };
}

export function resolveConstructorOptions(Ctor) {
  Ctor.otherName = "otherName";
  let options = Ctor.options;
  console.log("this is ctor in options in resolveConstructorOptions", options);
  console.dir(Ctor);
  return options;
}
