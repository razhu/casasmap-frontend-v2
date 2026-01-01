"use client";

import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import {
  usePropertyQuery,
  useUpdatePropertyMutation,
} from "@/lib/graphql/generated";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "es";
  const propertyId = params.id as string;
  const t = useTranslations("properties");
  const { toast } = useToast();

  const { data, loading, error } = usePropertyQuery({
    variables: { id: propertyId },
  });

  const [updateProperty, { loading: updating }] = useUpdatePropertyMutation();

  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    description: "",
    descriptionEn: "",
    priceUS: 0,
    priceBS: 0,
    address: "",
    bedrooms: 0,
    bathrooms: 0,
    totalArea: 0,
    coveredArea: 0,
    parkingSpaces: 0,
    yearBuilt: null as number | null,
    phoneNumber: "",
    furnished: false,
    pool: false,
    balcony: false,
    terrace: false,
    storage: false,
    security: false,
    petsAllowed: false,
  });

  useEffect(() => {
    if (data?.property) {
      const property = data.property;
      setFormData({
        title: property.title,
        titleEn: property.titleEn || "",
        description: property.description,
        descriptionEn: property.descriptionEn || "",
        priceUS: property.priceUS || 0,
        priceBS: property.priceBS || 0,
        address: property.address,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        totalArea: property.totalArea || 0,
        coveredArea: property.coveredArea || 0,
        parkingSpaces: property.parkingSpaces || 0,
        yearBuilt: property.yearBuilt || null,
        phoneNumber: property.phoneNumber || "",
        furnished: property.furnished || false,
        pool: property.pool || false,
        balcony: property.balcony || false,
        terrace: property.terrace || false,
        storage: property.storage || false,
        security: property.security || false,
        petsAllowed: property.petsAllowed || false,
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProperty({
        variables: {
          id: propertyId,
          input: {
            title: formData.title,
            titleEn: formData.titleEn || null,
            description: formData.description,
            descriptionEn: formData.descriptionEn || null,
            priceUS: formData.priceUS,
            priceBS: formData.priceBS,
            address: formData.address,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            totalArea: formData.totalArea,
            coveredArea: formData.coveredArea,
            parkingSpaces: formData.parkingSpaces,
            yearBuilt: formData.yearBuilt,
            phoneNumber: formData.phoneNumber || null,
            furnished: formData.furnished,
            pool: formData.pool,
            balcony: formData.balcony,
            terrace: formData.terrace,
            storage: formData.storage,
            security: formData.security,
            petsAllowed: formData.petsAllowed,
          },
        },
      });

      toast({
        title: locale === "es" ? "Propiedad actualizada" : "Property updated",
        description:
          locale === "es"
            ? "La propiedad ha sido actualizada exitosamente"
            : "Property has been updated successfully",
      });

      router.push(
        `/${locale === "es" ? "" : locale + "/"}inmuebles/${
          data?.property?.slug
        }`
      );
    } catch (err: any) {
      toast({
        title: locale === "es" ? "Error" : "Error",
        description:
          err?.message ||
          (locale === "es"
            ? "No se pudo actualizar la propiedad"
            : "Could not update property"),
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !data?.property) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {locale === "es"
              ? "No se pudo cargar la propiedad"
              : "Could not load property"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {locale === "es" ? "Volver" : "Back"}
      </Button>

      <h1 className="text-3xl font-bold mb-6">
        {locale === "es" ? "Editar Propiedad" : "Edit Property"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === "es" ? "Información Básica" : "Basic Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">
                {locale === "es" ? "Título (Español)" : "Title (Spanish)"} *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="titleEn">
                {locale === "es" ? "Título (Inglés)" : "Title (English)"}
              </Label>
              <Input
                id="titleEn"
                value={formData.titleEn}
                onChange={(e) =>
                  setFormData({ ...formData, titleEn: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="description">
                {locale === "es"
                  ? "Descripción (Español)"
                  : "Description (Spanish)"}{" "}
                *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="descriptionEn">
                {locale === "es"
                  ? "Descripción (Inglés)"
                  : "Description (English)"}
              </Label>
              <Textarea
                id="descriptionEn"
                value={formData.descriptionEn}
                onChange={(e) =>
                  setFormData({ ...formData, descriptionEn: e.target.value })
                }
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="address">
                {locale === "es" ? "Dirección" : "Address"} *
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber">
                {locale === "es" ? "Teléfono" : "Phone"}
              </Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Price & Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === "es" ? "Precio y Detalles" : "Price & Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priceUS">
                  {locale === "es" ? "Precio (USD)" : "Price (USD)"} *
                </Label>
                <Input
                  id="priceUS"
                  type="number"
                  value={formData.priceUS}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priceUS: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="priceBS">
                  {locale === "es" ? "Precio (Bs)" : "Price (Bs)"}
                </Label>
                <Input
                  id="priceBS"
                  type="number"
                  value={formData.priceBS}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priceBS: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms">
                  {locale === "es" ? "Dormitorios" : "Bedrooms"}
                </Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bedrooms: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="bathrooms">
                  {locale === "es" ? "Baños" : "Bathrooms"}
                </Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bathrooms: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalArea">
                  {locale === "es" ? "Área Total (m²)" : "Total Area (m²)"}
                </Label>
                <Input
                  id="totalArea"
                  type="number"
                  value={formData.totalArea}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalArea: parseFloat(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="coveredArea">
                  {locale === "es" ? "Área Cubierta (m²)" : "Covered Area (m²)"}
                </Label>
                <Input
                  id="coveredArea"
                  type="number"
                  value={formData.coveredArea}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      coveredArea: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parkingSpaces">
                  {locale === "es" ? "Estacionamientos" : "Parking Spaces"}
                </Label>
                <Input
                  id="parkingSpaces"
                  type="number"
                  value={formData.parkingSpaces}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      parkingSpaces: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="yearBuilt">
                  {locale === "es" ? "Año de Construcción" : "Year Built"}
                </Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  value={formData.yearBuilt || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      yearBuilt: e.target.value
                        ? parseInt(e.target.value)
                        : null,
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === "es" ? "Comodidades" : "Amenities"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  key: "furnished",
                  label: locale === "es" ? "Amoblado" : "Furnished",
                },
                { key: "pool", label: locale === "es" ? "Piscina" : "Pool" },
                {
                  key: "balcony",
                  label: locale === "es" ? "Balcón" : "Balcony",
                },
                {
                  key: "terrace",
                  label: locale === "es" ? "Terraza" : "Terrace",
                },
                {
                  key: "storage",
                  label: locale === "es" ? "Depósito" : "Storage",
                },
                {
                  key: "security",
                  label: locale === "es" ? "Seguridad" : "Security",
                },
                {
                  key: "petsAllowed",
                  label: locale === "es" ? "Mascotas" : "Pets Allowed",
                },
              ].map((amenity) => (
                <div key={amenity.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.key}
                    checked={
                      formData[amenity.key as keyof typeof formData] as boolean
                    }
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        [amenity.key]: checked,
                      })
                    }
                  />
                  <Label htmlFor={amenity.key} className="cursor-pointer">
                    {amenity.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            {locale === "es" ? "Cancelar" : "Cancel"}
          </Button>
          <Button type="submit" disabled={updating} className="flex-1">
            {updating
              ? locale === "es"
                ? "Actualizando..."
                : "Updating..."
              : locale === "es"
              ? "Actualizar Propiedad"
              : "Update Property"}
          </Button>
        </div>
      </form>
    </div>
  );
}
