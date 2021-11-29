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
import Vue from "./runtime/index";
import { query } from "./utils/index";
Vue.prototype.$mount = function (el, hydrating) {
  el = query(el);
  console.log("this is $mount", el);

  const options = this.$options;
  if (!options.render) {
    let template = options.template;
    if (template) {
    }
  }
};

export default Vue;
