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
    let vnode = "vnode";
    return vnode;
  };
}
