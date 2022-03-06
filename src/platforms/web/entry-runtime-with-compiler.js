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
          // template是一个id
        } else if (template.nodeType) {
          // template是html元素
        } else {
          // 不存在template
          console.warn("template not found");
          return this;
        }
      }
    } else if (el) {
      // 存在el
    }
    if (template) {
      // let render = function (C) {
      //   return C("div", [C("h2", "bcd"), C("aaa", "123")]);
      // };
      const { render, staticRenderFns } = compileToFunctions(
        template,
        {
          outputSourceRange: process.env.NODE_ENV !== "production",
          shouldDecodeNewlines,
          shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments,
        },
        this
      );
      options.render = render;
    }
  }
  mount.call(this, el, hydrating);
};

export default Vue;
