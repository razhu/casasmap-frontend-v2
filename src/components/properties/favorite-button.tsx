"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthStore } from "@/store/auth";
import {
  useIsFavoritedQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "@/lib/graphql/generated";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  propertyId: string;
  locale: string;
  variant?: "default" | "icon";
  className?: string;
}

export function FavoriteButton({
  propertyId,
  locale,
  variant = "default",
  className,
}: FavoriteButtonProps) {
  const router = useRouter();
  const { token, _hasHydrated } = useAuthStore();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Query to check if property is favorited
  const { data, refetch } = useIsFavoritedQuery({
    variables: { propertyId },
    skip: !token || !_hasHydrated,
  });

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  useEffect(() => {
    if (data?.isFavorited !== undefined) {
      setIsFavorited(data.isFavorited);
    }
  }, [data]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Redirect to login if not authenticated
    if (!token || !_hasHydrated) {
      const loginPath = locale === "es" ? "/login" : `/${locale}/login`;
      router.push(loginPath);
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorited) {
        await removeFavorite({
          variables: { propertyId },
        });
        setIsFavorited(false);
      } else {
        await addFavorite({
          variables: {
            input: {
              propertyId,
              priceAlertEnabled: false,
            },
          },
        });
        setIsFavorited(true);
      }
      await refetch();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "icon") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleToggleFavorite}
              disabled={isLoading}
              className={cn(
                "p-2 rounded-full bg-white/90 hover:bg-white transition-all shadow-md",
                isLoading && "opacity-50 cursor-not-allowed",
                className
              )}
              aria-label={
                isFavorited
                  ? locale === "es"
                    ? "Quitar de favoritos"
                    : "Remove from favorites"
                  : locale === "es"
                  ? "Agregar a favoritos"
                  : "Add to favorites"
              }
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-all",
                  isFavorited
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600 hover:text-red-500"
                )}
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {isFavorited
                ? locale === "es"
                  ? "Quitar de favoritos"
                  : "Remove from favorites"
                : locale === "es"
                ? "Agregar a favoritos"
                : "Add to favorites"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant={isFavorited ? "default" : "outline"}
      size="sm"
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={className}
    >
      <Heart className={cn("h-4 w-4 mr-2", isFavorited && "fill-current")} />
      {isFavorited
        ? locale === "es"
          ? "Guardado"
          : "Saved"
        : locale === "es"
        ? "Guardar"
        : "Save"}
    </Button>
  );
}
