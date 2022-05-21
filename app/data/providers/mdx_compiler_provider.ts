import { MdxInteractor } from "~/data/interactors/mdx_interactor";
import { MdxCompiler } from "~/data/api/mdx_compiler.server";

const mdxCompilerProvider = new MdxInteractor(new MdxCompiler());

export { mdxCompilerProvider };
