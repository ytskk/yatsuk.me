import { ArticleInteractor } from "~/data/interactors/article_interactor";
import { githubApiProvider } from "~/data/providers/github_provider";
import { mdxCompilerProvider } from "~/data/providers/mdx_compiler_provider";

const articleProvider = new ArticleInteractor(
  githubApiProvider,
  mdxCompilerProvider
);

export { articleProvider };
