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
  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      const vm = this;
      if (options && options._isComponent) ; else {
        this.$options = options;
      }
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
  Vue.prototype.$mount = function (el, hydrating) {
    el = query(el);
    const options = this.$options;
    console.log("this is options ==>", options);
    console.log("this is $mount", el);

    if (!options.render) {
      let template = options.template;
      if (template) {
        let render = function () {
          console.log("this is render in template");
        };
        options.render = render;
      }
      console.log("this is $options ===>", this.$options);
    }
  };

  return Vue;

})));
