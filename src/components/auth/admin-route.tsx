"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Loader2 } from "lucide-react";

interface AdminRouteProps {
    children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
    const router = useRouter();
    const params = useParams();
    const locale = params.locale as string;
    const { user, isAuthenticated, _hasHydrated } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (_hasHydrated) {
            setIsChecking(false);
            if (!isAuthenticated) {
                const redirectPath = locale === "es" ? "/login" : `/${locale}/login`;
                router.push(redirectPath);
            } else if (user?.role?.name !== "Super Admin" && user?.role?.name !== "Admin") {
                // Redirect to home if not admin
                const redirectPath = locale === "es" ? "/" : `/${locale}`;
                router.push(redirectPath);
            }
        }
    }, [isAuthenticated, user, _hasHydrated, router, locale]);

    if (isChecking || !_hasHydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated || (user?.role?.name !== "Super Admin" && user?.role?.name !== "Admin")) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}
