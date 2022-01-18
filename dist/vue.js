(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */
  function createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val));
  }
  class VNode {
    constructor(
      tag,
      data,
      children,
      text,
      elm,
      context,
      componentOptions,
      asyncFactory
    ) {
      this.tag = tag;
      this.data = data;
      this.children = children;
      this.text = text;
      this.elm = elm;
      this.ns = undefined;
      this.context = context;
    }
  }

  function noop(a, b, c) {}

  const no = (a, b, c) => false;

  const identity = (_) => _;

  function isUndef(v) {
    return v === undefined || v === null;
  }

  function isDef(v) {
    return v !== undefined && v !== null;
  }

  function isTrue(v) {
    return v === true;
  }

  function isPrimitive(value) {
    return (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "symbol" ||
      typeof value === "boolean"
    );
  }

  const hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }

  var config = {
    isReservedTag: no,
    parsePlatformTagName: identity,
    optionMergeStrategies: Object.create(null),
  };

  const strats = config.optionMergeStrategies;

  const defaultStrat = function (parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal;
  };

  function mergeOptions(parent, child, vm) {
    const options = {};
    let key;
    for (key in parent) {
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField(key) {
      const strat = strats[key] || defaultStrat;
      options[key] = strat(parent[key], child[key], vm, key);
    }
    return options;
  }

  function resolveAsset(options, type, id, warnMissing) {
    if (typeof id !== "string") {
      return;
    }
    const assets = options[type];
    if (hasOwn(assets, id)) return assets[id];
  }

  function simpleNormalizeChildren(children) {
    for (let i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        return Array.prototype.concat.apply([], children);
      }
    }
    return children;
  }

  function normalizeChildren(children) {
    return isPrimitive(children)
      ? [createTextVNode(children)]
      : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined;
  }

  function normalizeArrayChildren(children) {
    console.log("this is children in normalizeArrayChildren", children);
    const res = [];
    let i, c;
    for (i = 0; i < children.length; i++) {
      c = children[i];
      if (isUndef(c) || typeof c === "boolean") continue;
      if (Array.isArray(c)) {
        if (c.length > 0) ;
      } else if (isPrimitive(c)) ; else {
        res.push(c);
      }
    }
    return res;
  }

  function createComponent(Ctor, data, context, children, tag) {
    console.log("createComponent", Ctor, data, context, children, tag);
  }

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */

  const SIMPLE_NORMALIZE = 1;
  const ALWAYS_NORMALIZE = 2;
  function createElement(
    context,
    tag,
    data,
    children,
    normalizationType,
    alwaysNormalize
  ) {
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = undefined;
    }
    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType);
  }

  function _createElement(
    context,
    tag,
    data,
    children,
    normalizationType
  ) {
    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }
    let vnode;
    if (typeof tag === "string") {
      let Ctor;
      // 判断是否为保留标签
      if (config.isReservedTag(tag)) {
        vnode = new VNode(
          config.parsePlatformTagName(tag),
          data,
          children,
          undefined,
          undefined,
          context
        );
      } else if (
        !data &&
        isDef((Ctor = resolveAsset(context.$options, "components", tag)))
      ) {
        console.log("this is Ctor", Ctor);
        vnode = createComponent(Ctor, data, context, children, tag);
      } else {
        vnode = new VNode(tag, data, children, undefined, undefined, context);
      }
    }

    return vnode;
  }

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */

  function initRender(vm) {
    vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);
  }

  function renderMixin(Vue) {
    Vue.prototype._render = function () {
      const vm = this;
      let vnode;
      const { render } = vm.$options;
      vnode = render.call(vm._renderProxy, vm.$createElement);
      return vnode;
    };
  }

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

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      const vm = this;
      if (options && options._isComponent) ; else {
        vm.$options = mergeOptions(
          options || {},
          resolveConstructorOptions(vm.constructor),
          vm
        );
      }
      console.log("this is vm after merge options ======================>", vm);
      initProxy(vm);
      initRender(vm);
      if (vm.$options.el) {
        vm.$mount(this.$options.el);
      }
    };
  }

  function resolveConstructorOptions(Ctor) {
    let options = Ctor.options;
    console.log("this is ctor in resolveConstructorOptions", options);
    console.dir(Ctor);
    return options;
  }

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */

  class Watcher {
    constructor(vm, expOrFn, cb, options, isRenderWatcher) {
      console.log("this is Watcher ===>", vm, expOrFn);
    }
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
      const vm = this;
      const prevVnode = vm._vnode;
      console.log("this is vm in _update of lifecycle", vm, vnode);
      if (!prevVnode) {
        // initial render
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
      }
      console.log("lifecycleMixin after __patch__");
    };
  }

  function mountComponent(vm, el, hydrating) {
    vm.$el = el;
    let updateComponent;

    updateComponent = () => {
      vm._update(vm._render(), hydrating);
    };

    console.log(
      "this is return VNODE in lifeCycle",
      vm._update(vm._render(), hydrating),
      vm
    );

    new Watcher(
      vm,
      updateComponent,
      noop,
      {
        //   before() {
        //     if (vm._isMounted && !vm._isDestroyed) {
        //       callHook(vm, "beforeUpdate");
        //     }
        //   },
      },
      true /* isRenderWatcher */
    );
    return vm;
  }

  // import { warn } from "../util/index";

  function Vue(options) {
    console.log("this is VUE =======>", options);
    this._init(options);
  }

  initMixin(Vue);
  // stateMixin(Vue);
  // eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);

  function initGlobalAPI(Vue) {
    console.log(" this is in initGlobalApi ");
    Vue.options = Object.create(null);
    Vue.options._base = Vue;
  }

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */

  initGlobalAPI(Vue);

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */
  function createElement$1(tagName, vnode) {
    const elm = document.createElement(tagName);
    return elm;
  }

  function createTextNode(text) {
    return document.createTextNode(text);
  }

  function appendChild(node, child) {
    node.appendChild(child);
  }

  function parentNode(node) {
    return node.parentNode;
  }

  function tagName(node) {
    return node.tagName;
  }

  var nodeOps = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createElement: createElement$1,
    createTextNode: createTextNode,
    appendChild: appendChild,
    parentNode: parentNode,
    tagName: tagName
  });

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */

  function createPatchFunction(backend) {
    const { modules, nodeOps } = backend;

    function emptyNodeAt(elm) {
      return new VNode(
        nodeOps.tagName(elm).toLowerCase(),
        {},
        [],
        undefined,
        elm
      );
    }

    function createElm(
      vnode,
      insertedVnodeQueue,
      parentElm,
      refElm,
      nested,
      ownerArray,
      index
    ) {
      const tag = vnode.tag;
      const children = vnode.children;
      if (isDef(tag)) {
        vnode.elm = nodeOps.createElement(tag, vnode);
        console.log("this is createPathcFunction of core/vdom/patch", vnode);
        createChildren(vnode, children);
        insert(parentElm, vnode.elm);
        return "new Elm in src/core/vdom === patch";
      } else {
        vnode.elm = nodeOps.createTextNode(vnode.text);
        insert(parentElm, vnode.elm);
      }
    }

    function insert(parent, elm, ref) {
      if (isDef(parent)) {
        if (isDef(ref)) ; else {
          nodeOps.appendChild(parent, elm);
        }
      }
    }

    function createChildren(vnode, children, insertedVnodeQueue) {
      if (Array.isArray(children)) {
        for (let i = 0; i < children.length; ++i) {
          createElm(
            children[i],
            insertedVnodeQueue,
            vnode.elm);
        }
      }
    }

    return function patch(oldVnode, vnode, hydrating, removeOnly) {
      // TODO

      if (isUndef(oldVnode)) ; else {
        const isRealElement = isDef(oldVnode.nodeType);
        if (isRealElement) {
          oldVnode = emptyNodeAt(oldVnode);
        }
        const oldElm = oldVnode.elm;
        console.log("this is 【oldElm】 in patch of core/vom", oldVnode);
        console.log("this is 【VNODE】 in patch of core/vom", vnode);

        const parentElm = nodeOps.parentNode(oldElm);
        console.log("this is parentElm in patch of core/vom", parentElm);
        createElm(vnode, null, parentElm);
      }
    };
  }

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */
  const modules = "";
  const patch = createPatchFunction({ nodeOps, modules });

  Vue.prototype.__patch__ = patch;
  Vue.prototype.$mount = function (el, hydrating) {
    return mountComponent(this, el, hydrating);
  };

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */

  function query(el) {
    if (typeof el === "string") {
      const selected = document.querySelector(el);
      if (!selected) {
        console.warn("Cannot find element: " + el);
        return document.createElement("div");
      }
      return selected;
    } else {
      return el;
    }
  }

  const mount = Vue.prototype.$mount;
  Vue.prototype.$mount = function (el, hydrating) {
    el = query(el);
    const options = this.$options;

    if (!options.render) {
      let template = options.template;
      if (template) {
        if (typeof template === "string") {
          if (template.charAt(0) === "#") ; else if (template.nodeType) ; else {
            console.warn("template not found");
            return this;
          }
        }
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

  return Vue;

})));
