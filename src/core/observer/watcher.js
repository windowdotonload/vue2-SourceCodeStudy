/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */

export default class Watcher {
  constructor(vm, expOrFn, cb, options, isRenderWatcher) {
    console.log("this is Watcher ===>", vm, expOrFn);
    expOrFn();
  }
}
