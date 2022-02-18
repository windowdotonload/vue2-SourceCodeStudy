import { initMixin } from "./init";
import { renderMixin } from "./render";
// import { stateMixin } from "./state";
// import { renderMixin } from "./render";
// import { eventsMixin } from "./events";
import { lifecycleMixin } from "./lifecycle";
// import { warn } from "../util/index";

function Vue(options) {
  console.log("THIS IS VUE IN NEW VUE =======> ", options);
  this._init(options);
}
initMixin(Vue);
// stateMixin(Vue);
// eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

export default Vue;
