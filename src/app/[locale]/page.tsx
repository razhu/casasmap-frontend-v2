import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">{t("hero.searchButton")}</Button>
            <Button size="lg" variant="outline">
              {t("hero.publishButton")}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>🏠 {t("features.properties.title")}</CardTitle>
              <CardDescription>
                {t("features.properties.description")}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>🗺️ {t("features.maps.title")}</CardTitle>
              <CardDescription>
                {t("features.maps.description")}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>⭐ {t("features.agents.title")}</CardTitle>
              <CardDescription>
                {t("features.agents.description")}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">{t("cta.title")}</CardTitle>
            <CardDescription className="text-lg">
              {t("cta.subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" className="w-full md:w-auto">
              {t("cta.button")}
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
