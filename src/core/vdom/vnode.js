/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
export function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}
export default class VNode {
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
