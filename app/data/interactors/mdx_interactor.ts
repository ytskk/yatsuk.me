import type {GetArticleData, GitHubFile} from "../../../types";
import type {MdxCompiler} from "~/data/api/mdx_compiler.server";

class MdxInteractor {
  private readonly mdxCompiler: MdxCompiler;
 
  constructor(mdxCompiler: MdxCompiler) {
    this.mdxCompiler = mdxCompiler;
  }

  async compileMdx({
                     contentDir,
                     slug,
                     entry,
                     files,
                   }: GetArticleData & { entry: string; files: Array<GitHubFile> }) {
  }

}

export {MdxInteractor};
