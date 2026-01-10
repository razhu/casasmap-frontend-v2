"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/auth";
import { useMyPropertiesQuery } from "@/lib/graphql/generated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReceivedInquiriesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const t = useTranslations("inquiries");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const { data, loading } = useMyPropertiesQuery({
    variables: { page: 1, limit: 100 },
  });

  if (loading) {
    return (
      <div className="container mx-auto py-8 space-y-4">
        <Skeleton className="h-10 w-64" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  const properties = data?.myProperties.data || [];

  // Calculate total inquiries across all properties
  const totalInquiries = properties.reduce(
    (sum, prop) => sum + (prop.analytics?.inquiries || 0),
    0
  );

  if (properties.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">
          {t("received") || "Consultas Recibidas"}
        </h1>
        <Card>
          <CardContent className="pt-6 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
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
        <h1 className="text-3xl font-bold">
          {t("received") || "Consultas Recibidas"}
        </h1>
        <p className="text-muted-foreground">
          Mensajes de personas interesadas en tus propiedades
        </p>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">
                Total de Propiedades
              </p>
              <p className="text-2xl font-bold">{properties.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Total de Consultas
              </p>
              <p className="text-2xl font-bold">{totalInquiries}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Promedio</p>
              <p className="text-2xl font-bold">
                {properties.length > 0
                  ? (totalInquiries / properties.length).toFixed(1)
                  : 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties with Inquiries */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Propiedades</h2>
        {properties.map((property) => {
          const inquiryCount = property.analytics?.inquiries || 0;

          return (
            <Card
              key={property.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      {property.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {property.address}
                    </p>
                  </div>
                  <Badge variant={inquiryCount > 0 ? "default" : "secondary"}>
                    {inquiryCount}{" "}
                    {inquiryCount === 1 ? "consulta" : "consultas"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{property.analytics?.inquiries || 0} mensajes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>
                        {property.analytics?.phoneClicks || 0} llamadas
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{property.analytics?.emailClicks || 0} emails</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      router.push(`/messages?property=${property.id}`)
                    }
                  >
                    Ver Mensajes
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Responde rápido para mejores resultados
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Las propiedades que responden en menos de 24 horas tienen 3x más
                probabilidades de cerrar una venta.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
