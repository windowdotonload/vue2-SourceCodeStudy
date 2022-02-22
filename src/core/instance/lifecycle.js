import { noop } from "../utils/index";
import Watcher from "../observer/watcher";

export let activeInstance = null;

export function setActiveInstance(vm) {
  const prevActiveInstance = activeInstance;
  activeInstance = vm;
  return () => {
    activeInstance = prevActiveInstance;
  };
}

export function initLifecycle(vm) {
  // 应为Sub._init()也会合并options，所以会存在parent属性
  const options = vm.$options;

  let parent = options.parent;
  if (parent && !options.abstract) {
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$children = [];
  console.log("this is paraent in initLifecycle =======", parent);
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    const vm = this;
    const prevVnode = vm._vnode;
    const restoreActiveInstance = setActiveInstance(vm);
    console.log("this is vm in _update of lifecycle", vm, vnode);
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
    }
    restoreActiveInstance();
    console.log("lifecycleMixin after __patch__");
  };
}

export function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  let updateComponent;

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
