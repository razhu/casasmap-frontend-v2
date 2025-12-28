"use client";

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
import { HomepageSearch } from "@/components/properties/homepage-search";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("home");
  const tProps = useTranslations("properties");

  // Fetch featured properties (first 8)
  const { data, loading } = usePropertiesQuery({
    variables: { page: 1, limit: 8 },
  });

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const properties = data?.properties?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="text-center space-y-4 sm:space-y-6 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t("hero.title")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Homepage Search */}
        <HomepageSearch />
      </section>

      {/* Featured Properties Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {tProps("featured")}
          </h2>
          <Link href={getLocalePath("/properties")}>
            <Button variant="outline">{tProps("viewAll")}</Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            {locale === "es"
              ? "No hay propiedades disponibles"
              : "No properties available"}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>🏠 {t("features.properties.title")}</CardTitle>
              <CardDescription>
                {t("features.properties.description")}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>🗺️ {t("features.maps.title")}</CardTitle>
              <CardDescription>
                {t("features.maps.description")}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>⭐ {t("features.agents.title")}</CardTitle>
              <CardDescription>
                {t("features.agents.description")}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">
              {t("cta.title")}
            </CardTitle>
            <CardDescription className="text-base sm:text-lg">
              {t("cta.subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={getLocalePath("/register")}>
              <Button size="lg" className="w-full sm:w-auto">
                {t("cta.button")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
