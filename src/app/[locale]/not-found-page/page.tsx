"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFoundPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "es";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <Card className="max-w-lg w-full">
        <CardContent className="pt-12 pb-12 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-8xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold">
              {locale === "es" ? "Página no encontrada" : "Page not found"}
            </h2>
            <p className="text-muted-foreground">
              {locale === "es"
                ? "Lo sentimos, la página que buscas no existe."
                : "Sorry, the page you're looking for doesn't exist."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button onClick={() => router.back()} variant="outline" size="lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {locale === "es" ? "Volver" : "Go Back"}
            </Button>
            <Button
              onClick={() => router.push(locale === "es" ? "/" : `/${locale}`)}
              size="lg"
            >
              <Home className="h-4 w-4 mr-2" />
              {locale === "es" ? "Ir al Inicio" : "Go Home"}
            </Button>
          </div>
          <div className="pt-4">
            <Button
              onClick={() =>
                router.push(
                  locale === "es" ? "/properties" : `/${locale}/properties`
                )
              }
              variant="link"
            >
              <Search className="h-4 w-4 mr-2" />
              {locale === "es" ? "Buscar Propiedades" : "Search Properties"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
