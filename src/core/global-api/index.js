export function initGlobalAPI(Vue) {
  console.log(" this is in initGlobalApi ");
  Vue.options = Object.create(null);
  Vue.options._base = Vue;
}
