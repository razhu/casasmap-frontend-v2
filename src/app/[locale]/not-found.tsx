"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "es";

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-bold">
          {locale === "es" ? "Página no encontrada" : "Page not found"}
        </h2>
        <p className="text-muted-foreground">
          {locale === "es"
            ? "Lo sentimos, la página que buscas no existe o ha sido movida."
            : "Sorry, the page you're looking for doesn't exist or has been moved."}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {locale === "es" ? "Volver" : "Go Back"}
          </Button>
          <Button
            onClick={() => router.push(locale === "es" ? "/" : `/${locale}`)}
          >
            <Home className="h-4 w-4 mr-2" />
            {locale === "es" ? "Ir al Inicio" : "Go Home"}
          </Button>
        </div>
      </div>
    </div>
  );
}
