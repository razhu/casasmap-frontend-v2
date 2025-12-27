"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Home, Search, Heart, MessageSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const navLinks = [
    { href: "/", icon: Home, label: t("home") },
    { href: "/properties", icon: Search, label: t("properties") },
    { href: "/favorites", icon: Heart, label: t("favorites") },
    { href: "/messages", icon: MessageSquare, label: t("messages") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={getLocalePath("/")} className="flex items-center gap-2">
            <div className="text-xl sm:text-2xl font-bold text-primary">
              🏠 CasasMap
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={getLocalePath(link.href)}>
                  <Button variant="ghost" size="sm">
                    <Icon className="h-4 w-4 mr-2" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions - Desktop */}
          <div className="hidden md:flex items-center gap-2">
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

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">🏠 CasasMap</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {/* Mobile Navigation Links */}
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={getLocalePath(link.href)}
                        onClick={() => setOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          size="lg"
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          {link.label}
                        </Button>
                      </Link>
                    );
                  })}

                  {/* Mobile Auth Buttons */}
                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                    <Link
                      href={getLocalePath("/login")}
                      onClick={() => setOpen(false)}
                    >
                      <Button variant="outline" className="w-full" size="lg">
                        {t("login")}
                      </Button>
                    </Link>
                    <Link
                      href={getLocalePath("/register")}
                      onClick={() => setOpen(false)}
                    >
                      <Button className="w-full" size="lg">
                        {t("register")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
