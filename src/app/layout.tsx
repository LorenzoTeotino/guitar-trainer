import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Guitar Trainer",
    description:
        "Applicazione per esercitarsi con accordi e ritmo sulla chitarra",

    applicationName: "Guitar Trainer",

    appleWebApp: {
        capable: true,
        title: "Guitar Trainer",
        statusBarStyle: "black-translucent",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#8b5cf6",
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