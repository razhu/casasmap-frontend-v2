"use client";

import { useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import { usePropertiesQuery } from "@/lib/graphql/generated";
import { PropertyCard } from "@/components/properties/property-card";
import { Button } from "@/components/ui/button";
import { Loader2, List, MapIcon } from "lucide-react";
import Link from "next/link";
import "mapbox-gl/dist/mapbox-gl.css";

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}

export default function PropertiesMapPage() {
  const params = useParams();
  const locale = params.locale as string;
  const mapRef = useRef<any>(null);

  const [viewState, setViewState] = useState<ViewState>({
    longitude: -68.1193, // La Paz, Bolivia
    latitude: -16.4897,
    zoom: 12,
  });

  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  // Fetch all properties
  const { data, loading } = usePropertiesQuery({
    variables: { page: 1, limit: 100 }, // Get more properties for map
  });

  const properties = data?.properties?.data || [];
  const propertiesWithCoords = properties.filter(
    (p) => p.latitude && p.longitude
  );

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const handleMarkerClick = useCallback((property: any) => {
    setSelectedProperty(property);
  }, []);

  const handleClosePopup = useCallback(() => {
    setSelectedProperty(null);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              {locale === "es" ? "Mapa de Propiedades" : "Properties Map"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {propertiesWithCoords.length}{" "}
              {locale === "es" ? "propiedades" : "properties"}
            </p>
          </div>
          <Link href={getLocalePath("/properties")}>
            <Button variant="outline" size="sm">
              <List className="h-4 w-4 mr-2" />
              {locale === "es" ? "Vista de Lista" : "List View"}
            </Button>
          </Link>
        </div>
      </div>

      {/* Map */}
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt: any) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Navigation Controls */}
        <NavigationControl position="top-right" />

        {/* Property Markers */}
        {propertiesWithCoords.map((property) => (
          <Marker
            key={property.id}
            longitude={property.longitude!}
            latitude={property.latitude!}
            anchor="bottom"
            onClick={(e: any) => {
              e.originalEvent.stopPropagation();
              handleMarkerClick(property);
            }}
          >
            <div className="cursor-pointer transform hover:scale-110 transition-transform">
              <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg border-2 border-white">
                {property.priceUS
                  ? `$${property.priceUS.toLocaleString()}`
                  : property.priceBS
                  ? `Bs ${property.priceBS.toLocaleString()}`
                  : locale === "es"
                  ? "Consultar"
                  : "Ask"}
              </div>
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary mx-auto"></div>
            </div>
          </Marker>
        ))}

        {/* Property Popup */}
        {selectedProperty && (
          <Popup
            longitude={selectedProperty.longitude!}
            latitude={selectedProperty.latitude!}
            anchor="top"
            onClose={handleClosePopup}
            closeButton={true}
            closeOnClick={false}
            maxWidth="400px"
          >
            <div className="p-2">
              <PropertyCard property={selectedProperty} compact />
            </div>
          </Popup>
        )}
      </Map>

      {/* No Properties Message */}
      {propertiesWithCoords.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-20">
          <div className="text-center">
            <MapIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">
              {locale === "es"
                ? "No hay propiedades con ubicación"
                : "No properties with location"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {locale === "es"
                ? "Las propiedades sin coordenadas no se muestran en el mapa"
                : "Properties without coordinates are not shown on the map"}
            </p>
            <Link href={getLocalePath("/properties")}>
              <Button>
                <List className="h-4 w-4 mr-2" />
                {locale === "es" ? "Ver Lista" : "View List"}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
