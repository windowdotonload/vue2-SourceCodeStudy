import { makeMap, no } from "../../shared/util";

export const isPlainTextElement = makeMap("script,style,textarea", true);

export function parseHTML(html, options) {
  const stack = [];
  let last, lastTag;
  while (html) {
    last = html;
    if (!lastTag || !isPlainTextElement(lastTag)) {
    }

    if (html === last) {
      break;
    }
  }
}
