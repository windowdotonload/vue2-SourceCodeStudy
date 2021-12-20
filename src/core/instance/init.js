/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
import { initRender } from "./render";
import { initProxy } from "./proxy";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    if (options && options._isComponent) {
    } else {
      this.$options = options;
    }
    initProxy(vm);
    initRender(vm);
    if (vm.$options.el) {
      vm.$mount(this.$options.el);
    }
  };
}
