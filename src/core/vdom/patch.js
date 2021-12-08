/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
export function createPatchFunction() {
  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    console.log("this is createPatchFunction===========");
  };
}
