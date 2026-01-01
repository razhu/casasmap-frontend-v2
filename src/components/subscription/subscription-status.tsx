"use client";

import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { CreditCard, Calendar, CheckCircle, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubscriptionStatusProps {
  subscription: {
    plan: string;
    status: string;
    startDate: any;
    endDate: any;
  } | null;
  locale: string;
}

export function SubscriptionStatus({
  subscription,
  locale,
}: SubscriptionStatusProps) {
  const t = useTranslations("subscription");
  
  // Helper to format dates
  const formatDate = (date: any) => {
    if (!date) return "";
    return format(new Date(date), "PPP", {
      locale: locale === "es" ? es : enUS,
    });
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case "FREE":
        return locale === "es" ? "Gratis" : "Free";
      case "PREMIUM":
        return "Premium";
      case "PREMIUM_PLUS":
        return "Premium Plus";
      default:
        return plan;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default"; // green/black usually
      case "EXPIRED":
        return "destructive";
      case "CANCELLED":
        return "secondary";
      default:
        return "outline";
    }
  };

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("noSubscription")}</CardTitle>
          <CardDescription>
            {t("noSubscriptionDesc")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href={`/${locale}/pricing`}>{t("viewPlans")}</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Calculate days remaining
  const now = new Date();
  const end = new Date(subscription.endDate);
  const totalDuration = new Date(subscription.endDate).getTime() - new Date(subscription.startDate).getTime();
  const elapsed = now.getTime() - new Date(subscription.startDate).getTime();
  const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  const daysRemaining = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              {getPlanName(subscription.plan)}
              <Badge variant={getStatusColor(subscription.status) as any}>
                {subscription.status}
              </Badge>
            </CardTitle>
            <CardDescription className="mt-1">
              {t("activeUntil")} {formatDate(subscription.endDate)}
            </CardDescription>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <CreditCard className="h-6 w-6" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">{t("cycleProgress")}</span>
            <span className={daysRemaining < 3 ? "text-red-500 font-medium" : ""}>
              {daysRemaining > 0 
                ? `${daysRemaining} ${locale === "es" ? "días restantes" : "days remaining"}`
                : t("expired")
              }
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/50">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-sm">{t("startDate")}</p>
              <p className="text-sm text-muted-foreground">{formatDate(subscription.startDate)}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/50">
            <CheckCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-sm">{t("status")}</p>
              <p className="text-sm text-muted-foreground">{subscription.status}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
