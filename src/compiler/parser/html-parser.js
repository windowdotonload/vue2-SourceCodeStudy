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
        if (comment.test(html)) {
          const commentEnd = html.indexOf("-->");
          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(
                html.substring(4, commentEnd),
                index,
                index + commentEnd + 3
              );
            }
            advance(commentEnd + 3);
            continue;
          }
        }
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
