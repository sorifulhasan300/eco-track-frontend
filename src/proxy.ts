import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";

  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardPage && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && token) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
