import { isUndef, isDef, isPrimitive } from "../../shared/util";
import VNode from "../vdom/vnode";

export function createPatchFunction(backend) {
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
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
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
    console.log("this is vnode in createComponent*****", vnode);
    if (isDef(i)) {
      const isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef((i = i.hook)) && isDef((i = i.init))) {
        // 相当于调用componentVNodeHooks中的方法，componentVNodeHooks在create-component中定义的
        i(vnode, false);
      }
      if (isDef(vnode.componentInstance)) {
        console.log("this is in patch ----- createComponent");
      }
    }
  }

  function insert(parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
      } else {
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
          vnode.elm,
          null,
          true,
          children,
          i
        );
      }
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    const insertedVnodeQueue = [];
    if (isUndef(oldVnode)) {
    } else {
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
