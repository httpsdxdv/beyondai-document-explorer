import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
 const headers = new Headers(request.headers);
 headers.set("x-document-locale",request.nextUrl.pathname.startsWith("/en")?"en":"pt-BR");
 return NextResponse.next({request:{headers}});
}
export const config={matcher:["/pt/:path*","/en/:path*"]};
