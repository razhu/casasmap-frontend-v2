"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useComparePropertiesQuery } from "@/lib/graphql/generated";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function ComparePage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const searchParams = useSearchParams();
  const [propertyIds, setPropertyIds] = useState<string[]>([]);

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  useEffect(() => {
    const ids = searchParams.get("ids");
    if (ids) {
      setPropertyIds(ids.split(","));
    }
  }, [searchParams]);

  const { data, loading, error } = useComparePropertiesQuery({
    variables: {
      input: {
        propertyIds,
      },
    },
    skip: propertyIds.length === 0,
  });

  if (propertyIds.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {t("compare.noProperties")}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t("compare.selectProperties")}
          </p>
          <Link href={getLocalePath("/properties")}>
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("compare.backToProperties")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {propertyIds.map((id) => (
            <Skeleton key={id} className="h-96" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-destructive">
            {t("compare.error")}
          </h1>
          <p className="text-muted-foreground mb-6">
            {error?.message || t("compare.errorMessage")}
          </p>
          <Link href={getLocalePath("/properties")}>
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("compare.backToProperties")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { properties } = data.compareProperties;

  const formatPrice = (property: (typeof properties)[0]) => {
    if (property.priceUS) {
      return `$${property.priceUS.toLocaleString()}`;
    }
    if (property.priceBS) {
      return `Bs ${property.priceBS.toLocaleString()}`;
    }
    return "-";
  };

  const renderBooleanValue = (value?: boolean | null) => {
    if (value === undefined || value === null) {
      return <span className="text-muted-foreground">-</span>;
    }
    return value ? (
      <Check className="h-5 w-5 text-green-600" />
    ) : (
      <X className="h-5 w-5 text-red-600" />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="mb-6">
        <Link href={getLocalePath("/properties")}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("compare.backToProperties")}
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">
        {t("compare.title")} ({properties.length})
      </h1>

      {/* Responsive comparison table */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `200px repeat(${properties.length}, 300px)`,
            }}
          >
            {/* Header row with property cards */}
            <div className="font-semibold text-lg flex items-end pb-4">
              {t("compare.feature")}
            </div>
            {properties.map((property) => (
              <Card key={property.id} className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">
                    {locale === "es"
                      ? property.title
                      : property.titleEn || property.title}
                  </CardTitle>
                  <p className="text-2xl font-bold text-primary">
                    {formatPrice(property)}
                  </p>
                </CardHeader>
                <CardContent>
                  <Link href={getLocalePath(`/properties/${property.id}`)}>
                    <Button variant="outline" size="sm" className="w-full">
                      {t("compare.viewDetails")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}

            {/* Location */}
            <div className="font-medium flex items-center gap-2 py-3 border-t">
              <MapPin className="h-4 w-4" />
              {t("compare.location")}
            </div>
            {properties.map((property) => (
              <div key={`location-${property.id}`} className="py-3 border-t">
                {property.address || "-"}
              </div>
            ))}

            {/* Bedrooms */}
            <div className="font-medium flex items-center gap-2 py-3 border-t">
              <Bed className="h-4 w-4" />
              {t("compare.bedrooms")}
            </div>
            {properties.map((property) => (
              <div key={`bedrooms-${property.id}`} className="py-3 border-t">
                {property.bedrooms || "-"}
              </div>
            ))}

            {/* Bathrooms */}
            <div className="font-medium flex items-center gap-2 py-3 border-t">
              <Bath className="h-4 w-4" />
              {t("compare.bathrooms")}
            </div>
            {properties.map((property) => (
              <div key={`bathrooms-${property.id}`} className="py-3 border-t">
                {property.bathrooms || "-"}
              </div>
            ))}

            {/* Total Area */}
            <div className="font-medium flex items-center gap-2 py-3 border-t">
              <Maximize className="h-4 w-4" />
              {t("compare.totalArea")}
            </div>
            {properties.map((property) => (
              <div key={`area-${property.id}`} className="py-3 border-t">
                {property.totalArea ? `${property.totalArea} m²` : "-"}
              </div>
            ))}

            {/* Covered Area */}
            <div className="font-medium py-3 border-t">
              {t("compare.coveredArea")}
            </div>
            {properties.map((property) => (
              <div key={`covered-${property.id}`} className="py-3 border-t">
                {property.coveredArea ? `${property.coveredArea} m²` : "-"}
              </div>
            ))}

            {/* Parking Spaces */}
            <div className="font-medium py-3 border-t">
              {t("compare.parkingSpaces")}
            </div>
            {properties.map((property) => (
              <div key={`parking-${property.id}`} className="py-3 border-t">
                {property.parkingSpaces || "-"}
              </div>
            ))}

            {/* Year Built */}
            <div className="font-medium flex items-center gap-2 py-3 border-t">
              <Calendar className="h-4 w-4" />
              {t("compare.yearBuilt")}
            </div>
            {properties.map((property) => (
              <div key={`year-${property.id}`} className="py-3 border-t">
                {property.yearBuilt || "-"}
              </div>
            ))}

            {/* Furnished */}
            <div className="font-medium py-3 border-t">
              {t("compare.furnished")}
            </div>
            {properties.map((property) => (
              <div key={`furnished-${property.id}`} className="py-3 border-t">
                {renderBooleanValue(property.furnished)}
              </div>
            ))}

            {/* Pool */}
            <div className="font-medium py-3 border-t">{t("compare.pool")}</div>
            {properties.map((property) => (
              <div key={`pool-${property.id}`} className="py-3 border-t">
                {renderBooleanValue(property.pool)}
              </div>
            ))}

            {/* Balcony */}
            <div className="font-medium py-3 border-t">
              {t("compare.balcony")}
            </div>
            {properties.map((property) => (
              <div key={`balcony-${property.id}`} className="py-3 border-t">
                {renderBooleanValue(property.balcony)}
              </div>
            ))}

            {/* Terrace */}
            <div className="font-medium py-3 border-t">
              {t("compare.terrace")}
            </div>
            {properties.map((property) => (
              <div key={`terrace-${property.id}`} className="py-3 border-t">
                {renderBooleanValue(property.terrace)}
              </div>
            ))}

            {/* Security */}
            <div className="font-medium py-3 border-t">
              {t("compare.security")}
            </div>
            {properties.map((property) => (
              <div key={`security-${property.id}`} className="py-3 border-t">
                {renderBooleanValue(property.security)}
              </div>
            ))}

            {/* Storage */}
            <div className="font-medium py-3 border-t">
              {t("compare.storage")}
            </div>
            {properties.map((property) => (
              <div key={`storage-${property.id}`} className="py-3 border-t">
                {renderBooleanValue(property.storage)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
