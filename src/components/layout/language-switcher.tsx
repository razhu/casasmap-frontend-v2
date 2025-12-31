"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
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

  // Special handling for property slug pages
  const getLanguagePath = (langCode: string) => {
    // If on a property slug page, redirect to properties list instead
    if (basePath.startsWith("/inmuebles/")) {
      return langCode === "es" ? "/properties" : "/en/properties";
    }

    return langCode === "es" ? basePath : `/${langCode}${basePath}`;
  };

  const languages = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="font-semibold">
          {locale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} asChild>
            <Link
              href={getLanguagePath(lang.code)}
              className={`flex items-center gap-2 cursor-pointer ${
                locale === lang.code ? "bg-accent" : ""
              }`}
            >
              <span className="font-semibold">{lang.code.toUpperCase()}</span>
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
