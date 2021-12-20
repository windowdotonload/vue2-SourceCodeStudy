/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
import { createElement } from "../vdom/create-element";

export function initRender(vm) {
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);
}

export function renderMixin(Vue) {
  Vue.prototype._render = function () {
    const vm = this;
    let vnode = "vnode";
    const { render } = vm.$options;
    vnode = render.call(vm._renderProxy, vm.$createElement);
    return vnode;
  };
}
