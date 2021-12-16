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
/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */

import { noop } from "../utils/index";
import Watcher from "../observer/watcher";
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    const vm = this;
    const prevVnode = vm._vnode;

    console.log("lifecycleMixin before __patch__");
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    }
    console.log("lifecycleMixin after __patch__");
  };
}

export function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  let updateComponent;

  updateComponent = () => {
    vm._update(vm._render(), hydrating);
  };

  console.log(
    "********this is vm._UPDATE return VNODE*************",
    vm._update(vm._render(), hydrating)
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
