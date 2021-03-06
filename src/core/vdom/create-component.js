import { isUndef, isObject } from "../utils/index";
import VNode from "./vnode";
import { activeInstance } from "../instance/lifecycle";
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

export function createComponent(Ctor, data, context, children, tag) {
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

export function createComponentInstanceForVnode(vnode, parent) {
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
