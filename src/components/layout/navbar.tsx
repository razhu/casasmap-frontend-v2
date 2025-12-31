"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Search,
  Heart,
  MessageSquare,
  User,
  LogOut,
  Settings,
  Menu,
  Plus,
  Bookmark,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { NotificationBell } from "./notification-bell";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthStore } from "@/store/auth";

export function Navbar() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const navLinks = [
    {
      href: "/properties",
      icon: Search,
      label: t("properties"),
      requiresAuth: false,
    },
    {
      href: "/favorites",
      icon: Heart,
      label: t("favorites"),
      requiresAuth: true,
    },
    {
      href: "/saved-searches",
      icon: Bookmark,
      label: locale === "es" ? "Búsquedas" : "Searches",
      requiresAuth: true,
    },
    {
      href: "/messages",
      icon: MessageSquare,
      label: locale === "es" ? "Consultas" : "Inquiries",
      requiresAuth: true,
    },
    {
      href: "/dashboard/analytics",
      icon: BarChart3,
      label: locale === "es" ? "Estadísticas" : "Analytics",
      requiresAuth: true,
    },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = getLocalePath("/");
  };

  const getUserInitials = () => {
    if (user?.profile?.firstName && user?.profile?.lastName) {
      return `${user.profile.firstName[0]}${user.profile.lastName[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  };

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
            {navLinks
              .filter((link) => !link.requiresAuth || isAuthenticated)
              .map((link) => {
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
            <NotificationBell locale={locale} />

            {/* Publish Property Button - Always Visible */}
            <Link href={getLocalePath("/properties/new")}>
              <Button size="sm" className="font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                {locale === "es" ? "Publicar" : "Publish"}
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user?.profile?.pictureUrl || ""}
                        alt={user?.email || ""}
                      />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.profile?.firstName} {user?.profile?.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={getLocalePath("/profile")}
                      className="cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>{t("profile")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={getLocalePath("/dashboard/analytics")}
                      className="cursor-pointer"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>
                        {locale === "es" ? "Estadísticas" : "Analytics"}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={getLocalePath("/profile/edit")}
                      className="cursor-pointer"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>
                        {locale === "es" ? "Configuración" : "Settings"}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href={getLocalePath("/login")}>
                  <Button variant="outline" size="sm">
                    {t("login")}
                  </Button>
                </Link>
                <Link href={getLocalePath("/register")}>
                  <Button size="sm">{t("register")}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <NotificationBell locale={locale} />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isAuthenticated ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profile?.pictureUrl || ""} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>
                    {isAuthenticated ? (
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user?.profile?.pictureUrl || ""} />
                          <AvatarFallback>{getUserInitials()}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <p className="text-sm">
                            {user?.profile?.firstName} {user?.profile?.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    ) : (
                      "Menu"
                    )}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {/* Publish Property Button - Mobile (Always Visible) */}
                  <Link
                    href={getLocalePath("/properties/new")}
                    onClick={() => setOpen(false)}
                  >
                    <Button className="w-full" size="lg">
                      <Plus className="h-5 w-5 mr-2" />
                      {locale === "es"
                        ? "Publicar Propiedad"
                        : "Publish Property"}
                    </Button>
                  </Link>

                  {navLinks
                    .filter((link) => !link.requiresAuth || isAuthenticated)
                    .map((link) => {
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
                  <div className="border-t pt-4 mt-4">
                    {isAuthenticated ? (
                      <>
                        {/* Publish Property Button - Mobile */}
                        <Link
                          href={getLocalePath("/properties/new")}
                          onClick={() => setOpen(false)}
                        >
                          <Button className="w-full mb-3" size="lg">
                            <Plus className="h-5 w-5 mr-2" />
                            {locale === "es"
                              ? "Publicar Propiedad"
                              : "Publish Property"}
                          </Button>
                        </Link>

                        <Link
                          href={getLocalePath("/profile")}
                          onClick={() => setOpen(false)}
                        >
                          <Button variant="outline" className="w-full mb-2">
                            <User className="mr-2 h-4 w-4" />
                            {t("profile")}
                          </Button>
                        </Link>
                        <Link
                          href={getLocalePath("/dashboard/analytics")}
                          onClick={() => setOpen(false)}
                        >
                          <Button variant="outline" className="w-full mb-2">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            {locale === "es" ? "Estadísticas" : "Analytics"}
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          {t("logout")}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link
                          href={getLocalePath("/login")}
                          onClick={() => setOpen(false)}
                        >
                          <Button variant="outline" className="w-full mb-2">
                            {t("login")}
                          </Button>
                        </Link>
                        <Link
                          href={getLocalePath("/register")}
                          onClick={() => setOpen(false)}
                        >
                          <Button className="w-full">{t("register")}</Button>
                        </Link>
                      </>
                    )}
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
