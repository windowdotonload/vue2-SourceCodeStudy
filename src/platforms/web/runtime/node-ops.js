/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
export function createElement(tagName, vnode) {
  const elm = document.createElement(tagName);
  return elm;
}

export function createTextNode(text) {
  return document.createTextNode(text);
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
