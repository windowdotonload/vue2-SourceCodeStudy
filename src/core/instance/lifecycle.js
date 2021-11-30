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
import Watcher from "../observer/watcher";
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    console.log("this is _update =>", vnode);
  };
}

export function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  let updateComponent;
  vm._render = function () {
    console.log("this is render in _render ");
    return { vnode: "vnode" };
  };
  updateComponent = () => {
    vm._update(vm._render(), hydrating);
  };
  new Watcher(
    vm,
    updateComponent,
    noop,
    {
      //   before() {
      //     if (vm._isMounted && !vm._isDestroyed) {
      //       callHook(vm, "beforeUpdate");
      //     }
      //   },
    },
    true /* isRenderWatcher */
  );
  return vm;
}
