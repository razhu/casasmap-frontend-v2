"use client";

import { useParams } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/auth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function PricingPage() {
  const params = useParams();
  const locale = (params.locale as string) || "es";
  const { user } = useAuthStore();

  const currentPlan = user?.subscriptions?.[0]?.plan || "FREE";

  const plans = [
    {
      name: "FREE",
      price: 0,
      nameEs: "Gratis",
      nameEn: "Free",
      descriptionEs: "Para empezar",
      descriptionEn: "To get started",
      features: [
        {
          es: "Hasta 3 propiedades",
          en: "Up to 3 properties",
        },
        {
          es: "10 favoritos",
          en: "10 favorites",
        },
        {
          es: "3 búsquedas guardadas",
          en: "3 saved searches",
        },
        {
          es: "Mensajes de texto",
          en: "Text messages",
        },
      ],
    },
    {
      name: "PREMIUM",
      price: 29,
      nameEs: "Premium",
      nameEn: "Premium",
      descriptionEs: "Para agentes",
      descriptionEn: "For agents",
      popular: true,
      features: [
        {
          es: "Hasta 50 propiedades",
          en: "Up to 50 properties",
        },
        {
          es: "Favoritos ilimitados",
          en: "Unlimited favorites",
        },
        {
          es: "20 búsquedas guardadas",
          en: "20 saved searches",
        },
        {
          es: "Mensajes con imágenes",
          en: "Messages with images",
        },
        {
          es: "Estadísticas avanzadas",
          en: "Advanced analytics",
        },
        {
          es: "Soporte prioritario",
          en: "Priority support",
        },
      ],
    },
    {
      name: "PREMIUM_PLUS",
      price: 99,
      nameEs: "Premium Plus",
      nameEn: "Premium Plus",
      descriptionEs: "Para inmobiliarias",
      descriptionEn: "For agencies",
      features: [
        {
          es: "Propiedades ilimitadas",
          en: "Unlimited properties",
        },
        {
          es: "Todo de Premium",
          en: "Everything in Premium",
        },
        {
          es: "Reportes de mercado",
          en: "Market reports",
        },
        {
          es: "API access",
          en: "API access",
        },
        {
          es: "Marca personalizada",
          en: "Custom branding",
        },
        {
          es: "Soporte dedicado",
          en: "Dedicated support",
        },
      ],
    },
  ];

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSelectPlan = async (planName: string) => {
    setIsLoading(planName);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(null);
      toast({
        title: locale === "es" ? "Plan seleccionado" : "Plan selected",
        description: locale === "es"
          ? `Has seleccionado el plan ${planName}. La integración de pagos estará disponible pronto.`
          : `You selected ${planName} plan. Payment integration coming soon.`,
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {locale === "es" ? "Planes y Precios" : "Plans & Pricing"}
        </h1>
        <p className="text-xl text-muted-foreground">
          {locale === "es"
            ? "Elige el plan perfecto para tu negocio"
            : "Choose the perfect plan for your business"}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""
              }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                {locale === "es" ? "Más Popular" : "Most Popular"}
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">
                {locale === "es" ? plan.nameEs : plan.nameEn}
              </CardTitle>
              <CardDescription>
                {locale === "es" ? plan.descriptionEs : plan.descriptionEn}
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">
                  /{locale === "es" ? "mes" : "month"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      {locale === "es" ? feature.es : feature.en}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                disabled={currentPlan === plan.name || isLoading !== null}
                onClick={() => handleSelectPlan(plan.name)}
              >
                {isLoading === plan.name ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {currentPlan === plan.name
                  ? locale === "es"
                    ? "Plan Actual"
                    : "Current Plan"
                  : locale === "es"
                    ? "Seleccionar"
                    : "Select"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>
          {locale === "es"
            ? "Todos los precios en USD. Puedes cancelar en cualquier momento."
            : "All prices in USD. You can cancel anytime."}
        </p>
      </div>
    </div>
  );
}
