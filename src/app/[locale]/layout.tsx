import { notFound } from "next/navigation";
export default async function Layout({ children, params }: {
    children: React.ReactNode;
    params: Promise<{
        locale: string;
    }>;
}) { const { locale } = await params; if (locale !== "pt" && locale !== "en")
    notFound(); return <div lang={locale === "pt" ? "pt-BR" : "en"}>{children}</div>; }
