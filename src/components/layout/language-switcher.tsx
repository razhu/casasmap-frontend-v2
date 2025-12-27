"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;

  // Remove locale from pathname to get the base path
  const getPathWithoutLocale = () => {
    if (locale === "en" && pathname.startsWith("/en")) {
      return pathname.slice(3) || "/";
    }
    return pathname;
  };

  const basePath = getPathWithoutLocale();

  const languages = [
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} asChild>
            <Link
              href={lang.code === "es" ? basePath : `/${lang.code}${basePath}`}
              className={`flex items-center gap-2 cursor-pointer ${
                locale === lang.code ? "bg-accent" : ""
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
              {locale === lang.code && (
                <span className="ml-auto text-xs text-muted-foreground">✓</span>
              )}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
