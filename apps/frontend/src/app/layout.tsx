import "@style/globals.css";
import type { Metadata } from "next";
import { MontserratFont } from "@app/styles/font";
import { Navigation } from "@app/Components/Navigation";
import { css } from "@style-system/css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Je m'amuse un peu !",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${MontserratFont.variable}`}>
        <Navigation>
          <main className={css({ height: "dvh" })}>{children}</main>
        </Navigation>
      </body>
    </html>
  );
}
