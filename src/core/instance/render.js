import { createElement } from "../vdom/create-element";

export function initRender(vm) {
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);
}

export function renderMixin(Vue) {
  Vue.prototype._render = function () {
    const vm = this;
    let vnode;
    const { render } = vm.$options;
    // C("div", [C("h2", "bcd"), C("aaa", "123"), C("bbb", "123")]);
    vnode = render.call(vm._renderProxy, vm.$createElement);
    return vnode;
  };
}
