import { Suspense } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { redirect } from "next/navigation";

import { css } from "@style-system/css";
import { BackLink } from "@app/Components/BackLink";
import { Hero } from "../../../Components/Hero";

import type { ArticlesApiResponse } from "@app/types";

export async function generateStaticParams() {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
  url.searchParams.append("populate", "*");
  const response = await fetch(`${url.toString()}`, {
    headers: {
      Accept: "application/json",
    },
  });
  const articles = (await response.json()) as ArticlesApiResponse;
  return articles.data.map((d) => ({
    uid: d.attributes.uid,
  }));
}

const getArticleData = async (uid: string) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
  url.searchParams.append("filters[uid][$eq]", uid);
  url.searchParams.append("populate", "*");
  const response = await fetch(`${url.toString()}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return response.json() as Promise<ArticlesApiResponse>;
};

type PageProps = {
  params: { uid: string };
};

export const revalidate = 30;

export default async function Page({ params: { uid } }: PageProps) {
  const data = await getArticleData(uid);
  const article = data.data[0];
  if (article === undefined) {
    redirect("/");
  }
  return (
    <>
      <Hero article={article} h1={article.attributes.title}>
        <BackLink />
      </Hero>
      <section className={css({ display: "grid", placeContent: "center", mt: "5" })}>
        <Suspense fallback={<p>loading</p>}>
          <MDXRemote source={article.attributes.content} />
        </Suspense>
      </section>
    </>
  );
}
