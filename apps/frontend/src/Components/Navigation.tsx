"use client";
import { type PropsWithChildren } from "react";
import { hstack } from "@style-system/patterns";

type NavigationProps = PropsWithChildren;

export const Navigation = ({ children }: NavigationProps) => {
  return (
    <>
      <nav
        className={hstack({
          w: "full",
          justifyContent: "center",
          bgColor: "primary",
          p: "2",
          position: "sticky",
          top: "0",
        })}>
        <p>Logo</p>
      </nav>
      {children}
    </>
  );
};
