/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
let initProxy;
initProxy = function initProxy(vm) {
  console.log("this is initProxy");
  vm._renderProxy = vm;
};

export { initProxy };
