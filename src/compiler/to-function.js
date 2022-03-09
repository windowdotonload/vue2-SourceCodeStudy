function createFunction(code, errors) {
  try {
    return new Function(code);
  } catch (err) {
    errors.push({ err, code });
    return noop;
  }
}

export function createCompileToFunctionFn(compile) {
  return function compileToFunctions(template, options, vm) {
    let res = {};
    const fnGenErrors = [];
    // res.render = function (C) {
    //   return C("div", [C("h2", "bcd"), C("aaa", "123")]);
    // };
    const compiled = compile(template, options);
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = ["staticRenderFns"];
    return res;
  };
}
