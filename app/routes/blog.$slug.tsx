import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { articleProvider } from "~/data/providers/article_provider";
import { DirectoryList } from "~/data/constants/directory_list";
import { githubApiProvider } from "~/data/providers/github_provider";
import { getMDXComponent } from "mdx-bundler/client";
import { DateUtils } from "../../utils/helpers/date_helper";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug) {
    throw Error("params.slug is not defined");
  }

  const page = await articleProvider.getArticle({
    contentDir: DirectoryList.blog,
    slug: params.slug,
  });

  return page;
};

export default function Article() {
  const data = useLoaderData();
  // console.log(data);
  const { code, frontmatter, readTime } = data.compiledPage;
  console.log(code);
  console.log(frontmatter);
  console.log(readTime);
  const Component = getMDXComponent(code);

  return (
    <div className={"page-wrapper"}>
      <div className="container">
        <div>
          {DateUtils.formatDate(frontmatter.createdAt)} —{" "}
          {readTime?.text ?? "a quick read"}{" "}
        </div>
        <h1>{frontmatter.title}</h1>
        <h4>{frontmatter.description}</h4>
        <section>
          <Component />
        </section>
      </div>
    </div>
  );
}
