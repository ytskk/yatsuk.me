import type { GitHubFile } from "../../../types";
import { bundleMDX } from "mdx-bundler";
import calculateReadingTime from "reading-time";

class MdxCompiler {
  public async compileMdx<FrontmatterType extends Record<string, unknown>>(
    slug: string,
    githubFiles: Array<GitHubFile>
  ) {
    const indexRegex = new RegExp(`${slug}\\/index.mdx?$`);
    const indexFile = githubFiles.find(({ path }) => indexRegex.test(path));
    if (!indexFile) return null;

    const rootDir = indexFile.path.replace(/index.mdx?$/, "");
    const relativeFiles: Array<GitHubFile> = githubFiles.map(
      ({ path, content }) => ({
        path: path.replace(rootDir, "./"),
        content,
      })
    );

    const files = this.arrayToObj(relativeFiles, {
      keyName: "path",
      valueName: "content",
    });

    try {
      const { frontmatter, code } = await bundleMDX({
        source: indexFile.content,
        files,
      });
      const readTime = calculateReadingTime(indexFile.content);

      return {
        code,
        readTime,
        frontmatter: frontmatter as FrontmatterType,
      };
    } catch (error: unknown) {
      console.error(`Compilation error for slug: `, slug);
      throw error;
    }
  }

  private arrayToObj<ItemType extends Record<string, unknown>>(
    array: Array<ItemType>,
    {
      keyName,
      valueName,
    }: { keyName: keyof ItemType; valueName: keyof ItemType }
  ) {
    const obj: Record<string, ItemType[keyof ItemType]> = {};
    for (const item of array) {
      const key = item[keyName];
      if (typeof key !== "string") {
        throw new Error(`${keyName} of item must be a string`);
      }

      obj[key] = item[valueName];
    }
    return obj;
  }
}

export { MdxCompiler };
