"use client";

import { useParams } from "next/navigation";
import { useMyFavoritesQuery } from "@/lib/graphql/generated";
import { PropertyCard } from "@/components/properties/property-card";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Loader2, Heart } from "lucide-react";

function FavoritesPageContent() {
  const params = useParams();
  const locale = params.locale as string;

  const { data, loading, refetch } = useMyFavoritesQuery();

  const favorites = data?.myFavorites || [];

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
          {locale === "es" ? "Mis Favoritos" : "My Favorites"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "es"
            ? `${favorites.length} ${
                favorites.length === 1
                  ? "propiedad guardada"
                  : "propiedades guardadas"
              }`
            : `${favorites.length} ${
                favorites.length === 1 ? "saved property" : "saved properties"
              }`}
        </p>
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Heart className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            {locale === "es" ? "No tienes favoritos aún" : "No favorites yet"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {locale === "es"
              ? "Guarda propiedades que te interesen para verlas más tarde"
              : "Save properties you're interested in to view them later"}
          </p>
        </div>
      )}

      {/* Favorites Grid */}
      {favorites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites
            .filter((favorite) => favorite.property) // Filter out favorites with null properties
            .map((favorite) => (
              <div key={favorite.id} className="relative">
                <PropertyCard
                  property={favorite.property!}
                  onFavoriteChange={refetch}
                />
                {favorite.priceAlertEnabled && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-md z-10">
                    {locale === "es" ? "🔔 Alerta de precio" : "🔔 Price alert"}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <ProtectedRoute>
      <FavoritesPageContent />
    </ProtectedRoute>
  );
}
