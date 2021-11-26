(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */
  function initMixin(Vue) {
    Vue.prototype._init = function (options) {};
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
    if (options && options._isComponent) ; else {
      this.$options = options;
    }
    //   if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    //     warn("Vue is a constructor and should be called with the `new` keyword");
    //   }
    //   this._init(options);
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

  new Vue();

})));
