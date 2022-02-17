import { initRender } from "./render";
import { initProxy } from "./proxy";
import { mergeOptions } from "../utils/index";
import { initLifecycle } from "./lifecycle";

export function initMixin(Vue) {
  // 在此处的Vue.option为undefined
  // 通过_init合并之后才会有options，因为Vue.options是在instance/index的下一个文件core/index中才加上的options
  // 所以会在最后执行实例new Vue时候通过实例vm.constructor拿到Vue构造函数才能合并options，因为options相当于Vue的一个静态属性
  console.log("this is Vue before mergeoptions", Vue.options);
  Vue.prototype._init = function (options) {
    // _init为入口函数
    // 无论是组件还是子组件都会调用_init ,_init会多次调用，不同的时机会命中不同的判断
    const vm = this;
    if (options && options._isComponent) {
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        options || {},
        resolveConstructorOptions(vm.constructor),
        vm
      );
    }

    console.log("this is vm after merge options ====>", vm);
    initProxy(vm);

    initLifecycle(vm);
    initRender(vm);
    if (vm.$options.el) {
      vm.$mount(this.$options.el);
    }
  };
}

export function initInternalComponent(vm, options) {
  const opts = (vm.$options = Object.create(vm.constructor.options));
  const parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  const vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

export function resolveConstructorOptions(Ctor) {
  let options = Ctor.options;
  console.log("this is ctor in resolveConstructorOptions", options);
  console.dir(Ctor);
  return options;
}
