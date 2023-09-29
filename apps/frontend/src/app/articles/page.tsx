import Image from "next/image";

import { BackLink } from "@app/Components/BackLink";
import { Hero } from "@app/Components/Hero";
import { NavLink } from "@app/Components/NavLink";
import { Typographie } from "@app/Components/Typographie";
import { css } from "@style-system/css";

import { vstack } from "@style-system/patterns";
import type { ArticlesApiResponse } from "@app/types";

const getAllArticles = async () => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
  url.searchParams.append("populate", "*");
  const response = await fetch(`${url.toString()}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return response.json() as Promise<ArticlesApiResponse>;
};

export default async function Page() {
  const articles = await getAllArticles();
  return (
    <>
      <Hero h1={"Liste des articles"}>
        <BackLink />
      </Hero>
      <section
        className={css({
          display: "grid",
          mt: "5",
          gap: "3",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 100%))",
          gridTemplateRows: "auto",
          placeContent: "center",
          maxW: "80%",
          mx: "auto",
        })}>
        {articles.data.map((d) => {
          return (
            <div
              className={vstack({
                justify: "flex-start",
                position: "relative",
                bgColor: "secondary",
                alignItems: "flex-start",
                p: "4",
              })}
              key={d.attributes.uid}>
              <Image
                alt="ok"
                src={`${d.attributes.cover.data.attributes.url}`}
                width={d.attributes.cover.data.attributes.width}
                height={d.attributes.cover.data.attributes.height}
              />
              <Typographie tag="h2">{d.attributes.title}</Typographie>
              <NavLink href={`article/${d.attributes.uid}`}>Lire l&apos;article</NavLink>
            </div>
          );
        })}
      </section>
    </>
  );
}
