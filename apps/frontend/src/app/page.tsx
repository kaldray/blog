import Link from "next/link";
import Image from "next/image";

import { Typographie } from "@app/Components/Typographie";
import { css } from "@style-system/css";
import { vstack } from "@style-system/patterns";

import type { ArticlesApiResponse } from "@app/types";

const getData = async () => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
  url.searchParams.append("populate", "*");
  url.searchParams.append("pagination[pageSize]", "3");
  const response = await fetch(`${url.toString()}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return response.json() as Promise<ArticlesApiResponse>;
};

export default async function Page() {
  const data = await getData();
  return (
    <>
      <section
        className={css({
          bgColor: "primary",
          w: "full",
          h: "full",
          display: "flex",
          flexDir: "column",
          justifyContent: "center",
        })}>
        <div className={vstack({ w: "3/4", mx: "auto", alignItems: "baseline" })}>
          <Typographie
            tag="h1"
            className={css({
              letterSpacing: "wide",
            })}>
            Mon Blog
          </Typographie>
          <Typographie
            tag="p"
            className={css({
              letterSpacing: "tighter",
            })}>
            Je découvre NextJS, Starpi et PandaCss. Cela va être fun !
          </Typographie>
        </div>
      </section>
      <section
        className={css({
          display: "grid",
          mt: "5",
          gap: "3",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 3fr))",
          gridTemplateRows: "auto",
          placeContent: "center",
          maxW: "80%",
          mx: "auto",
        })}>
        {data.data.map((d) => {
          return (
            <div
              className={vstack({
                justify: "center",
                position: "relative",
                bgColor: "secondary",
              })}
              key={d.attributes.uid}>
              <Image
                alt="ok"
                src={`${d.attributes.cover.data.attributes.url}`}
                width={d.attributes.cover.data.attributes.width}
                height={d.attributes.cover.data.attributes.height}
              />
              <Typographie tag="h2">{d.attributes.title}</Typographie>
              <Link
                className={css({
                  fontFamily: "montserrat",
                  bgColor: "accent",
                  p: "1.5",
                  px: "3",
                  borderRadius: "sm",
                  _hover: { textDecoration: "underline" },
                })}
                href={`article/${d.attributes.uid}`}>
                Lire l&apos;article
              </Link>
            </div>
          );
        })}
      </section>
    </>
  );
}
