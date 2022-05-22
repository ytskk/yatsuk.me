import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { articleProvider } from "~/data/providers/article_provider";
import { DirectoryList } from "~/data/constants/directory_list";
import { githubApiProvider } from "~/data/providers/github_provider";
import { getMDXComponent } from "mdx-bundler/client";
import { DateUtils } from "../../utils/helpers/date_helper";
import Button from "~/components/Button";
import type { MetaFunction } from "@remix-run/react/routeModules";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug) {
    throw Error("params.slug is not defined");
  }

  const page = await articleProvider.getArticle({
    contentDir: DirectoryList.articles,
    slug: params.slug,
  });

  return page;
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `${data.compiledPage.frontmatter.title} | Yatsuk.me`,
  };
};

export default function Article() {
  const data = useLoaderData();
  const { code, frontmatter, readTime } = data.compiledPage;
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
          {frontmatter.imageUrl && (
            <div className="cover-image lg:my-8 my-4 lg:h-[28rem] h-[16rem] overflow-hidden rounded-2xl">
              <img
                alt=""
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${frontmatter.imageUrl})`,
                }}
              />
            </div>
          )}
        </section>
        <section className={"max-w-3xl prose dark:prose-invert"}>
          <Component />
        </section>
      </div>
    </div>
  );
}
