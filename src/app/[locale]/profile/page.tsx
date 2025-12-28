"use client";

import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Mail, Phone, Calendar, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth";
import { useMeQuery } from "@/lib/graphql/generated";

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("profile");
  const tCommon = useTranslations("common");
  const { user } = useAuthStore();

  const { data, loading } = useMeQuery();

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const getUserInitials = () => {
    const profile = data?.me?.profile;
    if (profile?.firstName && profile?.lastName) {
      return `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString(
      locale === "es" ? "es-BO" : "en-US"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{tCommon("loading")}</p>
      </div>
    );
  }

  const profile = data?.me?.profile;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{t("title")}</CardTitle>
              <CardDescription>{t("personalInfo")}</CardDescription>
            </div>
            <Button onClick={() => router.push(getLocalePath("/profile/edit"))}>
              <Edit className="h-4 w-4 mr-2" />
              {t("edit")}
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.pictureUrl || ""} />
                <AvatarFallback className="text-2xl">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">
                  {profile?.firstName || profile?.lastName
                    ? `${profile?.firstName || ""} ${
                        profile?.lastName || ""
                      }`.trim()
                    : data?.me?.email}
                </h3>
                <p className="text-sm text-muted-foreground">
                  @{data?.me?.username || data?.me?.email?.split("@")[0]}
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("email")}</p>
                  <p className="font-medium">{data?.me?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("phone")}</p>
                  <p className="font-medium">{profile?.phoneNumber || "-"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("birthdate")}
                  </p>
                  <p className="font-medium">
                    {formatDate(profile?.birthdate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("memberSince")}
                  </p>
                  <p className="font-medium">
                    {formatDate(data?.me?.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            {profile?.bio && (
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-2">{t("bio")}</p>
                <p className="text-sm">{profile.bio}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
