import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed", // Only show prefix for non-default locales
  localeDetection: false, // Don't auto-detect from browser
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
