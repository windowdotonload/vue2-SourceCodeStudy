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
    console.log("this is createElm in createPathcFunction", vnode);
    const tag = vnode.tag;
    if (isDef(tag)) {
      vnode.elm = vnode.ns;
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
