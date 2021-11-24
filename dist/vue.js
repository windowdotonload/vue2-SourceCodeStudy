(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */
  // import { initMixin } from "./init";
  // import { stateMixin } from "./state";
  // import { renderMixin } from "./render";
  // import { eventsMixin } from "./events";
  // import { lifecycleMixin } from "./lifecycle";
  // import { warn } from "../util/index";

  function Vue(options) {
    console.log("this is VUE =======>");
    //   if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    //     warn("Vue is a constructor and should be called with the `new` keyword");
    //   }
    //   this._init(options);
  }

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
  const name = [123];

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */
  let a = name;
  console.log(a);
  new Vue();

})));
