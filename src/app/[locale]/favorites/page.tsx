"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  useMyFavoritesQuery,
  useUpdateFavoriteMutation,
  useCurrentSubscriptionQuery,
} from "@/lib/graphql/generated";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyCardSkeleton } from "@/components/ui/property-card-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Heart, Bell, Crown, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function FavoritesPageContent() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const { toast } = useToast();
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  const { data, loading, refetch } = useMyFavoritesQuery();
  const { data: subscriptionData } = useCurrentSubscriptionQuery();
  const [updateFavorite] = useUpdateFavoriteMutation();

  const favorites = data?.myFavorites || [];
  const subscription = subscriptionData?.currentSubscription;
  const plan = subscription?.plan || "FREE";

  // Limits by plan
  const limits: Record<string, number> = {
    FREE: 10,
    BASIC: 50,
    PREMIUM: 999999,
    PREMIUM_PLUS: 999999,
  };

  const limit = limits[plan] || 10;
  const isNearLimit = favorites.length >= limit * 0.8; // 80% of limit
  const isAtLimit = favorites.length >= limit;

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const handlePriceAlertToggle = async (
    propertyId: string,
    currentValue: boolean
  ) => {
    try {
      await updateFavorite({
        variables: {
          propertyId: propertyId,
          priceAlertEnabled: !currentValue,
        },
      });

      toast({
        title: locale === "es" ? "Alerta actualizada" : "Alert updated",
        description: !currentValue
          ? locale === "es"
            ? "Recibirás notificaciones cuando baje el precio"
            : "You'll receive notifications when the price drops"
          : locale === "es"
          ? "Alerta de precio desactivada"
          : "Price alert disabled",
      });

      refetch();
    } catch (error) {
      toast({
        title: locale === "es" ? "Error" : "Error",
        description:
          locale === "es"
            ? "No se pudo actualizar la alerta"
            : "Could not update alert",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {locale === "es" ? "Mis Favoritos" : "My Favorites"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Limit Info */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {locale === "es" ? "Mis Favoritos" : "My Favorites"}
            </h1>
            <p className="text-muted-foreground">
              {locale === "es"
                ? `${favorites.length} ${
                    favorites.length === 1
                      ? "propiedad guardada"
                      : "propiedades guardadas"
                  }`
                : `${favorites.length} ${
                    favorites.length === 1
                      ? "saved property"
                      : "saved properties"
                  }`}
            </p>
          </div>
          <Badge
            variant={
              isAtLimit ? "destructive" : isNearLimit ? "secondary" : "outline"
            }
          >
            {favorites.length} / {limit === 999999 ? "∞" : limit}
          </Badge>
        </div>

        {/* Limit Warning */}
        {isNearLimit &&
          !isAtLimit &&
          plan !== "PREMIUM" &&
          plan !== "PREMIUM_PLUS" && (
            <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                      {locale === "es"
                        ? "Cerca del límite de favoritos"
                        : "Near favorites limit"}
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                      {locale === "es"
                        ? `Tienes ${
                            limit - favorites.length
                          } espacios restantes. Actualiza tu plan para guardar más propiedades.`
                        : `You have ${
                            limit - favorites.length
                          } spaces left. Upgrade your plan to save more properties.`}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(getLocalePath("/pricing"))}
                      className="border-yellow-600 text-yellow-900 dark:text-yellow-100"
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      {locale === "es" ? "Ver Planes" : "View Plans"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        {/* At Limit Warning */}
        {isAtLimit && plan !== "PREMIUM" && plan !== "PREMIUM_PLUS" && (
          <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-red-900 dark:text-red-100 mb-1">
                    {locale === "es"
                      ? "Límite de favoritos alcanzado"
                      : "Favorites limit reached"}
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                    {locale === "es"
                      ? "Has alcanzado el límite de favoritos. Elimina algunos o actualiza tu plan para guardar más."
                      : "You've reached your favorites limit. Remove some or upgrade your plan to save more."}
                  </p>
                  <Button
                    size="sm"
                    onClick={() => setShowUpgradeDialog(true)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    {locale === "es" ? "Actualizar Plan" : "Upgrade Plan"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <EmptyState
          icon={Heart}
          title={
            locale === "es" ? "No tienes favoritos aún" : "No favorites yet"
          }
          description={
            locale === "es"
              ? "Guarda propiedades que te interesen para verlas más tarde"
              : "Save properties you're interested in to view them later"
          }
          action={{
            label:
              locale === "es" ? "Explorar propiedades" : "Explore properties",
            onClick: () => router.push(getLocalePath("/properties")),
          }}
        />
      )}

      {/* Favorites Grid */}
      {favorites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites
            .filter((favorite) => favorite.property)
            .map((favorite) => (
              <div key={favorite.id} className="space-y-2">
                <PropertyCard
                  property={favorite.property!}
                  onFavoriteChange={refetch}
                />

                {/* Price Alert Toggle */}
                <Card>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {locale === "es" ? "Alerta de precio" : "Price alert"}
                        </span>
                      </div>
                      <Switch
                        checked={favorite.priceAlertEnabled || false}
                        onCheckedChange={() =>
                          handlePriceAlertToggle(
                            favorite.propertyId,
                            favorite.priceAlertEnabled || false
                          )
                        }
                      />
                    </div>
                    {favorite.priceAlertEnabled && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {locale === "es"
                          ? "Te notificaremos cuando baje el precio"
                          : "We'll notify you when the price drops"}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
      )}

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {locale === "es" ? "Actualizar Plan" : "Upgrade Plan"}
            </DialogTitle>
            <DialogDescription>
              {locale === "es"
                ? "Desbloquea más favoritos y funciones premium"
                : "Unlock more favorites and premium features"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="font-medium">
                {locale === "es" ? "Plan Básico" : "Basic Plan"}
              </p>
              <p className="text-sm text-muted-foreground">
                {locale === "es" ? "50 favoritos" : "50 favorites"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">
                {locale === "es" ? "Plan Premium" : "Premium Plan"}
              </p>
              <p className="text-sm text-muted-foreground">
                {locale === "es"
                  ? "Favoritos ilimitados"
                  : "Unlimited favorites"}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUpgradeDialog(false)}
            >
              {locale === "es" ? "Cancelar" : "Cancel"}
            </Button>
            <Button
              onClick={() => {
                setShowUpgradeDialog(false);
                router.push(getLocalePath("/pricing"));
              }}
            >
              {locale === "es" ? "Ver Planes" : "View Plans"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <ProtectedRoute>
      <FavoritesPageContent />
    </ProtectedRoute>
  );
}
