/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
export function renderMixin(Vue) {
  console.log("this is Vue in Render");
  Vue.prototype._render = function () {
    const vm = this;
    let vnode = "vnode";
    const { render } = vm.$options;
    vnode = render.call(vm._renderProxy, vm.$createElement);
    return vnode;
  };
}
