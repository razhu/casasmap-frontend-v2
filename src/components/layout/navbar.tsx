"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Home, Search, Heart, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("nav");

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={getLocalePath("/")} className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">🏠 CasasMap</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href={getLocalePath("/")}>
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                {t("home")}
              </Button>
            </Link>
            <Link href={getLocalePath("/properties")}>
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4 mr-2" />
                {t("properties")}
              </Button>
            </Link>
            <Link href={getLocalePath("/favorites")}>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                {t("favorites")}
              </Button>
            </Link>
            <Link href={getLocalePath("/messages")}>
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                {t("messages")}
              </Button>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <Link href={getLocalePath("/login")}>
              <Button variant="outline" size="sm">
                {t("login")}
              </Button>
            </Link>
            <Link href={getLocalePath("/register")}>
              <Button size="sm">{t("register")}</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
