import Link from "next/link";
import { useParams } from "next/navigation";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  const params = useParams();
  const locale = params.locale as string;

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const formatPrice = (priceUS?: number | null, priceBS?: number | null) => {
    if (priceUS) {
      return `$${priceUS.toLocaleString()}`;
    }
    if (priceBS) {
      return `Bs ${priceBS.toLocaleString()}`;
    }
    return locale === "es" ? "Precio a consultar" : "Price on request";
  };

  return (
    <Link href={getLocalePath(`/properties/${property.id}`)}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader className="p-0">
          <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-800">
            {/* Placeholder for image - will add later */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Maximize className="h-12 w-12" />
            </div>
            {(property.priority === "HIGHEST" ||
              property.priority === "HIGH") && (
              <Badge className="absolute top-2 right-2 bg-yellow-500">
                {locale === "es" ? "Destacado" : "Featured"}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">
              {property.title}
            </h3>
            <p className="font-bold text-primary whitespace-nowrap ml-2">
              {formatPrice(property.priceUS, property.priceBS)}
            </p>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{property.address}</span>
          </div>
          <div className="flex gap-4 text-sm">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.totalArea && (
              <div className="flex items-center gap-1">
                <Maximize className="h-4 w-4" />
                <span>{property.totalArea}m²</span>
              </div>
            )}
          </div>
        </CardContent>
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
      </Card>
    </Link>
  );
}
