/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
import { initMixin } from "./init";
// import { stateMixin } from "./state";
// import { renderMixin } from "./render";
// import { eventsMixin } from "./events";
// import { lifecycleMixin } from "./lifecycle";
// import { warn } from "../util/index";

function Vue(options) {
  console.log("this is VUE =======>", options);
  this._init(options);
  const vm = this;
  if (options && options._isComponent) {
  } else {
    this.$options = options;
  }
  //   if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
  //     warn("Vue is a constructor and should be called with the `new` keyword");
  //   }
  //   this._init(options);
}

initMixin(Vue);
// stateMixin(Vue);
// eventsMixin(Vue);
// lifecycleMixin(Vue);
// renderMixin(Vue);

export default Vue;
