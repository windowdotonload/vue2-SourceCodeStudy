import Vue from "./runtime/index";
import { query } from "./utils/index";
const mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (el, hydrating) {
  el = query(el);
  const options = this.$options;
  console.log("this is  options ============>", options);
  if (options._componentTag) {
    const render = function (c) {
      return c("div", "aaa");
    };
    options.render = render;
  }
  if (!options.render) {
    let template = options.template;
    if (template) {
      if (typeof template === "string") {
        if (template.charAt(0) === "#") {
        } else if (template.nodeType) {
        } else {
          console.warn("template not found");
          return this;
        }
      }
    } else if (el) {
    }
    if (template) {
      // TODO
      let render = function (C) {
        return C("div", [C("h2", "bcd"), C("aaa", "123")]);
      };
      options.render = render;
    }
  }
  mount.call(this, el, hydrating);
};

export default Vue;
