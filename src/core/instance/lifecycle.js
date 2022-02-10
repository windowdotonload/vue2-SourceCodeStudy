import { noop } from "../utils/index";
import Watcher from "../observer/watcher";

export let activeInstance = null;

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    const vm = this;
    const prevVnode = vm._vnode;
    console.log("this is vm in _update of lifecycle", vm, vnode);
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
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
    "this is return VNODE in lifeCycle",
    vm._update(vm._render(), hydrating),
    vm
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
