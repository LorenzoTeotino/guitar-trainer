import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guitar Trainer",
  description:
      "Applicazione per esercitarsi con accordi e ritmo sulla chitarra",
};

export default function LayoutPrincipale({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="it">
      <body>{children}</body>
      </html>
  );
}