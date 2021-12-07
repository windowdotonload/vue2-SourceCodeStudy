/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
export function createPatchFunction() {
  return () => {
    console.log("this is createPatch in vdom/patch");
  };
}
