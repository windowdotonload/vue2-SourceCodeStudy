/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */

import { isUndef, isDef } from "../../shared/util";

export function createPatchFunction(backend) {
  const { modules, nodeOps } = backend;

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
    if (isDef(tag)) {
      vnode.elm = nodeOps.createElement(tag, vnode);
      console.log("this is  createPathcFunction of core/vdom/patch", vnode);

      insert(parentElm, vnode.elm, refElm);
    }
  }

  function insert(parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (nodeOps.parentNode(ref) === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    // TODO

    if (isUndef(oldVnode)) {
    } else {
      const isRealElement = true;
      createElm(vnode);
    }
  };
}
