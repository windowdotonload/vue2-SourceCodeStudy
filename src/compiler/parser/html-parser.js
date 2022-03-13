import { makeMap, no } from "shared/util";

export const isPlainTextElement = makeMap("script,style,textarea", true);

export function parseHTML(html, options) {
  let last, lastTag;
  while (html) {
    last = html;
    if (!lastTag || !isPlainTextElement(lastTag)) {
    }
  }
}
