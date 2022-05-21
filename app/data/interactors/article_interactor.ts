import type { GithubRepository } from "~/data/repositories/github_repository/github_repository.server";
import type { GetArticleData } from "../../../types";
import { githubApiProvider } from "~/data/providers/github_provider";
import type { MdxInteractor } from "~/data/interactors/mdx_interactor";

class ArticleInteractor {
  private readonly githubProvider: GithubRepository;
  private readonly mdxCompiler: MdxInteractor;

  constructor(githubProvider: GithubRepository, mdxCompiler: MdxInteractor) {
    this.githubProvider = githubProvider;
    this.mdxCompiler = mdxCompiler;
  }

  public async getArticle({ contentDir, slug }: GetArticleData) {
    const pageFiles = await this.githubProvider.downloadFileOrDirectory(
      githubApiProvider.getRelativePath({
        contentDir,
        slug,
      })
    );
    const compiledPage = await this.mdxCompiler.compileMdx({
      contentDir,
      slug,
      ...pageFiles,
    });

    return pageFiles;
  }
}

export { ArticleInteractor };
