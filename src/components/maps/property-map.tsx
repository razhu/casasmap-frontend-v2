"use client";

import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import { useTheme } from "next-themes";

interface PropertyMapProps {
    latitude: number;
    longitude: number;
    zoom?: number;
    height?: string;
    interactive?: boolean;
}

export function PropertyMap({
    latitude,
    longitude,
    zoom = 14,
    height = "400px",
    interactive = true,
}: PropertyMapProps) {
    const { theme } = useTheme();

    // Determine map style based on theme
    const mapStyle = theme === "dark"
        ? "mapbox://styles/mapbox/dark-v11"
        : "mapbox://styles/mapbox/streets-v12";

    return (
        <div className="w-full rounded-lg overflow-hidden border" style={{ height }}>
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                    longitude,
                    latitude,
                    zoom,
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle={mapStyle}
                scrollZoom={interactive}
                dragPan={interactive}
                doubleClickZoom={interactive}
            >
                <Marker longitude={longitude} latitude={latitude} anchor="bottom">
                    <MapPin className="h-8 w-8 text-primary fill-primary/20 animate-bounce" />
                </Marker>

                {interactive && <NavigationControl position="bottom-right" />}
            </Map>
        </div>
    );
}
