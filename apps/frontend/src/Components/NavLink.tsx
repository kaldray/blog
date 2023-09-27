"use client";

import React, { type ComponentPropsWithRef, type PropsWithChildren, forwardRef } from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { type RecipeVariantProps, cva, cx } from "@style-system/css";

type NavLinkProps = {} & LinkProps & PropsWithChildren & LinkVariants & ComponentPropsWithRef<"a">;
type LinkVariants = RecipeVariantProps<typeof linkStyle>;

const linkStyle = cva({
  base: {
    fontFamily: "montserrat",
    fontSize: "1.125rem",
    transform: "scale(1)",
    transition: "100ms linear",
    _active: {
      textDecoration: "underline",
    },
    _hover: {
      transform: "scale(1.2)",
    },
  },
  variants: {
    state: {
      active: {
        textDecorationLine: "underline",
        textDecorationColor: "accent",
        textDecorationThickness: "2px",
      },
      default: { textDecoration: "none" },
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export const NavLink = forwardRef(function Render(
  { children, href, className, ...props }: NavLinkProps,
  ref,
) {
  const pathname = usePathname();
  const elmClass = cx(linkStyle({ state: pathname === href ? "active" : "default" }), className);
  return (
    <>
      <Link href={href} className={elmClass} {...props}>
        {children}
      </Link>
    </>
  );
});
