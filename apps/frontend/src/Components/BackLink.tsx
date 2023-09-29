"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { linkStyle } from "./NavLink";
import { css, cx } from "@style-system/css";

export const BackLink = () => {
  const router = useRouter();
  const className = cx(linkStyle(), css({ cursor: "pointer" }));

  return (
    <>
      <button className={className} type="button" onClick={() => router.back()}>
        Retour
      </button>
    </>
  );
};
