(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */
  function initRender(vm) {
    vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);
  }

  function renderMixin(Vue) {
    console.log("this is Vue in Render");
    Vue.prototype._render = function () {
      const vm = this;
      let vnode = "vnode";
      const { render } = vm.$options;
      vnode = render.call(vm._renderProxy, vm.$createElement);
      return vnode;
    };
  }

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */
  let initProxy;
  initProxy = function initProxy(vm) {
    console.log("this is initProxy");
    vm._renderProxy = vm;
  };

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      const vm = this;
      if (options && options._isComponent) ; else {
        this.$options = options;
      }
      initProxy(vm);
      initRender(vm);
      if (vm.$options.el) {
        vm.$mount(this.$options.el);
      }
    };
  }

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */
  // import { stateMixin } from "./state";
  // import { renderMixin } from "./render";
  // import { eventsMixin } from "./events";
  // import { lifecycleMixin } from "./lifecycle";
  // import { warn } from "../util/index";

  function Vue(options) {
    console.log("this is VUE =======>", options);
    this._init(options);
  }

  initMixin(Vue);
  // stateMixin(Vue);
  // eventsMixin(Vue);
  // lifecycleMixin(Vue);
  renderMixin(Vue);

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
  function noop(a, b, c) {}

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */

  class Watcher {
    constructor(vm, expOrFn, cb, options, isRenderWatcher) {
      console.log("this is Watcher ===>", vm, expOrFn);
    }
  }

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */

  function mountComponent(vm, el, hydrating) {
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

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */
  Vue.prototype.$mount = function (el, hydrating) {
    return mountComponent(this, el, hydrating);
  };

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */

  function query(el) {
    if (typeof el === "string") {
      const selected = document.querySelector(el);
      if (!selected) {
        console.warn("Cannot find element: " + el);
        return document.createElement("div");
      }
      return selected;
    } else {
      return el;
    }
  }

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */
  const mount = Vue.prototype.$mount;
  Vue.prototype.$mount = function (el, hydrating) {
    el = query(el);
    const options = this.$options;

    if (!options.render) {
      let template = options.template;
      if (template) {
        if (typeof template === "string") {
          if (template.charAt(0) === "#") ; else if (template.nodeType) ; else {
            console.warn("template not found");
            return this;
          }
        }
      }
      if (template) {
        let render = function () {
          console.log("this is render in template");
        };
        options.render = render;
      }
    }
    mount.call(this, el, hydrating);
  };

  return Vue;

})));
