"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as string) || "es";

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  // Remove locale from pathname for processing
  const cleanPath =
    pathname?.replace(`/${locale}`, "").replace(/^\//, "") || "";

  if (!cleanPath || cleanPath === "") {
    return null; // Don't show breadcrumbs on home page
  }

  const segments = cleanPath.split("/").filter(Boolean);

  // Map segments to readable labels
  const getLabelForSegment = (segment: string, index: number): string => {
    const labels: Record<string, Record<string, string>> = {
      properties: { es: "Propiedades", en: "Properties" },
      inmuebles: { es: "Inmuebles", en: "Properties" },
      favorites: { es: "Favoritos", en: "Favorites" },
      messages: { es: "Consultas", en: "Inquiries" },
      "saved-searches": { es: "Búsquedas Guardadas", en: "Saved Searches" },
      dashboard: { es: "Panel", en: "Dashboard" },
      analytics: { es: "Estadísticas", en: "Analytics" },
      profile: { es: "Perfil", en: "Profile" },
      edit: { es: "Editar", en: "Edit" },
      new: { es: "Nueva", en: "New" },
      subscription: { es: "Suscripción", en: "Subscription" },
      upgrade: { es: "Mejorar", en: "Upgrade" },
      payments: { es: "Pagos", en: "Payments" },
      pricing: { es: "Precios", en: "Pricing" },
      reports: { es: "Reportes", en: "Reports" },
      comparison: { es: "Comparar", en: "Compare" },
      login: { es: "Iniciar Sesión", en: "Login" },
      register: { es: "Registrarse", en: "Register" },
      compare: { es: "Comparar", en: "Compare" },
      inquiries: { es: "Consultas", en: "Inquiries" },
      notifications: { es: "Notificaciones", en: "Notifications" },
      admin: { es: "Administración", en: "Admin" },
    };

    // Check if it's a UUID or slug (property detail)
    if (
      segment.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      ) ||
      (index > 0 &&
        (segments[index - 1] === "inmuebles" ||
          segments[index - 1] === "properties"))
    ) {
      return locale === "es" ? "Detalle" : "Detail";
    }

    return (
      labels[segment]?.[locale] ||
      segment.charAt(0).toUpperCase() + segment.slice(1)
    );
  };

  const buildPath = (index: number): string => {
    const path = "/" + segments.slice(0, index + 1).join("/");
    return getLocalePath(path);
  };

  return (
    <div className="border-b bg-muted/30">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Link
            href={getLocalePath("/")}
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
          </Link>
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const label = getLabelForSegment(segment, index);

            return (
              <div key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-1" />
                {isLast ? (
                  <span className="font-medium text-foreground">{label}</span>
                ) : (
                  <Link
                    href={buildPath(index)}
                    className="hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
