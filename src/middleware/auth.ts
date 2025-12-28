import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = [
  "/profile",
  "/properties/create",
  "/properties/edit",
  "/favorites",
  "/messages",
  "/dashboard",
];

// Routes that should redirect to home if already authenticated
const authRoutes = ["/login", "/register"];

export function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from localStorage (we'll need to check this differently)
  // For now, we'll check if the auth-storage exists in cookies
  const authStorage = request.cookies.get("auth-storage");

  let isAuthenticated = false;
  if (authStorage) {
    try {
      const authData = JSON.parse(authStorage.value);
      isAuthenticated = authData?.state?.isAuthenticated || false;
    } catch (e) {
      isAuthenticated = false;
    }
  }

  // Remove locale prefix for route matching
  const pathWithoutLocale = pathname.replace(/^\/(en|es)/, "") || "/";

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );

  // Check if route is auth route (login/register)
  const isAuthRoute = authRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    const locale = pathname.startsWith("/en") ? "/en" : "";
    return NextResponse.redirect(new URL(`${locale}/login`, request.url));
  }

  // Redirect to home if accessing auth routes while authenticated
  if (isAuthRoute && isAuthenticated) {
    const locale = pathname.startsWith("/en") ? "/en" : "";
    return NextResponse.redirect(new URL(`${locale}/`, request.url));
  }

  return NextResponse.next();
}
