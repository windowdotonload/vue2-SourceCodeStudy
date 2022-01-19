import { isUndef } from "../utils/index";
export function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  if (isObject(Ctor)) {
    console.log("this is Ctor===>", Ctor);
  }
  console.log("createComponent", Ctor, data, context, children, tag);
}
