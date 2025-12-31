"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import {
  useMarketAnalysisLazyQuery,
  useCitiesQuery,
  usePropertyTypesQuery,
} from "@/lib/graphql/generated";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUp,
  Building2,
  DollarSign,
  BarChart3,
  PieChart,
  Crown,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function MarketReportsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");

  const { data: citiesData } = useCitiesQuery();
  const { data: propertyTypesData } = usePropertyTypesQuery();

  const [getMarketAnalysis, { data, loading, error }] =
    useMarketAnalysisLazyQuery();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Check if user has Premium Plus subscription
  const isPremiumPlus = user?.subscription?.plan === "PREMIUM_PLUS";

  const handleGenerateReport = () => {
    if (!selectedCity) return;

    getMarketAnalysis({
      variables: {
        input: {
          cityId: parseInt(selectedCity),
          propertyTypeId: selectedPropertyType
            ? parseInt(selectedPropertyType)
            : undefined,
        },
      },
    });
  };

  if (!isPremiumPlus) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              <CardTitle>Reportes de Mercado</CardTitle>
            </div>
            <CardDescription>
              Análisis detallado del mercado inmobiliario
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-12">
            <Crown className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Función Premium Plus</h3>
            <p className="text-muted-foreground mb-6">
              Los reportes de mercado están disponibles solo para usuarios
              Premium Plus
            </p>
            <Button onClick={() => router.push("/pricing")}>
              Ver Planes Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const report = data?.marketAnalysis;

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Reportes de Mercado</h1>
        <p className="text-muted-foreground">
          Análisis detallado del mercado inmobiliario en Bolivia
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Generar Reporte</CardTitle>
          <CardDescription>
            Selecciona una ciudad y tipo de propiedad para ver el análisis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Ciudad *</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona ciudad" />
                </SelectTrigger>
                <SelectContent>
                  {citiesData?.cities.map((city) => (
                    <SelectItem key={city.id} value={city.id.toString()}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Tipo de Propiedad (Opcional)
              </label>
              <Select
                value={selectedPropertyType}
                onValueChange={setSelectedPropertyType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los tipos</SelectItem>
                  {propertyTypesData?.propertyTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleGenerateReport}
                disabled={!selectedCity || loading}
                className="w-full"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            Error al cargar el reporte. Por favor intenta nuevamente.
          </AlertDescription>
        </Alert>
      )}

      {/* Report Results */}
      {report && (
        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Propiedades Totales
                </CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {report.totalProperties.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {report.cityName}
                  {report.propertyTypeName && ` - ${report.propertyTypeName}`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Precio Promedio
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${report.averagePriceUS.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Bs {report.averagePriceBS.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Precio Mediano
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${report.medianPriceUS.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Bs {report.medianPriceBS.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Precio por m²
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${report.pricePerSqmUS.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Área promedio: {report.averageArea.toFixed(0)} m²
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Price Range */}
          <Card>
            <CardHeader>
              <CardTitle>Rango de Precios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Mínimo</p>
                  <p className="text-xl font-bold">
                    ${report.minPriceUS.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Promedio</p>
                  <p className="text-xl font-bold">
                    ${report.averagePriceUS.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Máximo</p>
                  <p className="text-xl font-bold">
                    ${report.maxPriceUS.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Distribution */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                <CardTitle>Distribución de Precios</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.priceDistribution.map((dist, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{dist.range}</span>
                      <span className="text-sm text-muted-foreground">
                        {dist.count} ({dist.percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${dist.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Property Type Distribution */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <CardTitle>Distribución por Tipo de Propiedad</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.propertyTypeDistribution.map((dist, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{dist.propertyType}</span>
                      <span className="text-sm text-muted-foreground">
                        {dist.count} propiedades ({dist.percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="w-full bg-secondary rounded-full h-2 mr-4">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${dist.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium whitespace-nowrap">
                        ${dist.averagePrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
