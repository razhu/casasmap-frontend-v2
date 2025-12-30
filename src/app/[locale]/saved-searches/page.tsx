"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useMySavedSearchesQuery,
  useDeleteSavedSearchMutation,
  useToggleSavedSearchAlertsMutation,
} from "@/lib/graphql/generated";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Loader2, Bookmark, Bell, BellOff, Trash2, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

function SavedSearchesPageContent() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const { data, loading, refetch } = useMySavedSearchesQuery();
  const [deleteSavedSearch] = useDeleteSavedSearchMutation();
  const [toggleAlerts] = useToggleSavedSearchAlertsMutation();

  const savedSearches = data?.mySavedSearches || [];

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        locale === "es"
          ? "¿Estás seguro de eliminar esta búsqueda?"
          : "Are you sure you want to delete this search?"
      )
    ) {
      return;
    }

    try {
      await deleteSavedSearch({ variables: { id } });
      await refetch();
    } catch (error) {
      console.error("Error deleting saved search:", error);
    }
  };

  const handleToggleAlerts = async (id: string, enabled: boolean) => {
    try {
      await toggleAlerts({ variables: { id, enabled } });
      await refetch();
    } catch (error) {
      console.error("Error toggling alerts:", error);
    }
  };

  const handleRunSearch = (search: any) => {
    const params = new URLSearchParams();

    if (search.query) params.append("q", search.query);
    if (search.minPrice) params.append("minPrice", search.minPrice.toString());
    if (search.maxPrice) params.append("maxPrice", search.maxPrice.toString());
    if (search.bedrooms) params.append("bedrooms", search.bedrooms.toString());
    if (search.bathrooms)
      params.append("bathrooms", search.bathrooms.toString());
    if (search.propertyTypeId)
      params.append("propertyTypeId", search.propertyTypeId.toString());
    if (search.dealTypeId)
      params.append("dealTypeId", search.dealTypeId.toString());
    if (search.cityId) params.append("cityId", search.cityId.toString());
    if (search.zoneId) params.append("zoneId", search.zoneId.toString());

    router.push(getLocalePath(`/properties?${params.toString()}`));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      locale === "es" ? "es-BO" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  const getSearchSummary = (search: any) => {
    const parts: string[] = [];

    if (search.query) parts.push(`"${search.query}"`);
    if (search.minPrice || search.maxPrice) {
      const priceRange = [
        search.minPrice ? `$${search.minPrice.toLocaleString()}` : "",
        search.maxPrice ? `$${search.maxPrice.toLocaleString()}` : "",
      ]
        .filter(Boolean)
        .join(" - ");
      parts.push(priceRange);
    }
    if (search.bedrooms)
      parts.push(`${search.bedrooms} ${locale === "es" ? "hab" : "bed"}`);
    if (search.bathrooms)
      parts.push(`${search.bathrooms} ${locale === "es" ? "baños" : "bath"}`);

    return parts.length > 0
      ? parts.join(" • ")
      : locale === "es"
      ? "Todas las propiedades"
      : "All properties";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {locale === "es" ? "Búsquedas Guardadas" : "Saved Searches"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "es"
            ? `${savedSearches.length} ${
                savedSearches.length === 1
                  ? "búsqueda guardada"
                  : "búsquedas guardadas"
              }`
            : `${savedSearches.length} ${
                savedSearches.length === 1 ? "saved search" : "saved searches"
              }`}
        </p>
      </div>

      {/* Empty State */}
      {savedSearches.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Bookmark className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            {locale === "es"
              ? "No tienes búsquedas guardadas"
              : "No saved searches yet"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {locale === "es"
              ? "Guarda tus búsquedas favoritas para recibir alertas de nuevas propiedades"
              : "Save your favorite searches to receive alerts for new properties"}
          </p>
          <Button onClick={() => router.push(getLocalePath("/properties"))}>
            <Search className="h-4 w-4 mr-2" />
            {locale === "es" ? "Buscar propiedades" : "Search properties"}
          </Button>
        </div>
      )}

      {/* Saved Searches List */}
      {savedSearches.length > 0 && (
        <div className="space-y-4">
          {savedSearches.map((search) => (
            <Card key={search.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">
                      {search.name}
                    </CardTitle>
                    <CardDescription>
                      {getSearchSummary(search)}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={search.alertsEnabled ? "default" : "secondary"}
                  >
                    {search.alertsEnabled ? (
                      <>
                        <Bell className="h-3 w-3 mr-1" />
                        {locale === "es" ? "Alertas activas" : "Alerts on"}
                      </>
                    ) : (
                      <>
                        <BellOff className="h-3 w-3 mr-1" />
                        {locale === "es" ? "Sin alertas" : "Alerts off"}
                      </>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`alerts-${search.id}`} className="text-sm">
                      {locale === "es" ? "Alertas por email" : "Email alerts"}
                    </Label>
                    <Switch
                      id={`alerts-${search.id}`}
                      checked={search.alertsEnabled}
                      onCheckedChange={(enabled) =>
                        handleToggleAlerts(search.id, enabled)
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {locale === "es" ? "Guardado:" : "Saved:"}{" "}
                    {formatDate(search.createdAt)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleRunSearch(search)}
                    className="flex-1"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    {locale === "es" ? "Ejecutar búsqueda" : "Run search"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(search.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SavedSearchesPage() {
  return (
    <ProtectedRoute>
      <SavedSearchesPageContent />
    </ProtectedRoute>
  );
}
