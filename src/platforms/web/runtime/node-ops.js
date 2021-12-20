/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
export function createElement(tagName, vnode) {
  const elm = document.createElement("div");

  return elm;
}

export function appendChild(node, child) {
  node.appendChild(child);
}

export function parentNode(node) {
  return node.parentNode;
}

export function tagName(node) {
  return node.tagName;
}
