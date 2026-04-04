"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePropertiesQuery } from "@/lib/graphql/generated";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyCardSkeleton } from "@/components/ui/property-card-skeleton";
import { HomepageSearch } from "@/components/properties/homepage-search";
import { PopularCities } from "@/components/properties/popular-cities";
import { AuthModal } from "@/components/auth/auth-modal";
import { Home, MapPin, Users } from "lucide-react";

export default function HomePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;
  const t = useTranslations("home");
  const tProps = useTranslations("properties");

  // Handle auth modal from URL params
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">(
    "login",
  );

  useEffect(() => {
    const authParam = searchParams.get("auth");
    if (authParam === "login" || authParam === "register") {
      setAuthModalMode(authParam);
      setAuthModalOpen(true);
    }
  }, [searchParams]);

  // Fetch featured properties (first 8)
  const { data, loading } = usePropertiesQuery({
    variables: { page: 1, limit: 8 },
  });

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const properties = data?.properties?.data || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Width, Minimal */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />

        <div className="relative container mx-auto px-4 py-20 sm:py-28 md:py-36">
          {/* Hero Content */}
          <div className="text-center space-y-6 mb-12 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              {t("hero.title")}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Search Component */}
          <HomepageSearch />
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="bg-white dark:bg-gray-900 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {tProps("featured")}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {locale === "es"
                  ? "Descubre las mejores propiedades disponibles"
                  : "Discover the best properties available"}
              </p>
            </div>
            <Link href={getLocalePath("/properties")}>
              <Button variant="outline" size="lg" className="hidden sm:flex">
                {tProps("viewAll")}
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              {locale === "es"
                ? "No hay propiedades disponibles"
                : "No properties available"}
            </div>
          )}

          <div className="text-center mt-10 sm:hidden">
            <Link href={getLocalePath("/properties")}>
              <Button variant="outline" size="lg">
                {tProps("viewAll")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Cities Section */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-16 sm:py-20">
        <PopularCities />
      </section>

      {/* Features Section - Redesigned */}
      <section className="bg-white dark:bg-gray-900 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {locale === "es"
                ? "¿Por qué elegir CasasMap?"
                : "Why choose CasasMap?"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {locale === "es"
                ? "La plataforma más completa para encontrar tu hogar ideal"
                : "The most complete platform to find your ideal home"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Home className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t("features.properties.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("features.properties.description")}
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t("features.maps.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("features.maps.description")}
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t("features.agents.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("features.agents.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Simplified */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-950 py-16 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {t("cta.title")}
            </h2>
            <p className="text-xl text-blue-100">{t("cta.subtitle")}</p>
            <Button
              size="lg"
              variant="secondary"
              className="h-14 px-8 text-lg font-semibold"
              onClick={() => {
                setAuthModalMode("register");
                setAuthModalOpen(true);
              }}
            >
              {t("cta.button")}
            </Button>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultMode={authModalMode}
      />
    </div>
  );
}
