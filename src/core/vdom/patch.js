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
      console.log(
        "this is vnode.elm in  createPathcFunction of core/vdom/patch",
        vnode
      );
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    // TODO
    console.log("this is createPatchFunction===========");

    if (isUndef(oldVnode)) {
    } else {
      const isRealElement = true;
      createElm(vnode);

      if (isDef(tag)) {
      }
    }
  };
}
