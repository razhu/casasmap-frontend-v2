"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function TopNav() {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b dark:border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={locale === "es" ? "/" : `/${locale}`}>
          <Button variant="ghost" size="sm">
            <Home className="h-4 w-4 mr-2" />
            {locale === "es" ? "Inicio" : "Home"}
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
