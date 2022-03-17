import { makeMap, no } from "../../shared/util";

export const isPlainTextElement = makeMap("script,style,textarea", true);

export function parseHTML(html, options) {
  const stack = [];
  let last, lastTag;
  while (html) {
    last = html;
    if (!lastTag || !isPlainTextElement(lastTag)) {
      let textEnd = html.indexOf("<");
      if (textEnd === 0) {
        console.log("this is in parseHTML");
      }
      if (textEnd >= 0) {
        //   TODO
      }

      if (textEnd < 0) {
        //   TODO
      }
    }

    if (html === last) {
      break;
    }
  }
}
