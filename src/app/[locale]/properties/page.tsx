"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { useSearchPropertiesQuery } from "@/lib/graphql/generated";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyFilters } from "@/components/properties/property-filters";
import { SaveSearchButton } from "@/components/properties/save-search-button";
import { Button } from "@/components/ui/button";

export default function PropertiesPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;
  const t = useTranslations("properties");
  const [page, setPage] = useState(1);
  const limit = 12;

  const [filters, setFilters] = useState<{
    query?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    dealTypeId?: number;
  }>({});

  // Initialize filters from URL params
  useEffect(() => {
    const urlQuery = searchParams.get("q");
    const urlDealType = searchParams.get("dealType");

    if (urlQuery || urlDealType) {
      setFilters({
        query: urlQuery || undefined,
        dealTypeId: urlDealType ? parseInt(urlDealType) : undefined,
      });
    }
  }, [searchParams]);

  const { data, loading, error } = useSearchPropertiesQuery({
    variables: {
      query: filters.query,
      filters: {
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        bedrooms: filters.bedrooms,
        bathrooms: filters.bathrooms,
        dealTypeId: filters.dealTypeId,
      },
      page,
      limit,
    },
  });

  const handleSearch = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page on new search
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  const properties = data?.searchProperties?.data || [];
  const meta = data?.searchProperties?.meta;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>

          {/* Search and Filters */}
          <PropertyFilters onSearch={handleSearch} />

          <div className="flex items-center justify-between mt-4">
            {meta && (
              <p className="text-muted-foreground">
                {meta.total}{" "}
                {locale === "es"
                  ? "propiedades encontradas"
                  : "properties found"}
              </p>
            )}
            {(filters.query ||
              filters.minPrice ||
              filters.maxPrice ||
              filters.bedrooms ||
              filters.bathrooms ||
              filters.dealTypeId) && (
              <SaveSearchButton filters={filters} locale={locale} />
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {locale === "es"
                ? "No se encontraron propiedades"
                : "No properties found"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || loading}
                >
                  {locale === "es" ? "Anterior" : "Previous"}
                </Button>
                <div className="flex items-center px-4">
                  <span className="text-sm">
                    {locale === "es" ? "Página" : "Page"} {page}{" "}
                    {locale === "es" ? "de" : "of"} {meta.totalPages}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    setPage((p) => Math.min(meta.totalPages, p + 1))
                  }
                  disabled={page === meta.totalPages || loading}
                >
                  {locale === "es" ? "Siguiente" : "Next"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
