export type Locale = "pt" | "en";
export type DocumentRecord = {
    id: string;
    category: "engineering" | "product" | "operations";
    date: string;
    title: Record<Locale, string>;
    summary: Record<Locale, string>;
    body: Record<Locale, string[]>;
};
export const categories = { engineering: { pt: "Engenharia", en: "Engineering" }, product: { pt: "Produto", en: "Product" }, operations: { pt: "Operações", en: "Operations" } };
export const documents: DocumentRecord[] = [
    { id: "interface-accessibility", category: "engineering", date: "2026-09-18", title: { pt: "Revisão de acessibilidade da interface", en: "Interface accessibility review" }, summary: { pt: "Critérios para foco, navegação por teclado e controles de toque.", en: "Criteria for focus, keyboard navigation and touch controls." }, body: { pt: ["Documento fictício para demonstrar consulta e organização de informações.", "Os controles devem ter nomes acessíveis e foco visível. A ordem de navegação deve acompanhar a leitura da página.", "Validar os estados vazio, carregando e erro, além da interação em telas pequenas."], en: ["Fictional document demonstrating information discovery and organization.", "Controls should have accessible names and visible focus. Navigation order should follow the reading order.", "Validate empty, loading and error states, as well as interaction on small screens."] } },
    { id: "release-checklist", category: "operations", date: "2026-08-12", title: { pt: "Checklist de publicação", en: "Release checklist" }, summary: { pt: "Verificações de build, rotas e rollback antes de publicar.", en: "Build, route and rollback checks before a release." }, body: { pt: ["Este exemplo não representa processos de clientes.", "Registrar o commit, executar os testes e conferir os fluxos principais em uma versão candidata.", "Após a publicação, verificar a versão entregue e manter um caminho de rollback."], en: ["This example does not represent client processes.", "Record the commit, run tests and review key flows in a release candidate.", "After deployment, verify the delivered version and keep a rollback path."] } },
    { id: "search-design", category: "product", date: "2026-06-24", title: { pt: "Pesquisa e filtros da biblioteca", en: "Library search and filters" }, summary: { pt: "Decisões de produto para encontrar documentos e compartilhar uma busca.", en: "Product decisions for finding documents and sharing a search." }, body: { pt: ["A pesquisa considera títulos e resumos, sem distinguir acentos ou maiúsculas.", "Categoria, ano e ordenação são preservados na URL. Isso permite compartilhar uma consulta e retornar ao mesmo estado.", "Quando não houver resultados, a interface oferece uma ação para limpar os filtros."], en: ["Search covers titles and summaries, ignoring accents and case.", "Category, year and sorting are preserved in the URL, allowing a query to be shared and restored.", "When there are no results, the interface provides an action to clear filters."] } },
    { id: "rendering-notes", category: "engineering", date: "2025-11-07", title: { pt: "Renderização e estado da aplicação", en: "Rendering and application state" }, summary: { pt: "Separação entre conteúdo no servidor e controles interativos.", en: "Separation of server content and interactive controls." }, body: { pt: ["Os documentos fictícios são definidos em um módulo tipado e não dependem de serviços externos.", "A listagem é calculada no servidor a partir dos parâmetros da URL. Os controles enviam um formulário GET.", "A preferência de tema é local; nenhum evento de marketing é coletado."], en: ["Fictional documents are defined in a typed module without external services.", "The server computes the listing from URL parameters. Controls submit a GET form.", "Theme preference is local; no marketing events are collected."] } },
    { id: "handoff-guide", category: "operations", date: "2025-07-16", title: { pt: "Guia de continuidade do trabalho", en: "Work handoff guide" }, summary: { pt: "Como registrar decisões, pendências e próximos passos.", en: "How to record decisions, outstanding work and next steps." }, body: { pt: ["Um registro útil informa o que foi verificado e o que permanece desconhecido.", "Cada pendência deve apontar uma próxima ação concreta, sem expor dados sensíveis.", "Este conteúdo é exclusivamente demonstrativo."], en: ["A useful record states what was verified and what remains unknown.", "Each outstanding item should identify a concrete next action without exposing sensitive data.", "This content is exclusively for demonstration."] } },
    { id: "mobile-review", category: "product", date: "2024-12-10", title: { pt: "Roteiro de revisão mobile", en: "Mobile review guide" }, summary: { pt: "Leitura, orientação horizontal e acesso aos controles em telas baixas.", en: "Reading, landscape orientation and controls on short screens." }, body: { pt: ["Conferir composição em 320, 390 e 768 pixels, com textos curtos e longos.", "A navegação deve continuar utilizável com zoom, teclado e movimento reduzido.", "Emulação auxilia a revisão, mas não substitui testes em dispositivos reais."], en: ["Review composition at 320, 390 and 768 pixels with short and long text.", "Navigation should remain usable with zoom, keyboard and reduced motion.", "Emulation supports review but does not replace testing on real devices."] } }
];
export type Filters = {
    q?: string;
    category?: string;
    year?: string;
    sort?: string;
};
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
export function filterDocuments(filters: Filters, locale: Locale) {
    const query = normalize((filters.q || "").trim());
    return documents.filter(d => (!query || normalize(d.title[locale] + " " + d.summary[locale]).includes(query)) && (!filters.category || d.category === filters.category) && (!filters.year || d.date.startsWith(filters.year)))
        .sort((a, b) => filters.sort === "title" ? a.title[locale].localeCompare(b.title[locale], locale) : filters.sort === "oldest" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
}
export function queryString(filters: Filters) { const p = new URLSearchParams(); for (const key of ["q", "category", "year", "sort"] as const)
    if (filters[key])
        p.set(key, filters[key]); return p.toString(); }
