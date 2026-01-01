"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  useMarketAnalysisQuery,
  useStatesForReportsQuery,
} from "@/lib/graphql/generated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, TrendingUp, Home, DollarSign } from "lucide-react";
import { useAuthStore } from "@/store/auth";

export default function ReportsPage() {
  const params = useParams();
  const locale = (params.locale as string) || "es";
  const { user } = useAuthStore();

  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedPropertyTypeId, setSelectedPropertyTypeId] = useState<
    number | null
  >(null);

  // Get all states and cities for Bolivia (countryId = 1)
  const { data: statesData, loading: loadingCities } = useStatesForReportsQuery(
    {
      variables: { countryId: 1 },
    }
  );

  // Flatten all cities from all states
  const allCities = useMemo(() => {
    if (!statesData?.states) return [];
    return statesData.states.flatMap(
      (state) =>
        state.cities?.map((city) => ({
          id: city.id,
          name: `${city.name}, ${state.name}`,
        })) || []
    );
  }, [statesData]);

  const { data, loading, refetch } = useMarketAnalysisQuery({
    variables: {
      input: {
        cityId: selectedCityId || 0,
        propertyTypeId: selectedPropertyTypeId,
      },
    },
    skip: !selectedCityId,
  });

  const isPremiumPlus = user?.subscriptions?.[0]?.plan === "PREMIUM_PLUS";

  if (!isPremiumPlus) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">
              {locale === "es" ? "Reportes de Mercado" : "Market Reports"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {locale === "es"
                ? "Esta función está disponible solo para usuarios Premium Plus"
                : "This feature is only available for Premium Plus users"}
            </p>
            <Button>
              {locale === "es"
                ? "Actualizar a Premium Plus"
                : "Upgrade to Premium Plus"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const report = data?.marketAnalysis;

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          {locale === "es" ? "Reportes de Mercado" : "Market Reports"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "es"
            ? "Análisis del mercado inmobiliario en Bolivia"
            : "Real estate market analysis in Bolivia"}
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === "es" ? "Filtros" : "Filters"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {locale === "es" ? "Ciudad" : "City"} *
              </label>
              <Select
                value={selectedCityId?.toString()}
                onValueChange={(value) => setSelectedCityId(parseInt(value))}
                disabled={loadingCities}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      loadingCities
                        ? locale === "es"
                          ? "Cargando..."
                          : "Loading..."
                        : locale === "es"
                        ? "Seleccionar ciudad"
                        : "Select city"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {allCities.map((city: any) => (
                    <SelectItem key={city.id} value={city.id.toString()}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                {locale === "es" ? "Tipo de Propiedad" : "Property Type"} (
                {locale === "es" ? "Opcional" : "Optional"})
              </label>
              <Select
                value={selectedPropertyTypeId?.toString() || "all"}
                onValueChange={(value) =>
                  setSelectedPropertyTypeId(
                    value === "all" ? null : parseInt(value)
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      locale === "es" ? "Todos los tipos" : "All types"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {locale === "es" ? "Todos los tipos" : "All types"}
                  </SelectItem>
                  <SelectItem value="1">
                    {locale === "es" ? "Casa" : "House"}
                  </SelectItem>
                  <SelectItem value="2">
                    {locale === "es" ? "Departamento" : "Apartment"}
                  </SelectItem>
                  <SelectItem value="3">
                    {locale === "es" ? "Terreno" : "Land"}
                  </SelectItem>
                  <SelectItem value="4">
                    {locale === "es" ? "Oficina" : "Office"}
                  </SelectItem>
                  <SelectItem value="5">
                    {locale === "es" ? "Local Comercial" : "Commercial"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={() => refetch()}
            disabled={!selectedCityId || loading}
          >
            {loading
              ? locale === "es"
                ? "Generando..."
                : "Generating..."
              : locale === "es"
              ? "Generar Reporte"
              : "Generate Report"}
          </Button>
        </CardContent>
      </Card>

      {loading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      )}

      {report && (
        <>
          {/* Summary Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {locale === "es" ? "Total Propiedades" : "Total Properties"}
                </CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {report.totalProperties}
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
                  {locale === "es" ? "Precio Promedio" : "Average Price"}
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
                  {locale === "es" ? "Precio Mediano" : "Median Price"}
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
                  {locale === "es" ? "Precio por m²" : "Price per m²"}
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${report.pricePerSqmUS.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {locale === "es" ? "Área promedio" : "Average area"}:{" "}
                  {report.averageArea.toFixed(0)} m²
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Price Range */}
          <Card>
            <CardHeader>
              <CardTitle>
                {locale === "es" ? "Rango de Precios" : "Price Range"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {locale === "es" ? "Mínimo" : "Minimum"}
                  </p>
                  <p className="text-xl font-bold">
                    ${report.minPriceUS.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {locale === "es" ? "Promedio" : "Average"}
                  </p>
                  <p className="text-xl font-bold">
                    ${report.averagePriceUS.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {locale === "es" ? "Máximo" : "Maximum"}
                  </p>
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
              <CardTitle>
                {locale === "es"
                  ? "Distribución de Precios"
                  : "Price Distribution"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.priceDistribution.map((dist: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
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
              <CardTitle>
                {locale === "es"
                  ? "Distribución por Tipo"
                  : "Distribution by Type"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.propertyTypeDistribution.map(
                  (dist: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {dist.propertyType}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {dist.count} ({dist.percentage.toFixed(1)}%) - $
                          {dist.averagePrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${dist.percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!loading && !report && selectedCityId && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              {locale === "es"
                ? "No hay datos disponibles para los filtros seleccionados"
                : "No data available for the selected filters"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
