"use client";

import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePropertyQuery } from "@/lib/graphql/generated";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "es";
  const propertyId = params.id as string;
  const t = useTranslations("properties");

  const { data, loading, error } = usePropertyQuery({
    variables: { id: propertyId },
  });

  if (loading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !data?.property) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {locale === "es"
              ? "No se pudo cargar la propiedad"
              : "Could not load property"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const property = data.property;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        {locale === "es" ? "Editar Propiedad" : "Edit Property"}
      </h1>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800">
          {locale === "es"
            ? "Función en desarrollo - Próximamente podrás editar tu propiedad"
            : "Feature in development - You'll be able to edit your property soon"}
        </p>
      </div>

      <div className="space-y-4">
        <p>
          <strong>{locale === "es" ? "Título" : "Title"}:</strong>{" "}
          {property.title}
        </p>
        <p>
          <strong>{locale === "es" ? "Precio" : "Price"}:</strong> $
          {property.priceUS?.toLocaleString()}
        </p>
        <p>
          <strong>{locale === "es" ? "Dirección" : "Address"}:</strong>{" "}
          {property.address}
        </p>
      </div>
    </div>
  );
}
