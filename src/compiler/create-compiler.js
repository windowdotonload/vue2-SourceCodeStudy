import { createCompileToFunctionFn } from "./to-function";

export function createCompilerCreator(baseCompile) {
  return function createCompiler(baseOptions) {
    function compile(template, options) {
      console.log("this is compile in createCompiler", template, options);
      const finalOptions = Object.create(baseOptions);
      const compiled = baseCompile(template.trim(), finalOptions);
      return compiled;
    }

    return { compile, compileToFunctions: createCompileToFunctionFn(compile) };
  };
}
