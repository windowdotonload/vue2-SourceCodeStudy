import { mergeOptions } from "../utils/index";
export function initExtend(Vue) {
  Vue.cid = 0;
  let cid = 1;
  Vue.extend = function (extendOptions) {
    console.log("this is extendOptions ==========>", extendOptions);
    extendOptions = extendOptions || {};
    const Super = this;
    const SuperId = Super.cid;
    // const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    // if (cachedCtors[SuperId]) {
    //   return cachedCtors[SuperId];
    // }
    const Sub = function VueComponent(options) {
      // 这里可以_init是因为Sub.prototype = Object.create(Super.prototype);
      // _init挂在在Vue.prototype上 Vue.extend本质上就是继承
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    console.log("this is Sub cid", Sub.cid);
    Sub.options = mergeOptions(Super.options, extendOptions);
    console.log("this is SubOptions in extend ============>", Sub.options);
    return Sub;
  };
}
