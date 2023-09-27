"use client";

import { hstack } from "@style-system/patterns";
import { NavLink } from "./NavLink";

export const Navigation = () => {
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
        <NavLink href={"/"}>Accueil</NavLink>
      </nav>
    </>
  );
};
