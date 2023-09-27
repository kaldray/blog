import React, { PropsWithChildren } from "react";
import { Navigation } from "./Navigation";

type RootLayoutProps = PropsWithChildren;

export const MyRootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};
