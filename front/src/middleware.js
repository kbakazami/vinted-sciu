import {withAuth} from "next-auth/middleware";

export function middleware(request) {
    // if(/\/[a-z]{2}\/account.*/.test(request.nextUrl.pathname)) {
    if(/\/*\/account.*/.test(request.nextUrl.pathname)) {
        return withAuth(request);
    }
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}