import { mergeOptions } from "../util/index";
export function initExtend(Vue) {
  extendOptions = extendOptions || {};
  Vue.extend = function (extendOptions) {
    const Super = this;
    // const SuperId = Super.cid;
    // const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    // if (cachedCtors[SuperId]) {
    //   return cachedCtors[SuperId];
    // }
    const Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;

    Sub.options = mergeOptions(Super.options, extendOptions);
    return Sub;
  };
}
