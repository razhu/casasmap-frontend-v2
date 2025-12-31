"use client";

import { useMyPropertiesQuery } from "@/lib/graphql/generated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { BarChart3, Eye, MousePointerClick, Heart } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";

export default function AnalyticsOverviewPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const { data, loading } = useMyPropertiesQuery({
    variables: {
      page: 1,
      limit: 100,
    },
  });

  if (loading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  const properties = data?.myProperties.data || [];

  if (properties.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Estadísticas</h1>
        <Card>
          <CardContent className="pt-6 text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">
              No tienes propiedades publicadas
            </p>
            <Button onClick={() => router.push("/properties/new")}>
              Publicar Propiedad
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Estadísticas</h1>
        <p className="text-muted-foreground">Rendimiento de tus propiedades</p>
      </div>

      {/* Properties Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Card
            key={property.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push(`/dashboard/analytics/${property.id}`)}
          >
            <CardHeader>
              <CardTitle className="text-lg line-clamp-2">
                {property.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {property.city?.name} • {property.propertyType?.name}
              </p>
            </CardHeader>
            <CardContent>
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center">
                  <Eye className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Vistas</p>
                  <p className="text-sm font-bold">
                    {property.analytics?.views || 0}
                  </p>
                </div>
                <div className="text-center">
                  <MousePointerClick className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Clics</p>
                  <p className="text-sm font-bold">
                    {property.analytics?.clicks || 0}
                  </p>
                </div>
                <div className="text-center">
                  <Heart className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Favoritos</p>
                  <p className="text-sm font-bold">
                    {property.analytics?.favorites || 0}
                  </p>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                Ver Detalles
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
