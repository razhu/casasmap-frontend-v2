"use client";

import { useParams, useRouter } from "next/navigation";
import { usePropertyQuery } from "@/lib/graphql/generated";
import { PropertyAnalyticsDashboard } from "@/components/analytics/property-analytics-dashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.propertyId as string;

  const { data, loading } = usePropertyQuery({
    variables: { id: propertyId },
  });

  if (loading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  const property = data?.property;

  if (!property) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-center text-muted-foreground">
          Propiedad no encontrada
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard/analytics")}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Estadísticas
          </Button>
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <p className="text-muted-foreground">
            {property.city?.name} • {property.propertyType?.name}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push(`/properties/${property.id}`)}
        >
          Ver Anuncio
        </Button>
      </div>

      {/* Analytics Dashboard */}
      <PropertyAnalyticsDashboard propertyId={propertyId} />
    </div>
  );
}
