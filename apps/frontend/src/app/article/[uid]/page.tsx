import { MDXRemote } from "next-mdx-remote/rsc";
import { redirect } from "next/navigation";

import { ArticlesApiResponse } from "@app/types";

import { Typographie } from "@app/Components/Typographie";
import { css } from "@style-system/css";
import { hstack, vstack } from "@style-system/patterns";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

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
      <section
        className={css({
          bgColor: "primary",
          w: "full",
          h: "full",
          display: "flex",
          flexDir: "column",
        })}>
        <div
          className={vstack({
            w: "4/5",
            mx: "auto",
            alignItems: "flex-start",
            h: "full",
          })}>
          <Link
            className={css({
              fontFamily: "montserrat",
              fontSize: "1.125rem",
              textDecoration: "underline",
              _hover: {
                scale: "1.1",
              },
              _active: {
                scale: "1.1",
              },
            })}
            href={"/"}>
            Retour
          </Link>
          <div
            className={hstack({
              w: "full",
              h: "full",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1",
              smDown: {
                justifyContent: "space-around",
                flexDir: "column",
                alignItems: "center",
              },
            })}>
            <div
              className={vstack({
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "1",
              })}>
              <Typographie
                tag="h1"
                className={css({
                  letterSpacing: "wide",
                  flex: 1,
                })}>
                {article?.attributes.title}
              </Typographie>
              <Typographie
                tag="span"
                className={css({
                  bgColor: "accent",
                  p: "1.5",
                  px: "3",
                  minW: "10",
                  textAlign: "center",
                  borderRadius: "sm",
                })}>
                {article?.attributes.categories.data.map((d) => {
                  return "#" + d.attributes.category_name;
                })}
              </Typographie>
            </div>
            <Image
              alt="todo"
              src={`${article?.attributes.cover.data.attributes.url}`}
              width={article?.attributes.cover.data.attributes.width}
              height={article?.attributes.cover.data.attributes.height}
            />
          </div>
        </div>
      </section>
      <section className={css({ display: "grid", placeContent: "center", mt: "5" })}>
        <Suspense fallback={<p>loading</p>}>
          <MDXRemote source={article.attributes.content} />
        </Suspense>
      </section>
    </>
  );
}
