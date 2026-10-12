import { NextResponse, type NextRequest } from "next/server";
import { documents } from "./lib/documents";
export function proxy(request: NextRequest) {
    const headers = new Headers(request.headers);
    headers.set("x-document-locale", request.nextUrl.pathname.startsWith("/en") ? "en" : "pt-BR");
    const documentPath = request.nextUrl.pathname.match(/^\/(pt|en)\/documents\/([^/]+)\/?$/);
    if (documentPath && !documents.some(document => document.id === documentPath[2])) {
        return NextResponse.rewrite(new URL("/document-not-found", request.url), { status: 404, request: { headers } });
    }
    return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ["/pt/:path*", "/en/:path*"] };
