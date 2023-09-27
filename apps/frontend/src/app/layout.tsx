import "@style/globals.css";
import type { Metadata } from "next";

import { MontserratFont } from "@app/styles/font";
import { css } from "@style-system/css";
import { MyRootLayout } from "@app/Components/MyRootLayout";

export const metadata: Metadata = {
  title: "Blog",
  description: "Le blog d'un dev.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${MontserratFont.variable}`}>
        <MyRootLayout>
          <main className={css({ height: "dvh" })}>{children}</main>
        </MyRootLayout>
      </body>
    </html>
  );
}
