"use client";

import { useRouter } from "next/navigation";
import { X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useComparisonStore } from "@/store/comparison";

interface ComparisonBarProps {
  locale: string;
}

export function ComparisonBar({ locale }: ComparisonBarProps) {
  const router = useRouter();
  const { properties, removeProperty, clearAll } = useComparisonStore();

  if (properties.length === 0) {
    return null;
  }

  const handleCompare = () => {
    const ids = properties.map((p) => p.id).join(",");
    const comparePath =
      locale === "es" ? `/compare?ids=${ids}` : `/${locale}/compare?ids=${ids}`;
    router.push(comparePath);
  };

  const formatPrice = (priceUS?: number | null, priceBS?: number | null) => {
    if (priceUS) return `$${priceUS.toLocaleString()}`;
    if (priceBS) return `Bs ${priceBS.toLocaleString()}`;
    return "-";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            <span className="font-semibold">
              {locale === "es" ? "Comparar propiedades" : "Compare properties"}{" "}
              ({properties.length}/4)
            </span>
          </div>

          <div className="flex items-center gap-2 flex-1 overflow-x-auto">
            {properties.map((property) => (
              <div
                key={property.id}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 min-w-[200px]"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {property.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(property.priceUS, property.priceBS)}
                  </p>
                </div>
                <button
                  onClick={() => removeProperty(property.id)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clearAll}>
              {locale === "es" ? "Limpiar" : "Clear"}
            </Button>
            <Button
              size="sm"
              onClick={handleCompare}
              disabled={properties.length < 2}
            >
              {locale === "es" ? "Comparar" : "Compare"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
