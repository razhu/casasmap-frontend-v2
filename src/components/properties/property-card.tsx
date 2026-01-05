import Link from "next/link";
import { useParams } from "next/navigation";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "./favorite-button";
import { AddToCompareButton } from "./add-to-compare-button";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    description?: string | null;
    priceUS?: number | null;
    priceBS?: number | null;
    address: string;
    bedrooms?: number | null;
    bathrooms?: number | null;
    totalArea?: number | null;
    status: string;
    priority: string;
    propertyTypeId: number;
    dealTypeId: number;
    media?: Array<{
      id: string;
      url: string;
      type: string;
      order: number;
    }> | null;
  };
  compact?: boolean;
  onFavoriteChange?: () => void;
}

export function PropertyCard({
  property,
  compact = false,
  onFavoriteChange,
}: PropertyCardProps) {
  const params = useParams();
  const locale = params.locale as string;

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const getPropertyUrl = () => {
    const slug = locale === "en" ? property.slugEn : property.slug;

    // If slug exists, use nice URL
    if (slug) {
      // Both Spanish and English use /inmuebles/[slug]
      // Spanish: /inmuebles/casa-en-venta
      // English: /en/inmuebles/beautiful-house-for-sale
      return locale === "es" ? `/inmuebles/${slug}` : `/en/inmuebles/${slug}`;
    }

    // Fallback to ID-based URL
    return getLocalePath(`/properties/${property.id}`);
  };

  const formatPrice = (priceUS?: number | null, priceBS?: number | null) => {
    if (priceUS) {
      return `${priceUS.toLocaleString()}`;
    }
    if (priceBS) {
      return `Bs ${priceBS.toLocaleString()}`;
    }
    return locale === "es" ? "Precio a consultar" : "Price on request";
  };

  // Get the first image (cover image)
  const coverImage =
    property.media?.find((m) => m.order === 0) || property.media?.[0];

  return (
    <Link href={getPropertyUrl()}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader className="p-0">
          <div
            className={`relative bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-800 ${
              compact ? "h-32" : "h-48"
            }`}
          >
            {coverImage ? (
              <Image
                src={coverImage.url}
                alt={property.title}
                fill
                className="object-cover"
                sizes={compact ? "200px" : "400px"}
              />
            ) : (
              <Image
                src="/images/property-no-photo.svg"
                alt="No photos available"
                fill
                className="object-contain p-2"
              />
            )}
            {!compact && (
              <div className="absolute top-2 right-2 z-10 flex gap-2">
                <AddToCompareButton
                  property={property}
                  locale={locale}
                  variant="icon"
                />
                <FavoriteButton
                  propertyId={property.id}
                  locale={locale}
                  variant="icon"
                />
              </div>
            )}
            {!compact &&
              (property.priority === "HIGHEST" ||
                property.priority === "HIGH") && (
                <Badge className="absolute top-2 left-2 bg-yellow-500">
                  {locale === "es" ? "Destacado" : "Featured"}
                </Badge>
              )}
          </div>
        </CardHeader>
        <CardContent className={compact ? "p-2" : "p-4"}>
          <div className="flex justify-between items-start mb-2">
            <h3
              className={`font-semibold line-clamp-1 ${
                compact ? "text-sm" : "text-lg"
              }`}
            >
              {property.title}
            </h3>
            <p
              className={`font-bold text-primary whitespace-nowrap ml-2 ${
                compact ? "text-sm" : ""
              }`}
            >
              {formatPrice(property.priceUS, property.priceBS)}
            </p>
          </div>
          <div
            className={`flex items-center text-muted-foreground mb-3 ${
              compact ? "text-xs" : "text-sm"
            }`}
          >
            <MapPin className={compact ? "h-3 w-3 mr-1" : "h-4 w-4 mr-1"} />
            <span className="line-clamp-1">{property.address}</span>
          </div>
          <div className={`flex gap-4 ${compact ? "text-xs" : "text-sm"}`}>
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className={compact ? "h-3 w-3" : "h-4 w-4"} />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className={compact ? "h-3 w-3" : "h-4 w-4"} />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.totalArea && (
              <div className="flex items-center gap-1">
                <Maximize className={compact ? "h-3 w-3" : "h-4 w-4"} />
                <span>{property.totalArea}m²</span>
              </div>
            )}
          </div>
        </CardContent>
        {!compact && (
          <CardFooter className="p-4 pt-0">
            <Badge variant="outline">
              {property.dealTypeId === 1
                ? locale === "es"
                  ? "Venta"
                  : "Sale"
                : locale === "es"
                ? "Alquiler"
                : "Rent"}
            </Badge>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
