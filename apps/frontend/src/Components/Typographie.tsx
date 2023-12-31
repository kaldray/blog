import { cva, cx } from "@style-system/css";
import type React from "react";
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

const typographieStyle = cva({
  base: {
    fontFamily: "montserrat",
  },
  variants: {
    tag: {
      h1: {
        fontSize: "7xl",
        letterSpacing: "widest",
      },
      h2: {
        fontSize: "3xl",
      },
      a: {
        fontSize: "20px",
        display: "inline-block",
        transform: "scale(1)",
        transition: "100ms linear",
        _active: {
          transform: "scale(1.1)",
        },
        _hover: {
          textDecoration: "underline",
        },
      },
      h3: { fontSize: "2xl" },
      h4: { fontSize: "large" },
      h5: { fontSize: "medium" },
      h6: { fontSize: "small" },
      label: { fontSize: "1.125rem" },
      p: { fontSize: "1.125rem" },
      span: { fontSize: "1.125rem" },
    },
  },
});

export type TypographieVariant = NonNullable<(typeof typographieStyle)["__type"]["tag"]>;

type TypographieProps<T extends TypographieVariant> = {
  tag: T;
} & ComponentPropsWithoutRef<T> &
  PropsWithChildren;

export const Typographie = <T extends TypographieVariant>({
  tag,
  className,
  ...props
}: TypographieProps<T>) => {
  const Tag = `${tag ?? "p"}`;
  const elmClassName = cx(typographieStyle({ tag }), className);
  return <Tag {...props} className={elmClassName} />;
};
