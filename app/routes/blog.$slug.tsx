import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { articleProvider } from "~/data/providers/article_provider";
import { DirectoryList } from "~/data/constants/directory_list";
import { githubApiProvider } from "~/data/providers/github_provider";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug) {
    throw Error("params.slug is not defined");
  }

  // const page = await articleProvider.getArticle({
  //   contentDir: DirectoryList.blog,
  //   slug: params.slug,
  // });
  const page = githubApiProvider.downloadFileOrDirectory(
    githubApiProvider.getRelativePath({
      contentDir: DirectoryList.blog,
      slug: params.slug,
    })
  );

  return page;
};

export default function Article() {
  const data = useLoaderData();
  console.log(data);

  return (
    <div className={"page-wrapper"}>
      <div className="container">It's Article page</div>
    </div>
  );
}
