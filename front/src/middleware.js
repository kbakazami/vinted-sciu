import {withAuth} from "next-auth/middleware";

export function middleware(request) {
    if(/.*(account)+.*/.test(request.nextUrl.pathname)) {
        return withAuth(request);
    }

    if(/.*(add)+.*/.test(request.nextUrl.pathname)) {
        return withAuth(request);
    }

    if(/.*(edit)+.*/.test(request.nextUrl.pathname)) {
        return withAuth(request);
    }
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}