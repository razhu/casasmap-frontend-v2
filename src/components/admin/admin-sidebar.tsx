"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  ArrowLeft,
  FileText,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as string) || "es";

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const isActive = (href: string) => {
    const fullPath = getLocalePath(href);
    return pathname === fullPath;
  };

  const menuItems = [
    {
      href: "/admin",
      icon: LayoutDashboard,
      label: locale === "es" ? "Dashboard" : "Dashboard",
    },
    {
      href: "/admin/properties",
      icon: Building2,
      label: locale === "es" ? "Propiedades" : "Properties",
    },
    {
      href: "/admin/users",
      icon: Users,
      label: locale === "es" ? "Usuarios" : "Users",
    },
    {
      href: "/admin/payments",
      icon: CreditCard,
      label: locale === "es" ? "Pagos" : "Payments",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      label: locale === "es" ? "Configuración" : "Settings",
    },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold">
          {locale === "es" ? "Administración" : "Admin Panel"}
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.href} href={getLocalePath(item.href)}>
              <Button
                variant={active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  active && "bg-primary text-primary-foreground"
                )}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Link href={getLocalePath("/")}>
          <Button variant="outline" className="w-full justify-start">
            <ArrowLeft className="h-4 w-4 mr-3" />
            {locale === "es" ? "Volver al Sitio" : "Back to Site"}
          </Button>
        </Link>
      </div>
    </aside>
  );
}
