"use client";

import { usePropertyAnalyticsQuery } from "@/lib/graphql/generated";
import { StatsCard } from "./stats-card";
import {
  Eye,
  MousePointerClick,
  Share2,
  Heart,
  MessageSquare,
  Phone,
  Mail,
  MessageCircle,
  QrCode,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PropertyAnalyticsDashboardProps {
  propertyId: string;
}

export function PropertyAnalyticsDashboard({
  propertyId,
}: PropertyAnalyticsDashboardProps) {
  const { data, loading, error } = usePropertyAnalyticsQuery({
    variables: { propertyId },
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !data?.propertyAnalytics) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No se pudieron cargar las estadísticas
          </p>
        </CardContent>
      </Card>
    );
  }

  const analytics = data.propertyAnalytics;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Vistas Totales"
          value={analytics.views.toLocaleString()}
          icon={Eye}
          description="Número de veces que se vio tu anuncio"
        />
        <StatsCard
          title="Clics"
          value={analytics.clicks.toLocaleString()}
          icon={MousePointerClick}
          description="Clics en tu anuncio"
        />
        <StatsCard
          title="Favoritos"
          value={analytics.favorites.toLocaleString()}
          icon={Heart}
          description="Usuarios que guardaron tu anuncio"
        />
        <StatsCard
          title="Consultas"
          value={analytics.inquiries.toLocaleString()}
          icon={MessageSquare}
          description="Mensajes recibidos"
        />
      </div>

      {/* Engagement Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Interacciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Clics en Teléfono</p>
                <p className="text-2xl font-bold">{analytics.phoneClicks}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Clics en Email</p>
                <p className="text-2xl font-bold">{analytics.emailClicks}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Clics en WhatsApp</p>
                <p className="text-2xl font-bold">{analytics.whatsappClicks}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Share2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Compartidos</p>
                <p className="text-2xl font-bold">{analytics.shares}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasa de Conversión
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.conversionRate.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">Consultas / Vistas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escaneos QR</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.qrCodeScans}</div>
            <p className="text-xs text-muted-foreground">
              Códigos QR escaneados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tiempo Promedio
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.averageViewTime
                ? `${Math.floor(analytics.averageViewTime / 60)}m ${
                    analytics.averageViewTime % 60
                  }s`
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              Tiempo en el anuncio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Last Viewed */}
      {analytics.lastViewedAt && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Última vista:{" "}
              {new Date(analytics.lastViewedAt).toLocaleString("es-BO", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
