import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
export const metadata: Metadata = { title: "BeyondAI / Document Explorer", description: "React, Next.js and TypeScript demonstration using fictional documents.", icons: { icon: "/icon.svg" } };
export default async function Layout({ children }: {
    children: React.ReactNode;
}) {
    const locale = (await headers()).get("x-document-locale") || "pt-BR";
    return <html lang={locale} suppressHydrationWarning>
    <body>{children}</body>
    </html>;
}
