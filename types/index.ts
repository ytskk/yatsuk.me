import type dayjs from "dayjs";
import type calculateReadingTime from "reading-time";

type GetArticleData = {
  contentDir: "blog" | "projects";
  slug: string;
};

type GitHubFile = { path: string; content: string };

type MdxPage = {
  code: string;
  slug: string;
  editLink: string;
  readTime?: ReturnType<typeof calculateReadingTime>;

  /**
   * It's annoying that all these are set to optional I know, but there's
   * no great way to ensure that the MDX files have these properties,
   * especially when a common use case will be to edit them without running
   * the app or build. So we're going to force you to handle situations when
   * these values are missing to avoid runtime errors.
   */
  frontmatter: {
    title?: string;
    description?: string;
    imageUrl?: string;

    // Post meta
    categories?: Array<string>;
    createdAt?: string;
  };
};

interface DateTypeMap {
  default: string | Date | dayjs.Dayjs;
}

type DateType = DateTypeMap[keyof DateTypeMap];

export type { GetArticleData, GitHubFile, MdxPage, DateType };
