import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { categories, documents, queryString, type Locale, type Filters } from "@/lib/documents";
export default async function Detail({params,searchParams}:{params:Promise<{locale:Locale;id:string}>;searchParams:Promise<Record<string,string|string[]|undefined>>}) {
 const {locale,id}=await params;const d=documents.find(item=>item.id===id);if(!d)notFound();const en=locale==="en";const raw=await searchParams;const filters:Filters={};for(const key of ["q","category","year","sort"] as const)if(typeof raw[key]==="string")filters[key]=raw[key];const query=queryString(filters);const suffix=query?"?"+query:"";
 return <><Header locale={locale} alternate={`/${en?"pt":"en"}/documents/${id}${suffix}`}/><main id="content"><Link className="back" href={`/${locale}${suffix}`}><ArrowLeft size={18}/>{en?"Back to results":"Voltar aos resultados"}</Link><article className="document"><p className="eyebrow">{categories[d.category][locale]} / {d.date}</p><h1>{d.title[locale]}</h1><p className="lead">{d.summary[locale]}</p><div className="document-body">{d.body[locale].map(p=><p key={p}>{p}</p>)}</div><aside className="notice">{en?"Fictional sample. No confidential professional material is used.":"Exemplo fictício. Nenhum material profissional confidencial é utilizado."}</aside></article></main></>;
}
