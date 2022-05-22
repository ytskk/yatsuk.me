import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { articleProvider } from "~/data/providers/article_provider";
import { DirectoryList } from "~/data/constants/directory_list";
import { githubApiProvider } from "~/data/providers/github_provider";
import { getMDXComponent } from "mdx-bundler/client";
import { DateUtils } from "../../utils/helpers/date_helper";
import Button from "~/components/Button";

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
        <section className={"article-header"}>
          <p
            className={
              "text-center mb-2 font-semibold text-sm text-label-color-secondary-light dark:text-label-color-secondary-dark"
            }
          >
            {DateUtils.formatDate(frontmatter.createdAt)} —{" "}
            {readTime?.text ?? "a quick read"}{" "}
          </p>
          <h1 className={"text-center"}>{frontmatter.title}</h1>
          <h4 className={"mt-2 text-center"}>{frontmatter.description}</h4>
          <div className={"mt-4 flex flex-wrap justify-center gap-4"}>
            {frontmatter.tags.map((tag) => (
              <Button>{tag}</Button>
            ))}
          </div>
        </section>
        <section className={"max-w-3xl prose dark:prose-invert"}>
          <Component />
        </section>
      </div>
    </div>
  );
}
