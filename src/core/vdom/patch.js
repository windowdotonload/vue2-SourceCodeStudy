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

import { isUndef } from "../../shared/util";

export function createPatchFunction() {
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
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    // TODO
    console.log("this is createPatchFunction===========");

    if (isUndef(oldVnode)) {
    } else {
      const isRealElement = true;
      createElm(vnode);
    }
  };
}
