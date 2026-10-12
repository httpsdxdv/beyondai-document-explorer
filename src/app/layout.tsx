import type { Metadata } from "next";
import { headers } from "next/headers";
import { DM_Sans, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const heading = Outfit({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-heading" });
const themeInit = `(function(){try{var t=localStorage.getItem('beyondai-theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}})()`;
export const metadata: Metadata = { title: "BeyondAI / Document Explorer", description: "React, Next.js and TypeScript demonstration using fictional documents.", icons: { icon: "/icon.svg" } };
export default async function Layout({ children }: {
    children: React.ReactNode;
}) {
    const locale = (await headers()).get("x-document-locale") || "pt-BR";
    return <html lang={locale} suppressHydrationWarning>
    <body className={`${body.variable} ${heading.variable}`}><Script id="beyondai-theme" strategy="beforeInteractive">{themeInit}</Script>{children}</body>
    </html>;
}
