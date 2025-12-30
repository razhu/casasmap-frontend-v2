"use client";

import { useState, useCallback, useEffect } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import { MapPin } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapPickerProps {
  latitude?: number;
  longitude?: number;
  onLocationChange: (lat: number, lng: number) => void;
  locale: string;
  centerLat?: number;
  centerLng?: number;
  centerZoom?: number;
}

export function MapPicker({
  latitude,
  longitude,
  onLocationChange,
  locale,
  centerLat,
  centerLng,
  centerZoom = 13,
}: MapPickerProps) {
  const [viewState, setViewState] = useState({
    longitude: longitude || centerLng || -68.1193, // Default: La Paz, Bolivia
    latitude: latitude || centerLat || -16.4897,
    zoom: latitude && longitude ? 15 : centerZoom,
  });

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(latitude && longitude ? { lat: latitude, lng: longitude } : null);

  // Update view when center changes
  useEffect(() => {
    if (centerLat && centerLng) {
      setViewState((prev) => ({
        ...prev,
        latitude: centerLat,
        longitude: centerLng,
        zoom: centerZoom,
      }));
    }
  }, [centerLat, centerLng, centerZoom]);

  // Update marker when props change
  useEffect(() => {
    if (latitude && longitude) {
      setMarkerPosition({ lat: latitude, lng: longitude });
      setViewState((prev) => ({
        ...prev,
        latitude,
        longitude,
        zoom: 15,
      }));
    }
  }, [latitude, longitude]);

  const handleMapClick = useCallback(
    (event: any) => {
      const { lngLat } = event;
      const newPosition = {
        lat: lngLat.lat,
        lng: lngLat.lng,
      };
      setMarkerPosition(newPosition);
      onLocationChange(newPosition.lat, newPosition.lng);
    },
    [onLocationChange]
  );

  const handleMarkerDragEnd = useCallback(
    (event: any) => {
      const { lngLat } = event;
      const newPosition = {
        lat: lngLat.lat,
        lng: lngLat.lng,
      };
      setMarkerPosition(newPosition);
      onLocationChange(newPosition.lat, newPosition.lng);
    },
    [onLocationChange]
  );

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">
        {locale === "es"
          ? "Haz clic en el mapa para marcar la ubicación de tu propiedad, o arrastra el marcador para ajustar."
          : "Click on the map to mark your property location, or drag the marker to adjust."}
      </div>
      <div className="relative h-[400px] rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
        <Map
          {...viewState}
          onMove={(evt: any) => setViewState(evt.viewState)}
          onClick={handleMapClick}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          style={{ width: "100%", height: "100%" }}
        >
          <NavigationControl position="top-right" />

          {markerPosition && (
            <Marker
              longitude={markerPosition.lng}
              latitude={markerPosition.lat}
              anchor="bottom"
              draggable
              onDragEnd={handleMarkerDragEnd}
            >
              <div className="cursor-move">
                <MapPin className="h-10 w-10 text-primary fill-primary drop-shadow-lg" />
              </div>
            </Marker>
          )}
        </Map>

        {!markerPosition && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/5">
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg border">
              <p className="text-sm font-medium">
                {locale === "es"
                  ? "👆 Haz clic en el mapa para marcar la ubicación"
                  : "👆 Click on the map to mark the location"}
              </p>
            </div>
          </div>
        )}
      </div>

      {markerPosition && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-gray-50 dark:bg-gray-800 p-2 rounded">
          <MapPin className="h-4 w-4" />
          <span>
            {locale === "es" ? "Ubicación:" : "Location:"}{" "}
            {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}
          </span>
        </div>
      )}
    </div>
  );
}
