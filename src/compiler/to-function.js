export function createCompileToFunctionFn(compile) {
  return function compileToFunctions(template, options, vm) {
    compile();
    console.log("this is compileToFunctions in compileToFunctions=====>");
    let res = {};
    res.render = function (C) {
      return C("div", [C("h2", "bcd"), C("aaa", "123")]);
    };
    res.staticRenderFns = ["staticRenderFns"];
    return res;
  };
}
