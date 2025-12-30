"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCreateSavedSearchMutation } from "@/lib/graphql/generated";
import { useAuthStore } from "@/store/auth";
import { Bookmark, Loader2 } from "lucide-react";

interface SaveSearchButtonProps {
  filters: {
    query?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    propertyTypeId?: number;
    dealTypeId?: number;
    cityId?: number;
    zoneId?: number;
  };
  locale: string;
}

export function SaveSearchButton({ filters, locale }: SaveSearchButtonProps) {
  const router = useRouter();
  const { token, _hasHydrated } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const [createSavedSearch, { loading }] = useCreateSavedSearchMutation();

  const handleSave = async () => {
    if (!token || !_hasHydrated) {
      const loginPath = locale === "es" ? "/login" : `/${locale}/login`;
      router.push(loginPath);
      return;
    }

    if (!name.trim()) {
      return;
    }

    try {
      await createSavedSearch({
        variables: {
          input: {
            name: name.trim(),
            query: filters.query,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            bedrooms: filters.bedrooms,
            bathrooms: filters.bathrooms,
            propertyTypeId: filters.propertyTypeId,
            dealTypeId: filters.dealTypeId,
            cityId: filters.cityId,
            zoneId: filters.zoneId,
            emailAlertsEnabled: alertsEnabled,
          },
        },
      });

      setOpen(false);
      setName("");

      // Show success message or redirect
      const savedSearchesPath =
        locale === "es" ? "/saved-searches" : `/${locale}/saved-searches`;
      router.push(savedSearchesPath);
    } catch (error: any) {
      console.error("Error saving search:", error);
      alert(
        locale === "es"
          ? `Error al guardar búsqueda: ${error.message}`
          : `Error saving search: ${error.message}`
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Bookmark className="h-4 w-4 mr-2" />
          {locale === "es" ? "Guardar búsqueda" : "Save search"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {locale === "es" ? "Guardar búsqueda" : "Save search"}
          </DialogTitle>
          <DialogDescription>
            {locale === "es"
              ? "Guarda esta búsqueda para recibir alertas cuando haya nuevas propiedades que coincidan."
              : "Save this search to receive alerts when new properties match."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {locale === "es" ? "Nombre de la búsqueda" : "Search name"}
            </Label>
            <Input
              id="name"
              placeholder={
                locale === "es"
                  ? "Ej: Casas en Sopocachi"
                  : "E.g: Houses in Sopocachi"
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="alerts">
                {locale === "es" ? "Alertas por email" : "Email alerts"}
              </Label>
              <p className="text-sm text-muted-foreground">
                {locale === "es"
                  ? "Recibe notificaciones de nuevas propiedades"
                  : "Receive notifications of new properties"}
              </p>
            </div>
            <Switch
              id="alerts"
              checked={alertsEnabled}
              onCheckedChange={setAlertsEnabled}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            {locale === "es" ? "Cancelar" : "Cancel"}
          </Button>
          <Button onClick={handleSave} disabled={loading || !name.trim()}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {locale === "es" ? "Guardar" : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
