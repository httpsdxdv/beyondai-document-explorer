import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Globe } from "lucide-react";
import { Preferences } from "./preferences";
export function Header({ locale, alternate }: {
    locale: "pt" | "en";
    alternate: string;
}) {
    const en = locale === "en";
    return <>
    <a className="skip" href="#content">{en ? "Skip to content" : "Pular para o conteúdo"}</a>
    <header className="header">
    <Link className="brand" href={`/${locale}`}>
    <span>
    <Image src="/logo.svg" width={140} height={37} alt="BeyondAI" priority/>
    <small>/ Document Explorer</small>
    </span>
    </Link>
    <nav aria-label={en ? "Language and appearance" : "Idioma e aparência"}>
    <Link className="icon-button" href={alternate} hrefLang={en ? "pt-BR" : "en"} aria-label={en ? "Ler em português" : "Read in English"}>
    <Globe size={18}/>{en ? "PT" : "EN"}</Link>
    <Preferences english={en}/>
    <a className="portfolio" href={`https://beyondai.credipesca.com/${en ? "en/" : ""}henrique`}>{en ? "Portfolio" : "Portfólio"}<ArrowUpRight size={16}/>
    </a>
    </nav>
    </header>
    </>;
}
