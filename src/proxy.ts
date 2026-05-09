import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_KEY = "auth-token";
const ROLE_KEY = "user-role";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value;
  const role = request.cookies.get(ROLE_KEY)?.value;

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

  if (isDashboardPage) {
    const validRoles = ["ADMIN", "MANAGER", "STAFF"];
    if (!role || !validRoles.includes(role)) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    const adminOnlyPaths = ["/dashboard/users", "/dashboard/analytics", "/dashboard/settings"];
    const managerOnlyPaths = ["/dashboard/reports", "/dashboard/staff-performance", "/dashboard/suppliers", "/dashboard/my-orders", "/dashboard/orders"];

    if (role === "STAFF" && adminOnlyPaths.some((p) => request.nextUrl.pathname.startsWith(p))) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (role === "STAFF" && managerOnlyPaths.some((p) => request.nextUrl.pathname.startsWith(p))) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (role === "MANAGER" && adminOnlyPaths.some((p) => request.nextUrl.pathname.startsWith(p))) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
