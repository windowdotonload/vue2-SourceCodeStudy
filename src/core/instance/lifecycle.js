/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {};
}

export function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  let updateComponent;
  updateComponent = () => {
    vm._update(vm._render(), hydrating);
  };
}
