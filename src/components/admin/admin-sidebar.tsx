"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
    LayoutDashboard,
    Building2,
    Users,
    Settings,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";

export function AdminSidebar() {
    const pathname = usePathname();
    const t = useTranslations("admin.nav");
    const { logout } = useAuthStore();

    // Extract locale from pathname (e.g. /es/admin -> es)
    const locale = pathname.split("/")[1];

    const links = [
        {
            href: `/${locale}/admin`,
            label: t("dashboard"),
            icon: LayoutDashboard,
            exact: true,
        },
        {
            href: `/${locale}/admin/properties`,
            label: t("properties"),
            icon: Building2,
        },
        {
            href: `/${locale}/admin/users`,
            label: t("users"),
            icon: Users,
        },
        {
            href: `/${locale}/admin/settings`,
            label: t("settings"),
            icon: Settings,
        },
    ];

    return (
        <div className="flex bg-gray-900 text-white min-h-screen w-64 flex-col">
            <div className="p-6 border-b border-gray-800">
                <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>

            <div className="flex-1 py-6 px-4 space-y-2">
                {links.map((link) => {
                    const isActive = link.exact
                        ? pathname === link.href
                        : pathname.startsWith(link.href);

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-gray-800 text-gray-400 hover:text-white"
                            )}
                        >
                            <link.icon className="h-5 w-5" />
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-gray-800">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800 gap-3"
                    onClick={() => logout()}
                >
                    <LogOut className="h-5 w-5" />
                    <span>{t("logout")}</span>
                </Button>
            </div>
        </div>
    );
}
