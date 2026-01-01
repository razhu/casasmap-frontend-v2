"use client";

import { useTranslations } from "next-intl";
import {
    Building2,
    Heart,
    Search,
    MessageSquare
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UsageLimitsProps {
    stats: {
        propertiesCount: number;
        favoritesCount: number; // Inferred from favorites list length if not in stats
        savedSearchesCount: number;
    };
    limits: {
        maxProperties: number;
        maxFavorites: number;
        maxSavedSearches: number;
    };
    locale: string;
}

export function UsageLimits({ stats, limits, locale }: UsageLimitsProps) {
    const t = useTranslations("subscription.usage");

    const getPercentage = (current: number, max: number) => {
        if (max === -1) return 0; // Unlimited
        return Math.min(100, (current / max) * 100);
    };

    const isUnlimited = (val: number) => val === -1;

    const items = [
        {
            icon: Building2,
            label: t("properties"),
            current: stats.propertiesCount,
            max: limits.maxProperties,
        },
        {
            icon: Heart,
            label: t("favorites"),
            current: stats.favoritesCount,
            max: limits.maxFavorites,
        },
        {
            icon: Search,
            label: t("savedSearches"),
            current: stats.savedSearchesCount,
            max: limits.maxSavedSearches,
        }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("title")}</CardTitle>
                <CardDescription>{t("subtitle")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {items.map((item, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <item.icon className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{item.label}</span>
                            </div>
                            <span className="text-muted-foreground">
                                {item.current} / {isUnlimited(item.max) ? "∞" : item.max}
                            </span>
                        </div>
                        {!isUnlimited(item.max) && (
                            <Progress value={getPercentage(item.current, item.max)} className="h-2" />
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
