import Image from "next/image";

import { css } from "@style-system/css";
import { hstack, vstack } from "@style-system/patterns";
import { Typographie } from "@app/Components/Typographie";

import type { ArticlesApiResponse } from "@app/types";
import type { PropsWithChildren, ReactNode } from "react";

type HeroProps = PropsWithChildren & {
  article?: ArticlesApiResponse["data"][0];
  h1: ReactNode;
};

export const Hero = ({ children, article, h1 }: HeroProps) => {
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
          {children}
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
                {h1}
              </Typographie>
              {article?.attributes !== undefined && (
                <>
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
                </>
              )}
            </div>
            {article?.attributes !== undefined && (
              <>
                <Image
                  alt="todo"
                  src={`${article?.attributes.cover.data.attributes.url}`}
                  width={article?.attributes.cover.data.attributes.width}
                  height={article?.attributes.cover.data.attributes.height}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
