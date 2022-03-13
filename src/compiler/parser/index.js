import { parseHTML } from "./html-parser";
export function parse(template, options) {
  let root;
  parseHTML(template, {
    start(tag, attrs, unary, start, end) {},
    end(tag, start, end) {},
    chars(text, start, end) {},
    comment(text, start, end) {},
  });
  return root;
}
