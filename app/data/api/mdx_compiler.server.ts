import type { GitHubFile } from "../../../types";

class MdxCompiler {
  public async compileMdx(slug: string, githubFiles: Array<GitHubFile>) {
    const indexRegex = new RegExp(`${slug}\\/index.mdx?$`);
    const indexFile = githubFiles.find(({ path }) => indexRegex.test(path));
    if (!indexFile) return null;
  }
}

export { MdxCompiler };
