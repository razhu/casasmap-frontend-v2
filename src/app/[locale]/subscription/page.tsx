"use client";

import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMeQuery } from "@/lib/graphql/generated";
import { SubscriptionStatus } from "@/components/subscription/subscription-status";
import { UsageLimits } from "@/components/subscription/usage-limits";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowUpCircle } from "lucide-react";
import Link from "next/link";

// Hardcoded limits based on plan - ideally should come from backend config query
const PLAN_LIMITS = {
    FREE: {
        maxProperties: 3,
        maxFavorites: 10,
        maxSavedSearches: 3,
    },
    PREMIUM: {
        maxProperties: 50,
        maxFavorites: -1, // Unlimited
        maxSavedSearches: 20,
    },
    PREMIUM_PLUS: {
        maxProperties: -1,
        maxFavorites: -1,
        maxSavedSearches: -1,
    },
};

export default function SubscriptionPage() {
    const params = useParams();
    const locale = (params.locale as string) || "es";
    const t = useTranslations("subscription");
    const router = useRouter();

    const { data, loading, error } = useMeQuery({
        fetchPolicy: "cache-and-network",
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !data?.me) {
        return (
            <div className="container mx-auto py-12 text-center">
                <h1 className="text-2xl font-bold text-red-500">{t("errorLoading")}</h1>
                <Button onClick={() => window.location.reload()} className="mt-4">
                    {t("retry")}
                </Button>
            </div>
        );
    }

    const subscription = data.me.subscriptions?.[0] || null;
    const currentPlan = (subscription?.plan || "FREE") as keyof typeof PLAN_LIMITS;
    const limits = PLAN_LIMITS[currentPlan] || PLAN_LIMITS.FREE;

    // Mock stats - in real app, these should come from separate queries or added to MeQuery
    // For now we will assume some values or 0
    const stats = {
        propertiesCount: 0, // TODO: Fetch real count
        favoritesCount: 0, // TODO: Get from myFavorites query
        savedSearchesCount: 0, // TODO: Get from mySavedSearches query
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">{t("title")}</h1>
                    <p className="text-muted-foreground">{t("subtitle")}</p>
                </div>
                {currentPlan !== "PREMIUM_PLUS" && (
                    <Button asChild className="gap-2">
                        <Link href={`/${locale}/pricing`}>
                            <ArrowUpCircle className="h-4 w-4" />
                            {t("upgrade")}
                        </Link>
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <SubscriptionStatus subscription={subscription} locale={locale} />

                    {/* Recent Invoices / Payment History could go here */}
                </div>

                <div className="space-y-8">
                    <UsageLimits stats={stats} limits={limits} locale={locale} />

                    {/* Help / Support Card */}
                </div>
            </div>
        </div>
    );
}
