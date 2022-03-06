export function createCompileToFunctionFn(compile) {
  return function compileToFunctions(template, options, vm) {
    compile();
    console.log("this is compileToFunctions in compileToFunctions=====>");
    let res = {};
    res.render = {};
    return res;
  };
}
