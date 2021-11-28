/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    if (options && options._isComponent) {
    } else {
      this.$options = options;
    }
    if ($options.el) {
      vm.$mount(this.$options.el);
    }
  };
}
