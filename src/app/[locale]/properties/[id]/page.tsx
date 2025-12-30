"use client";

import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  Home,
  DollarSign,
  Phone,
  Mail,
  ArrowLeft,
  Share2,
  Heart,
} from "lucide-react";
import {
  usePropertyQuery,
  useSearchPropertiesQuery,
} from "@/lib/graphql/generated";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PropertyCard } from "@/components/properties/property-card";
import { FavoriteButton } from "@/components/properties/favorite-button";
import { MessageButton } from "@/components/messaging/message-button";

// Set Mapbox token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const propertyId = params.id as string;
  const t = useTranslations("properties");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const { data, loading, error } = usePropertyQuery({
    variables: { id: propertyId },
  });

  // Fetch similar properties (same city, excluding current property)
  const { data: similarData } = useSearchPropertiesQuery({
    variables: {
      filters: {
        cityId: data?.property?.cityId,
      },
      page: 1,
      limit: 4,
    },
    skip: !data?.property?.cityId,
  });

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  // Initialize map
  useEffect(() => {
    if (!data?.property || !mapContainer.current || map.current) return;

    const property = data.property;
    if (!property.latitude || !property.longitude) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [property.longitude, property.latitude],
      zoom: 14,
    });

    // Add marker
    new mapboxgl.Marker({ color: "#3b82f6" })
      .setLngLat([property.longitude, property.latitude])
      .addTo(map.current);

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      map.current?.remove();
    };
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          {locale === "es" ? "Cargando..." : "Loading..."}
        </div>
      </div>
    );
  }

  if (error || !data?.property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {locale === "es" ? "Propiedad no encontrada" : "Property not found"}
          </p>
          <Button onClick={() => router.push(getLocalePath("/properties"))}>
            {locale === "es" ? "Volver a Propiedades" : "Back to Properties"}
          </Button>
        </div>
      </div>
    );
  }

  const property = data.property;
  const title = locale === "es" ? property.title : property.titleEn;
  const description =
    locale === "es" ? property.description : property.descriptionEn;

  const formatPrice = (priceUS?: number | null, priceBS?: number | null) => {
    if (priceUS) {
      return `$${priceUS.toLocaleString()}`;
    }
    if (priceBS) {
      return `Bs ${priceBS.toLocaleString()}`;
    }
    return locale === "es" ? "Precio a consultar" : "Price on request";
  };

  const formatDate = (dateString?: any) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString(
      locale === "es" ? "es-BO" : "en-US"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push(getLocalePath("/properties"))}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {locale === "es" ? "Volver" : "Back"}
        </Button>

        {/* Image Gallery Placeholder */}
        <div className="relative h-96 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-800 rounded-lg mb-6">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <Home className="h-24 w-24" />
          </div>
          {(property.priority === "HIGHEST" ||
            property.priority === "HIGH") && (
            <Badge className="absolute top-4 right-4 bg-yellow-500">
              {locale === "es" ? "Destacado" : "Featured"}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Price */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2">{title}</CardTitle>
                    <CardDescription className="flex items-center text-base">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.address}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">
                      {formatPrice(property.priceUS, property.priceBS)}
                    </p>
                    <Badge variant="outline" className="mt-2">
                      {property.dealTypeId === 1
                        ? locale === "es"
                          ? "Venta"
                          : "Sale"
                        : locale === "es"
                        ? "Alquiler"
                        : "Rent"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6 text-lg">
                  {property.bedrooms && (
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <span>
                        {property.bedrooms} {locale === "es" ? "hab" : "bed"}
                      </span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5 text-muted-foreground" />
                      <span>
                        {property.bathrooms}{" "}
                        {locale === "es" ? "baños" : "bath"}
                      </span>
                    </div>
                  )}
                  {property.totalArea && (
                    <div className="flex items-center gap-2">
                      <Maximize className="h-5 w-5 text-muted-foreground" />
                      <span>{property.totalArea}m²</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {locale === "es" ? "Descripción" : "Description"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">
                  {description}
                </p>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {locale === "es" ? "Detalles" : "Details"}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {property.yearBuilt && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === "es" ? "Año de construcción" : "Year built"}
                    </p>
                    <p className="font-medium">{property.yearBuilt}</p>
                  </div>
                )}
                {property.coveredArea && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === "es" ? "Área cubierta" : "Covered area"}
                    </p>
                    <p className="font-medium">{property.coveredArea}m²</p>
                  </div>
                )}
                {property.parkingSpaces !== null && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === "es" ? "Estacionamientos" : "Parking"}
                    </p>
                    <p className="font-medium">{property.parkingSpaces}</p>
                  </div>
                )}
                {property.furnished !== null && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === "es" ? "Amoblado" : "Furnished"}
                    </p>
                    <p className="font-medium">
                      {property.furnished
                        ? locale === "es"
                          ? "Sí"
                          : "Yes"
                        : locale === "es"
                        ? "No"
                        : "No"}
                    </p>
                  </div>
                )}
                {property.petsAllowed !== null && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === "es" ? "Mascotas" : "Pets"}
                    </p>
                    <p className="font-medium">
                      {property.petsAllowed
                        ? locale === "es"
                          ? "Permitidas"
                          : "Allowed"
                        : locale === "es"
                        ? "No permitidas"
                        : "Not allowed"}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">
                    {locale === "es" ? "Publicado" : "Published"}
                  </p>
                  <p className="font-medium">
                    {formatDate(property.createdAt)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            {(property.pool ||
              property.balcony ||
              property.terrace ||
              property.security) && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {locale === "es" ? "Características" : "Features"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.pool && (
                      <Badge variant="secondary">
                        🏊 {locale === "es" ? "Piscina" : "Pool"}
                      </Badge>
                    )}
                    {property.balcony && (
                      <Badge variant="secondary">
                        🏠 {locale === "es" ? "Balcón" : "Balcony"}
                      </Badge>
                    )}
                    {property.terrace && (
                      <Badge variant="secondary">
                        🌿 {locale === "es" ? "Terraza" : "Terrace"}
                      </Badge>
                    )}
                    {property.security && (
                      <Badge variant="secondary">
                        🔒 {locale === "es" ? "Seguridad" : "Security"}
                      </Badge>
                    )}
                    {property.storage && (
                      <Badge variant="secondary">
                        📦 {locale === "es" ? "Depósito" : "Storage"}
                      </Badge>
                    )}
                    {property.elevators && property.elevators > 0 && (
                      <Badge variant="secondary">
                        🛗 {locale === "es" ? "Ascensor" : "Elevator"}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {locale === "es" ? "Contactar" : "Contact"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {property.phoneNumber && (
                  <Button className="w-full" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    {locale === "es" ? "Llamar" : "Call"}
                  </Button>
                )}
                <MessageButton
                  receiverId={property.user.id}
                  receiverName={
                    property.user.profile?.firstName ||
                    property.user.email.split("@")[0]
                  }
                  propertyId={property.id}
                  locale={locale}
                  variant="outline"
                  size="lg"
                />
                <Separator />
                <div className="flex gap-2">
                  <FavoriteButton
                    propertyId={property.id}
                    locale={locale}
                    variant="default"
                    className="flex-1"
                  />
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Property Info */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {locale === "es" ? "Información" : "Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <span className="font-mono">{property.id.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {locale === "es" ? "Estado" : "Status"}:
                  </span>
                  <Badge variant="outline">{property.status}</Badge>
                </div>
                {property.availableFrom && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {locale === "es" ? "Disponible desde" : "Available from"}:
                    </span>
                    <span>{formatDate(property.availableFrom)}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        {property.latitude && property.longitude && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>
                {locale === "es" ? "Ubicación" : "Location"}
              </CardTitle>
              <CardDescription>{property.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                ref={mapContainer}
                className="h-96 rounded-lg overflow-hidden"
              />
            </CardContent>
          </Card>
        )}

        {/* Similar Properties */}
        {similarData?.searchProperties?.data &&
          similarData.searchProperties.data.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">
                {locale === "es"
                  ? "Propiedades similares"
                  : "Similar properties"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarData.searchProperties.data
                  .filter((p) => p.id !== propertyId)
                  .slice(0, 4)
                  .map((similarProperty) => (
                    <PropertyCard
                      key={similarProperty.id}
                      property={similarProperty}
                    />
                  ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
