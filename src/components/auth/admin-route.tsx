"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || "es";
  const { user, isAuthenticated, _hasHydrated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Wait for hydration
    if (!_hasHydrated) {
      return;
    }

    setIsChecking(false);

    if (!isAuthenticated) {
      router.push(locale === "es" ? "/login" : `/${locale}/login`);
    }
  }, [isAuthenticated, _hasHydrated, router, locale]);

  // Show loading while hydrating or checking
  if (!_hasHydrated || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="h-96 w-full max-w-4xl" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Check if user is admin or super admin
  const isAdmin =
    user?.role?.name === "Admin" || user?.role?.name === "Super Admin";

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {locale === "es"
              ? "No tienes permisos para acceder a esta página"
              : "You don't have permission to access this page"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}
