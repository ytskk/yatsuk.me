type GetArticleData = {
  contentDir: "blog" | "projects";
  slug: string;
};

type GitHubFile = { path: string; content: string };

export type { GetArticleData, GitHubFile };
