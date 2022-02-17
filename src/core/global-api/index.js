import { initExtend } from "./extend";

export function initGlobalAPI(Vue) {
  console.log(" this is in initGlobalApi ");
  Vue.options = Object.create(null);
  Vue.options._base = Vue;

  // 初始化Vue.extend，继承
  initExtend(Vue);
}
