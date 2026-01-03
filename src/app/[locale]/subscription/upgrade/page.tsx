"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useCurrentSubscriptionQuery } from "@/lib/graphql/generated";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CheckCircle2,
  Crown,
  ArrowLeft,
  CreditCard,
  Building2,
  Smartphone,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UpgradePage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "es";
  const { user } = useAuthStore();
  const { toast } = useToast();

  const [selectedPlan, setSelectedPlan] = useState<string>("PREMIUM");
  const [paymentMethod, setPaymentMethod] = useState<string>("BANK_TRANSFER");
  const [processing, setProcessing] = useState(false);

  const { data, loading } = useCurrentSubscriptionQuery({
    skip: !user,
  });

  const currentPlan = data?.currentSubscription?.plan || "FREE";

  const plans = [
    {
      id: "PREMIUM",
      name: "Premium",
      price: 29,
      currency: "USD",
      features: [
        locale === "es" ? "50 propiedades por mes" : "50 properties per month",
        locale === "es" ? "Favoritos ilimitados" : "Unlimited favorites",
        locale === "es" ? "Mensajería directa" : "Direct messaging",
        locale === "es" ? "Reportes de mercado" : "Market reports",
        locale === "es" ? "Volantes PDF" : "PDF flyers",
      ],
    },
    {
      id: "PREMIUM_PLUS",
      name: "Premium Plus",
      price: 99,
      currency: "USD",
      features: [
        locale === "es" ? "Propiedades ilimitadas" : "Unlimited properties",
        locale === "es" ? "Prioridad en búsquedas" : "Priority in searches",
        locale === "es" ? "Destacado en resultados" : "Featured in results",
        locale === "es" ? "Análisis avanzado" : "Advanced analytics",
        locale === "es" ? "Soporte prioritario" : "Priority support",
      ],
    },
  ];

  const paymentMethods = [
    {
      id: "BANK_TRANSFER",
      name: locale === "es" ? "Transferencia Bancaria" : "Bank Transfer",
      icon: Building2,
      description:
        locale === "es"
          ? "Transferencia directa a nuestra cuenta bancaria"
          : "Direct transfer to our bank account",
    },
    {
      id: "STRIPE",
      name: locale === "es" ? "Tarjeta de Crédito/Débito" : "Credit/Debit Card",
      icon: CreditCard,
      description:
        locale === "es"
          ? "Pago seguro con Stripe (Próximamente)"
          : "Secure payment with Stripe (Coming Soon)",
      disabled: true,
    },
    {
      id: "MERCADOPAGO",
      name: "Mercado Pago",
      icon: Smartphone,
      description:
        locale === "es"
          ? "Pago con Mercado Pago (Próximamente)"
          : "Pay with Mercado Pago (Coming Soon)",
      disabled: true,
    },
  ];

  const handleUpgrade = async () => {
    setProcessing(true);

    try {
      // TODO: Integrate with payment gateway
      // For now, show placeholder message

      if (paymentMethod === "BANK_TRANSFER") {
        toast({
          title:
            locale === "es" ? "Instrucciones de pago" : "Payment instructions",
          description:
            locale === "es"
              ? "Recibirás un correo con las instrucciones para realizar la transferencia bancaria."
              : "You'll receive an email with instructions for the bank transfer.",
        });

        // In production, this would:
        // 1. Create payment record
        // 2. Send email with bank details
        // 3. Redirect to payment confirmation page

        setTimeout(() => {
          router.push(`/${locale === "es" ? "" : locale + "/"}subscription`);
        }, 2000);
      } else {
        toast({
          title: locale === "es" ? "Próximamente" : "Coming Soon",
          description:
            locale === "es"
              ? "Este método de pago estará disponible pronto."
              : "This payment method will be available soon.",
          variant: "default",
        });
      }
    } catch (err: any) {
      toast({
        title: locale === "es" ? "Error" : "Error",
        description:
          err?.message ||
          (locale === "es"
            ? "No se pudo procesar el pago"
            : "Could not process payment"),
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Skeleton className="h-12 w-64 mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {locale === "es" ? "Volver" : "Back"}
      </Button>

      <h1 className="text-3xl font-bold mb-2">
        {locale === "es" ? "Mejorar Plan" : "Upgrade Plan"}
      </h1>
      <p className="text-muted-foreground mb-6">
        {locale === "es"
          ? "Selecciona un plan y método de pago"
          : "Select a plan and payment method"}
      </p>

      {/* Current Plan Alert */}
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {locale === "es"
            ? `Plan actual: ${currentPlan}`
            : `Current plan: ${currentPlan}`}
        </AlertDescription>
      </Alert>

      {/* Plan Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            {locale === "es" ? "Selecciona un Plan" : "Select a Plan"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
            <div className="space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedPlan === plan.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <RadioGroupItem
                    value={plan.id}
                    id={plan.id}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={plan.id} className="cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-lg">
                          {plan.name}
                        </span>
                        <span className="text-2xl font-bold">
                          ${plan.price}
                          <span className="text-sm text-muted-foreground font-normal">
                            /{locale === "es" ? "mes" : "month"}
                          </span>
                        </span>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Method Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            {locale === "es" ? "Método de Pago" : "Payment Method"}
          </CardTitle>
          <CardDescription>
            {locale === "es"
              ? "Selecciona cómo deseas pagar"
              : "Select how you want to pay"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.id}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                      method.disabled
                        ? "opacity-50 cursor-not-allowed"
                        : paymentMethod === method.id
                        ? "border-primary bg-primary/5 cursor-pointer"
                        : "border-border hover:border-primary/50 cursor-pointer"
                    }`}
                    onClick={() =>
                      !method.disabled && setPaymentMethod(method.id)
                    }
                  >
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      disabled={method.disabled}
                    />
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label
                        htmlFor={method.id}
                        className={
                          method.disabled
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }
                      >
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {method.description}
                        </div>
                      </Label>
                    </div>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Summary and Checkout */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === "es" ? "Resumen" : "Summary"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">
              {locale === "es" ? "Plan" : "Plan"}:
            </span>
            <span className="font-semibold">{selectedPlanData?.name}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">
              {locale === "es" ? "Precio" : "Price"}:
            </span>
            <span className="font-semibold">
              ${selectedPlanData?.price} USD
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">
              {locale === "es" ? "Método" : "Method"}:
            </span>
            <span className="font-semibold">
              {paymentMethods.find((m) => m.id === paymentMethod)?.name}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 text-lg font-bold">
            <span>{locale === "es" ? "Total" : "Total"}:</span>
            <span>${selectedPlanData?.price} USD</span>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleUpgrade}
            disabled={processing || paymentMethod !== "BANK_TRANSFER"}
          >
            <Crown className="h-4 w-4 mr-2" />
            {processing
              ? locale === "es"
                ? "Procesando..."
                : "Processing..."
              : locale === "es"
              ? "Continuar al Pago"
              : "Continue to Payment"}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            {locale === "es"
              ? "Al continuar, aceptas nuestros términos y condiciones"
              : "By continuing, you agree to our terms and conditions"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
