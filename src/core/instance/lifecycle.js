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

import { noop } from "../utils/index";
import Watcher from "../observer/watcher";
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    console.log("this is _update =>", vnode);
  };
}

export function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  let updateComponent;

  updateComponent = () => {
    vm._update(vm._render(), hydrating);
  };
  console.log(
    "********this is vm._render return VNODE*************",
    vm._render()
  );
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
