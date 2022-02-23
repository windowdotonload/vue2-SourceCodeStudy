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
      this.componentOptions = componentOptions;
      this.asyncFactory = asyncFactory;
    }
  }

  function noop(a, b, c) {}

  const no = (a, b, c) => {
    return a.includes("div") || a.includes("h");
  }; //TODO

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

  function isObject(obj) {
    return obj !== null && typeof obj === "object";
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
      // 合并父组件与子组件中的option，如果父子组件有相同的option，直接返回子组件的option
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
  // 如果children是一个原始值，创建一个textnode的vnode
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

  /*
   * @Descripttion:
   * @version:
   * @Author: windowdotonload
   */

  class Watcher {
    constructor(vm, expOrFn, cb, options, isRenderWatcher) {
      console.log("this is Watcher ===>", vm, expOrFn);
      expOrFn();
    }
  }

  let activeInstance = null;

  function setActiveInstance(vm) {
    const prevActiveInstance = activeInstance;
    activeInstance = vm;
    return () => {
      activeInstance = prevActiveInstance;
    };
  }

  function initLifecycle(vm) {
    // 应为Sub._init()也会合并options，所以会存在parent属性
    const options = vm.$options;

    let parent = options.parent;
    if (parent && !options.abstract) {
      parent.$children.push(vm);
    }

    vm.$parent = parent;
    vm.$children = [];
    console.log("this is paraent in initLifecycle =======", parent);
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
      const vm = this;
      const prevVnode = vm._vnode;
      const restoreActiveInstance = setActiveInstance(vm);
      console.log("this is vm in _update of lifecycle", vm, vnode);
      if (!prevVnode) {
        // initial render
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
      }
      restoreActiveInstance();
      console.log("lifecycleMixin after __patch__");
    };
  }

  function mountComponent(vm, el, hydrating) {
    vm.$el = el;
    let updateComponent;

    updateComponent = () => {
      vm._update(vm._render(), hydrating);
    };

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

  // import { resolveConstructorOptions } from "../instance/init";
  const componentVNodeHooks = {
    init(vnode, hydrating) {
      console.log("this is componentVNodeHooks -- init");
      if (
        vnode.componentInstance &&
        !vnode.componentInstance._isDestroyed &&
        vnode.data.keepAlive
      ) {
        console.log("vnode.componentInstance");
      } else {
        const child = (vnode.componentInstance = createComponentInstanceForVnode(
          vnode,
          activeInstance
        ));
        child.$mount(hydrating ? vnode.elm : undefined, hydrating);
      }
    },
    prepatch() {
      console.log("this is componentVNodeHooks -- prepatch");
    },
    insert() {
      console.log("this is componentVNodeHooks -- insert");
    },
    destroy() {
      console.log("this is componentVNodeHooks -- destroy");
    },
  };
  const hooksToMerge = Object.keys(componentVNodeHooks);

  function createComponent(Ctor, data, context, children, tag) {
    if (isUndef(Ctor)) {
      return;
    }

    const baseCtor = context.$options._base;

    if (isObject(Ctor)) {
      Ctor = baseCtor.extend(Ctor);
    }

    if (typeof Ctor !== "function") {
      return;
    }
    let asyncFactory;
    if (isUndef(Ctor.cid)) {
      asyncFactory = Ctor;
    }
    data = data || {};

    // resolveConstructorOptions(Ctor);

    const propsData = "";
    const listeners = data.on;
    installComponentHooks(data);
    const name = Ctor.options.name || tag;
    const vnode = new VNode(
      `vue-component-${Ctor.cid}${name ? `-${name}` : ""}`,
      data,
      undefined,
      undefined,
      undefined,
      undefined,
      { Ctor, propsData, listeners, tag, children },
      asyncFactory
    );
    console.log("this is vnode in create-component", vnode);
    return vnode;
  }

  function createComponentInstanceForVnode(vnode, parent) {
    const options = {
      _isComponent: true,
      _parentVnode: vnode,
      parent,
    };
    // 调用Sub._init()
    return new vnode.componentOptions.Ctor(options);
  }

  function installComponentHooks(data) {
    const hooks = data.hook || (data.hook = {});
    for (let i = 0; i < hooksToMerge.length; i++) {
      const key = hooksToMerge[i];
      const existing = hooks[key];
      const toMerge = componentVNodeHooks[key];
      if (existing !== toMerge && !(existing && existing._merged)) {
        hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge;
      }
    }
  }

  function mergeHook(f1, f2) {
    console.log("this is in mergehooook");
    // 合并生命周期钩子，如果父子组件都有相同的钩子，合并之后依次执行
    // 所以钩子函数有相同的是都会执行，而options中的属性是会覆盖
    const merged = (a, b) => {
      f1(a, b);
      f2(a, b);
    };
    merged._merged = true;
    return merged;
  }

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
        vnode = createComponent(Ctor, data, context, children, tag);
        console.log("this is Ctor after createcomponent", Ctor);
      } else {
        vnode = new VNode(tag, data, children, undefined, undefined, context);
        console.log("this is vnode ========>_createElement", vnode);
      }
    }

    return vnode;
  }

  function initRender(vm) {
    vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);
  }

  function renderMixin(Vue) {
    Vue.prototype._render = function () {
      const vm = this;
      let vnode;
      const { render } = vm.$options;
      // C("div", [C("h2", "bcd"), C("aaa", "123"), C("bbb", "123")]);
      vnode = render.call(vm._renderProxy, vm.$createElement);
      console.log("this is vnode in renderMixin ===========>", vnode);
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
    // 在此处的Vue.option为undefined
    // 通过_init合并之后才会有options，因为Vue.options是在instance/index的下一个文件core/index中才加上的options
    // 所以会在最后执行实例new Vue时候通过实例vm.constructor拿到Vue构造函数才能合并options，因为options相当于Vue的一个静态属性
    console.log("this is Vue before mergeoptions", Vue.options);
    Vue.prototype._init = function (options) {
      // _init为入口函数
      // 无论是组件还是子组件都会调用_init ,_init会多次调用，不同的时机会命中不同的判断
      // this 指向的是实例 ，父组件调用就是指向的父实例，子组件调用就是指向的子实例
      const vm = this;
      if (options && options._isComponent) {
        initInternalComponent(vm, options);
      } else {
        vm.$options = mergeOptions(
          resolveConstructorOptions(vm.constructor),
          options || {},
          vm
        );
      }

      console.log("this is vm after merge options ====>", vm);
      initProxy(vm);

      // 创建子组件时 再次_init(),会mergeOptions，此时的￥options里包含了createComponentInstanceForVnode中的options
      initLifecycle(vm);
      initRender(vm);
      if (vm.$options.el) {
        vm.$mount(this.$options.el);
      }
    };
  }

  function initInternalComponent(vm, options) {
    // vm.constructor.options是经过mergeOptions合并过的Sub.Options
    const opts = (vm.$options = Object.create(vm.constructor.options));
    const parentVnode = options._parentVnode;
    opts.parent = options.parent;
    opts._parentVnode = parentVnode;

    const vnodeComponentOptions = parentVnode.componentOptions;
    opts.propsData = vnodeComponentOptions.propsData;
    opts._parentListeners = vnodeComponentOptions.listeners;
    opts._renderChildren = vnodeComponentOptions.children;
    opts._componentTag = vnodeComponentOptions.tag;

    if (options.render) {
      opts.render = options.render;
      opts.staticRenderFns = options.staticRenderFns;
    }
  }

  function resolveConstructorOptions(Ctor) {
    let options = Ctor.options;
    return options;
  }

  // import { warn } from "../util/index";

  function Vue(options) {
    console.log("THIS IS VUE IN NEW VUE =======> ", options);
    this._init(options);
  }

  initMixin(Vue);
  // stateMixin(Vue);
  // eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);

  function initExtend(Vue) {
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

  function initGlobalAPI(Vue) {
    console.log(" this is in initGlobalApi ");
    Vue.options = Object.create(null);
    Vue.options._base = Vue;
    Vue.options.other = "other-initGlobalApi";
    // 初始化Vue.extend，继承
    initExtend(Vue);
  }

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
      if (createComponent(vnode)) {
        return;
      }

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

    function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
      let i = vnode.data;
      console.log("this is vnode in createComponent*****", vnode.data);
      if (isDef(i)) {
        const isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
        if (isDef((i = i.hook)) && isDef((i = i.init))) {
          // 相当于调用componentVNodeHooks中的方法，componentVNodeHooks在create-component中定义的
          // 创建出了一个子实例
          i(vnode, false);
        }
        if (isDef(vnode.componentInstance)) {
          console.log("this is in patch -- createComponent");
        }
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
      debugger;
      const insertedVnodeQueue = [];
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
        createElm(vnode, insertedVnodeQueue, parentElm);
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
