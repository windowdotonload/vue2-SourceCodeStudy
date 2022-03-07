import { createCompileToFunctionFn } from "./to-function";

export function createCompilerCreator(baseCompile) {
  return function createCompiler(baseOptions) {
    function compile(template, options) {
      console.log("this is compile in createCompiler", template, options);
      const compiled = {};
      // TODO
      return compiled;
    }

    return { compile, compileToFunctions: createCompileToFunctionFn(compile) };
  };
}
