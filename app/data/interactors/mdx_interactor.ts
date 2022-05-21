import type { GetArticleData, GitHubFile, MdxPage } from "../../../types";
import type { MdxCompiler } from "~/data/api/mdx_compiler.server";
import { owner, repo } from "~/data/api/github_api.server";

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
    const compiledPage = await this.mdxCompiler.compileMdx<
      MdxPage["frontmatter"]
    >(slug, files);

    return {
      compiledPage,
      slug,
      editLink: `https://github.com/${owner}/${repo}/edit/main/${entry}`,
    };
  }
}

export { MdxInteractor };
