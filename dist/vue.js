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

  function noop$1(a, b, c) {}

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

  function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(",");
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? (val) => map[val.toLowerCase()] : (val) => map[val];
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
      // ?????????????????????????????????option?????????????????????????????????option???????????????????????????option
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
  // ??????children?????????????????????????????????textnode???vnode
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
    // ??????Sub._init()????????????options??????????????????parent??????
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
      vm._vnode = vnode;
      console.log("this is vm in _update of lifecycle", vm, vnode);
      if (!prevVnode) {
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
      } else {
        vm.$el = vm.__patch__(prevVnode, vnode);
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
      noop$1,
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
    // ??????Sub._init()
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
    // ?????????????????????????????????????????????????????????????????????????????????????????????
    // ???????????????????????????????????????????????????options????????????????????????
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
      // ???????????????????????????
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
      const { render, _parentVnode } = vm.$options;
      vm.$vnode = _parentVnode;

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
    // ????????????Vue.option???undefined
    // ??????_init?????????????????????options?????????Vue.options??????instance/index??????????????????core/index???????????????options
    // ??????????????????????????????new Vue??????????????????vm.constructor??????Vue????????????????????????options?????????options?????????Vue?????????????????????
    console.log("this is Vue before mergeoptions", Vue.options);
    Vue.prototype._init = function (options) {
      // _init???????????????
      // ??????????????????????????????????????????_init ,_init?????????????????????????????????????????????????????????
      // this ?????????????????? ????????????????????????????????????????????????????????????????????????????????????
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

      // ?????????????????? ??????_init(),???mergeOptions???????????????options????????????createComponentInstanceForVnode??????options
      initLifecycle(vm);
      initRender(vm);
      if (vm.$options.el) {
        vm.$mount(this.$options.el);
      }
    };
  }

  function initInternalComponent(vm, options) {
    // vm.constructor.options?????????mergeOptions????????????Sub.Options
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
        // ????????????_init?????????Sub.prototype = Object.create(Super.prototype);
        // _init?????????Vue.prototype??? Vue.extend?????????????????????
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
    // ?????????Vue.extend?????????
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
      if (createComponent(vnode, insertedVnodeQueue, parentElm)) {
        return;
      }
      const tag = vnode.tag;
      const children = vnode.children;
      if (isDef(tag)) {
        vnode.elm = nodeOps.createElement(tag, vnode);
        console.log("this is createPathcFunction of core/vdom/patch", vnode);
        createChildren(vnode, children);
        insert(parentElm, vnode.elm);
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
          // ???????????????componentVNodeHooks???????????????componentVNodeHooks???create-component????????????, ???????????????????????????
          i(vnode, false);
        }
        if (isDef(vnode.componentInstance)) {
          initComponent(vnode);
          insert(parentElm, vnode.elm);
          return true;
        }
      }
    }

    function initComponent(vnode, insertedVnodeQueue) {
      if (isDef(vnode.data.pendingInsert)) ;
      vnode.elm = vnode.componentInstance.$el;
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
      const insertedVnodeQueue = [];
      if (isUndef(oldVnode)) {
        createElm(vnode, insertedVnodeQueue);
      } else {
        const isRealElement = isDef(oldVnode.nodeType);
        if (isRealElement) {
          oldVnode = emptyNodeAt(oldVnode);
        }
        const oldElm = oldVnode.elm;
        const parentElm = nodeOps.parentNode(oldElm);
        console.log("this is parentElm in patch of core/vom", parentElm);
        createElm(vnode, insertedVnodeQueue, parentElm);
      }
      return vnode.elm;
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

  const baseOptions = {};

  function createFunction(code, errors) {
    try {
      return new Function(code);
    } catch (err) {
      errors.push({ err, code });
      return noop;
    }
  }

  function createCompileToFunctionFn(compile) {
    return function compileToFunctions(template, options, vm) {
      let res = {};
      const fnGenErrors = [];
      // res.render = function (C) {
      //   return C("div", [C("h2", "bcd"), C("aaa", "123")]);
      // };
      const compiled = compile(template, options);
      res.render = createFunction(compiled.render, fnGenErrors);
      res.staticRenderFns = ["staticRenderFns"];
      return res;
    };
  }

  function createCompilerCreator(baseCompile) {
    return function createCompiler(baseOptions) {
      function compile(template, options) {
        console.log("this is compile in createCompiler", template, options);
        const finalOptions = Object.create(baseOptions);
        const compiled = baseCompile(template.trim(), finalOptions);
        return compiled;
      }

      return { compile, compileToFunctions: createCompileToFunctionFn(compile) };
    };
  }

  const isPlainTextElement = makeMap("script,style,textarea", true);

  function parseHTML(html, options) {
    let last;
    while (html) {
      last = html;
      {
        let textEnd = html.indexOf("<");
        if (textEnd === 0) {
          if (comment.test(html)) {
            const commentEnd = html.indexOf("-->");
            if (commentEnd >= 0) {
              if (options.shouldKeepComment) {
                options.comment(
                  html.substring(4, commentEnd),
                  index,
                  index + commentEnd + 3
                );
              }
              advance(commentEnd + 3);
              continue;
            }
          }
        }
      }

      if (html === last) {
        break;
      }
    }
  }

  function parse(template, options) {
    let root;
    parseHTML(template, {
      start(tag, attrs, unary, start, end) {},
      end(tag, start, end) {},
      chars(text, start, end) {},
      comment(text, start, end) {},
    });
    return root;
  }

  function generate(ast, options) {
    return {
      render: `with(this){return ${code}}`,
      staticRenderFns: state.staticRenderFns,
    };
  }

  const createCompiler = createCompilerCreator(function baseCompile(
    template,
    options
  ) {
    const ast = parse(template.trim());
    const code = generate();
    return {
      ast,
      render: code.render,
      staticRenderFns: code.staticRenderFns,
    };
  });

  const { compile, compileToFunctions } = createCompiler(baseOptions);

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
            // ?????????template
            console.warn("template not found");
            return this;
          }
        }
      }
      if (template) {
        // TODO
        const { render, staticRenderFns } = compileToFunctions(
          template,
          {
            // outputSourceRange: process.env.NODE_ENV !== "production",
            // shouldDecodeNewlines,
            // shouldDecodeNewlinesForHref,
            // delimiters: options.delimiters,
            // comments: options.comments,
          },
          this
        );

        options.render = render;
      }
    }
    mount.call(this, el, hydrating);
  };

  return Vue;

})));
