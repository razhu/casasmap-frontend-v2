"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function LoginRedirectPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // If already authenticated, redirect to home
    if (isAuthenticated) {
      const homePath = locale === "es" ? "/" : `/${locale}`;
      router.replace(homePath);
    } else {
      // Redirect to home with modal trigger
      const homePath =
        locale === "es" ? "/?auth=login" : `/${locale}?auth=login`;
      router.replace(homePath);
    }
  }, [isAuthenticated, router, locale]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">
          {locale === "es" ? "Redirigiendo..." : "Redirecting..."}
        </p>
      </div>
    </div>
  );
}
