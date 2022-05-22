import type { Octokit } from "@octokit/rest";
import nodePath from "path";
import type { GetArticleData, GitHubFile } from "../../../../types";
import { owner, repo } from "~/data/api/github_api.server";

class GithubRepository {
  private clientApi: Octokit;

  constructor(clientApi: Octokit) {
    this.clientApi = clientApi;
  }

  /**
   *
   * @param path The full path to directory.
   * @returns Promise that resolves to a file ListItem of the files/directories in the given directory (not recursive).
   */
  public async downloadDirList(path: string) {
    console.log(path);
    const response = await this.clientApi.repos.getContent({
      owner,
      repo,
      path,
    });

    const data = response.data;

    if (!Array.isArray(data)) {
      throw new Error(
        `Tried to download content from ${path}. GitHub did not return an array of files. This should never happen...`
      );
    }

    return data;
  }

  public async downloadFileOrDirectory(relativePath: string) {
    const mdxFileOrDirectoryPath = `content/${relativePath}`;

    const parentDir = nodePath.dirname(mdxFileOrDirectoryPath);
    const dirList = await this.downloadDirList(parentDir);

    const basename = nodePath.basename(mdxFileOrDirectoryPath);
    const mdxFileWithoutExt = nodePath.parse(mdxFileOrDirectoryPath).name;

    const potentials = dirList.filter(({ name }) => name.startsWith(basename));
    const exactMatch = potentials.find(
      ({ name }) => nodePath.parse(name).name === mdxFileWithoutExt
    );
    const dirPotential = potentials.find(({ type }) => type === "dir");

    const content = await this.downloadFirst(
      exactMatch ? [exactMatch] : potentials
    );

    let files: Array<GitHubFile> = [];
    let entry = mdxFileOrDirectoryPath;
    if (content) {
      // technically you can get the articles post by adding .mdx at the end... Weird
      // but may as well handle it since that's easy...
      entry = mdxFileOrDirectoryPath.endsWith(".mdx")
        ? mdxFileOrDirectoryPath
        : `${mdxFileOrDirectoryPath}.mdx`;
      // /content/about.mdx => entry is about.mdx, but compileMdx needs
      // the entry to be called "/content/index.mdx" so we'll set it to that
      // because this is the entry for this path
      files = [
        { path: nodePath.join(mdxFileOrDirectoryPath, "index.mdx"), content },
      ];
    } else if (dirPotential) {
      entry = dirPotential.path;
      files = await this.downloadDirectory(mdxFileOrDirectoryPath);
    }

    return { entry, files };
  }

  public getRelativePath({ contentDir, slug }: GetArticleData) {
    return `${contentDir}/${slug}`;
  }

  /**
   *
   * @param dir Directory to download.
   * This will recursively download all content at the given path.
   * @returns An array of file paths with their content.
   */
  async downloadDirectory(dir: string): Promise<Array<GitHubFile>> {
    const dirList = await this.downloadDirList(dir);

    const result = await Promise.all(
      dirList.map(async ({ path: fileDir, type, sha }) => {
        switch (type) {
          case "file": {
            const content = await this.downloadFileBySha(sha);
            return { path: fileDir, content };
          }
          case "dir": {
            return this.downloadDirectory(fileDir);
          }
          default: {
            throw new Error(`Unexpected repo file type: ${type}`);
          }
        }
      })
    );

    return result.flat();
  }

  private async downloadFirst(
    list: Array<{ name: string; type: string; path: string; sha: string }>
  ) {
    const filesOnly = list.filter(({ type }) => type === "file");

    for (const extension of [".mdx", ".md"]) {
      const file = filesOnly.find(({ name }) => name.endsWith(extension));
      if (file) return this.downloadFileBySha(file.sha);
    }

    return null;
  }

  private async downloadFileBySha(sha: string) {
    const { data } = await this.clientApi.request(
      "GET /repos/{owner}/{repo}/git/blobs/{file_sha}",
      {
        owner,
        repo,
        file_sha: sha,
      }
    );

    const encoding = data.encoding as Parameters<typeof Buffer.from>["1"];
    return Buffer.from(data.content, encoding).toString();
  }
}

export { GithubRepository };
