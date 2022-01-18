import { initRender } from "./render";
import { initProxy } from "./proxy";
import { mergeOptions } from "../utils/index";

export function initMixin(Vue) {
  console.log("this is Vue before mergeoptions", Vue.options);
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

    console.log("this is vm after merge options ====>", vm);
    initProxy(vm);
    initRender(vm);
    if (vm.$options.el) {
      vm.$mount(this.$options.el);
    }
  };
}

export function resolveConstructorOptions(Ctor) {
  let options = Ctor.options;
  console.log("this is ctor in resolveConstructorOptions", options);
  console.dir(Ctor);
  return options;
}
