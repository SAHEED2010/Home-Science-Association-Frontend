import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login";

    // 1. Get the authentication token from the user's cookies.
    // It must match the cookie name set in the login API route (`auth-token`).
    const token = request.cookies.get("auth-token")?.value || "";

    // 2. If the user is trying to access a protected path without a token,
    // redirect them to the login page. The `matcher` below ensures this
    // logic only runs for protected routes.
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    // 3. If the user is logged in and tries to access the login page,
    // redirect them to the admin dashboard.
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/admin", request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    // This matcher ensures the middleware runs on all protected dashboard routes
    // and the login page itself.
    matcher: ["/admin/:path*", "/teacher/:path*", "/student/:path*", "/parent/:path*", "/login"],
};