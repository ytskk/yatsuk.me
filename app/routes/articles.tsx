import type { BlockContent } from "~/components/BlockTitle";
import BlockTitle from "~/components/BlockTitle";
import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-hooks";
import { Hits, SearchBox } from "react-instantsearch-hooks-web";

export default function Articles() {
  const blockTitleData: BlockContent = {
    title: "Articles",
    subtitle: "A collection of articles",
  };

  const searchClient = algoliasearch(
    "MOLDNV4CTN",
    "90c0c7a995535f951918742794936a09"
  );

  return (
    <div className={"page-wrapper"}>
      <div className="container">
        <BlockTitle {...blockTitleData} />
        <section>
          <InstantSearch
            indexName={"blog_articles"}
            searchClient={searchClient}
          >
            <SearchBox></SearchBox>
            <Hits hitComponent={Hit}></Hits>
          </InstantSearch>
        </section>
      </div>
    </div>
  );
}

function Hit(props) {
  console.log(props);
  return <div>hit</div>;
}
