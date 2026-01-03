"use client";

import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  useCurrentSubscriptionQuery,
  useCancelSubscriptionMutation,
} from "@/lib/graphql/generated";
import { useAuthStore } from "@/store/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  CheckCircle2,
  Crown,
  Calendar,
  TrendingUp,
  ArrowRight,
  XCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SubscriptionPage() {
  const params = useParams();
  const router = useRouter();
  const [cancelling, setCancelling] = useState(false);
  const locale = (params.locale as string) || "es";
  const { user } = useAuthStore();
  const t = useTranslations("subscription");
  const { toast } = useToast();

  const { data, loading, error, refetch } = useCurrentSubscriptionQuery({
    skip: !user,
  });

  const [cancelSubscription] = useCancelSubscriptionMutation();

  const handleCancelSubscription = async () => {
    if (!subscription?.id) return;

    setCancelling(true);
    try {
      await cancelSubscription({
        variables: { id: subscription.id },
      });

      toast({
        title:
          locale === "es" ? "Suscripción cancelada" : "Subscription cancelled",
        description:
          locale === "es"
            ? "Tu suscripción ha sido cancelada. Tendrás acceso hasta la fecha de vencimiento."
            : "Your subscription has been cancelled. You'll have access until the expiration date.",
      });

      refetch();
    } catch (err: any) {
      toast({
        title: locale === "es" ? "Error" : "Error",
        description:
          err?.message ||
          (locale === "es"
            ? "No se pudo cancelar la suscripción"
            : "Could not cancel subscription"),
        variant: "destructive",
      });
    } finally {
      setCancelling(false);
    }
  };

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Skeleton className="h-12 w-64 mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {locale === "es"
              ? "No se pudo cargar la información de suscripción"
              : "Could not load subscription information"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const subscription = data?.currentSubscription;
  const currentPlan = subscription?.plan || "FREE";
  const isActive = subscription?.status === "ACTIVE";
  const endDate = subscription?.endDate ? new Date(subscription.endDate) : null;
  const daysRemaining = endDate
    ? Math.ceil(
        (endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      )
    : null;

  const planDetails = {
    FREE: {
      name: locale === "es" ? "Gratis" : "Free",
      color: "bg-gray-500",
      icon: "🏠",
      features: [
        locale === "es" ? "5 propiedades por mes" : "5 properties per month",
        locale === "es" ? "10 favoritos" : "10 favorites",
        locale === "es"
          ? "Búsquedas guardadas básicas"
          : "Basic saved searches",
      ],
    },
    PREMIUM: {
      name: "Premium",
      color: "bg-blue-500",
      icon: "⭐",
      features: [
        locale === "es" ? "50 propiedades por mes" : "50 properties per month",
        locale === "es" ? "Favoritos ilimitados" : "Unlimited favorites",
        locale === "es" ? "Mensajería directa" : "Direct messaging",
        locale === "es" ? "Reportes de mercado" : "Market reports",
        locale === "es" ? "Volantes PDF" : "PDF flyers",
      ],
    },
    PREMIUM_PLUS: {
      name: "Premium Plus",
      color: "bg-purple-500",
      icon: "👑",
      features: [
        locale === "es" ? "Propiedades ilimitadas" : "Unlimited properties",
        locale === "es" ? "Prioridad en búsquedas" : "Priority in searches",
        locale === "es" ? "Destacado en resultados" : "Featured in results",
        locale === "es" ? "Análisis avanzado" : "Advanced analytics",
        locale === "es" ? "Soporte prioritario" : "Priority support",
      ],
    },
  };

  const plan =
    planDetails[currentPlan as keyof typeof planDetails] || planDetails.FREE;

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          {locale === "es" ? "Mi Suscripción" : "My Subscription"}
        </h1>
        <Button
          variant="outline"
          onClick={() => router.push(getLocalePath("/pricing"))}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          {locale === "es" ? "Ver Planes" : "View Plans"}
        </Button>
      </div>

      {/* Current Plan Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`${plan.color} text-white p-3 rounded-lg text-2xl`}
              >
                {plan.icon}
              </div>
              <div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>
                  {locale === "es" ? "Plan actual" : "Current plan"}
                </CardDescription>
              </div>
            </div>
            {isActive && subscription ? (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                {locale === "es" ? "Activo" : "Active"}
              </Badge>
            ) : (
              <Badge variant="secondary">
                {locale === "es" ? "Gratis" : "Free"}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Expiration Info */}
          {subscription && endDate && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  {locale === "es" ? "Vence el" : "Expires on"}
                </span>
                <span className="font-medium">
                  {endDate.toLocaleDateString(
                    locale === "es" ? "es-BO" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              {daysRemaining !== null && (
                <>
                  <Progress
                    value={(daysRemaining / 30) * 100}
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    {daysRemaining > 0
                      ? locale === "es"
                        ? `${daysRemaining} días restantes`
                        : `${daysRemaining} days remaining`
                      : locale === "es"
                      ? "Suscripción vencida"
                      : "Subscription expired"}
                  </p>
                </>
              )}
            </div>
          )}

          {/* Expiration Warning */}
          {daysRemaining !== null &&
            daysRemaining <= 7 &&
            daysRemaining > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {locale === "es"
                    ? `Tu suscripción vence en ${daysRemaining} días. Renueva ahora para mantener tus beneficios.`
                    : `Your subscription expires in ${daysRemaining} days. Renew now to keep your benefits.`}
                </AlertDescription>
              </Alert>
            )}

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-3">
              {locale === "es"
                ? "Características incluidas"
                : "Included features"}
            </h3>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <div className="flex gap-3">
              {currentPlan !== "PREMIUM_PLUS" && (
                <Button
                  className="flex-1"
                  onClick={() =>
                    router.push(getLocalePath("/subscription/upgrade"))
                  }
                >
                  <Crown className="h-4 w-4 mr-2" />
                  {locale === "es" ? "Mejorar Plan" : "Upgrade Plan"}
                </Button>
              )}
              {currentPlan === "FREE" && (
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push(getLocalePath("/pricing"))}
                >
                  {locale === "es" ? "Ver Planes" : "View Plans"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>

            {/* Cancel Subscription */}
            {subscription && isActive && currentPlan !== "FREE" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700"
                    disabled={cancelling}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    {locale === "es"
                      ? "Cancelar Suscripción"
                      : "Cancel Subscription"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {locale === "es"
                        ? "¿Cancelar suscripción?"
                        : "Cancel subscription?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {locale === "es"
                        ? `Tu suscripción ${
                            plan.name
                          } será cancelada. Mantendrás acceso hasta ${endDate?.toLocaleDateString(
                            "es-BO",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}. Después volverás al plan Gratis.`
                        : `Your ${
                            plan.name
                          } subscription will be cancelled. You'll keep access until ${endDate?.toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}. After that, you'll return to the Free plan.`}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      {locale === "es" ? "No, mantener" : "No, keep it"}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleCancelSubscription}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {locale === "es" ? "Sí, cancelar" : "Yes, cancel"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Usage Limits Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            {locale === "es" ? "Límites de Uso" : "Usage Limits"}
          </CardTitle>
          <CardDescription>
            {locale === "es"
              ? "Uso actual de tu plan"
              : "Current usage of your plan"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>{locale === "es" ? "Propiedades" : "Properties"}</span>
                <span className="text-muted-foreground">
                  {locale === "es" ? "Ver en Dashboard" : "View in Dashboard"}
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  router.push(getLocalePath("/dashboard/properties"))
                }
              >
                {locale === "es" ? "Ver Mis Propiedades" : "View My Properties"}
              </Button>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>{locale === "es" ? "Favoritos" : "Favorites"}</span>
                <span className="text-muted-foreground">
                  {currentPlan === "FREE"
                    ? locale === "es"
                      ? "Máximo 10"
                      : "Max 10"
                    : locale === "es"
                    ? "Ilimitados"
                    : "Unlimited"}
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(getLocalePath("/favorites"))}
              >
                {locale === "es" ? "Ver Favoritos" : "View Favorites"}
              </Button>
            </div>
            {currentPlan !== "FREE" && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>
                    {locale === "es" ? "Historial de Pagos" : "Payment History"}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    router.push(getLocalePath("/subscription/payments"))
                  }
                >
                  {locale === "es" ? "Ver Pagos" : "View Payments"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
