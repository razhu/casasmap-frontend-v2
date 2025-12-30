"use client";

import { GitCompare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useComparisonStore } from "@/store/comparison";
import { cn } from "@/lib/utils";

interface AddToCompareButtonProps {
  property: {
    id: string;
    title: string;
    priceUS?: number | null;
    priceBS?: number | null;
  };
  locale: string;
  variant?: "default" | "icon";
  className?: string;
}

export function AddToCompareButton({
  property,
  locale,
  variant = "icon",
  className,
}: AddToCompareButtonProps) {
  const { properties, addProperty, removeProperty, isInComparison } =
    useComparisonStore();

  const inComparison = isInComparison(property.id);
  const isFull = properties.length >= 4;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inComparison) {
      removeProperty(property.id);
    } else {
      if (isFull) {
        alert(
          locale === "es"
            ? "Máximo 4 propiedades para comparar"
            : "Maximum 4 properties to compare"
        );
        return;
      }
      addProperty(property);
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleToggle}
        disabled={!inComparison && isFull}
        className={cn(
          "p-2 rounded-full bg-white/90 hover:bg-white transition-all shadow-md",
          inComparison && "bg-blue-500 hover:bg-blue-600",
          !inComparison && isFull && "opacity-50 cursor-not-allowed",
          className
        )}
        aria-label={
          inComparison
            ? locale === "es"
              ? "Quitar de comparación"
              : "Remove from comparison"
            : locale === "es"
            ? "Agregar a comparación"
            : "Add to comparison"
        }
      >
        {inComparison ? (
          <Check className="h-5 w-5 text-white" />
        ) : (
          <GitCompare className="h-5 w-5 text-gray-600" />
        )}
      </button>
    );
  }

  return (
    <Button
      variant={inComparison ? "default" : "outline"}
      size="sm"
      onClick={handleToggle}
      disabled={!inComparison && isFull}
      className={className}
    >
      {inComparison ? (
        <Check className="h-4 w-4 mr-2" />
      ) : (
        <GitCompare className="h-4 w-4 mr-2" />
      )}
      {inComparison
        ? locale === "es"
          ? "En comparación"
          : "In comparison"
        : locale === "es"
        ? "Comparar"
        : "Compare"}
    </Button>
  );
}
