"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { PropertyFormData } from "@/app/[locale]/properties/new/page";
import { Card } from "@/components/ui/card";
import {
  Sofa,
  Waves,
  Wind,
  Shield,
  Package,
  PawPrint,
  Home,
} from "lucide-react";

const step5Schema = z.object({
  furnished: z.boolean().optional(),
  pool: z.boolean().optional(),
  balcony: z.boolean().optional(),
  terrace: z.boolean().optional(),
  security: z.boolean().optional(),
  storage: z.boolean().optional(),
  petsAllowed: z.boolean().optional(),
});

type Step5FormData = z.infer<typeof step5Schema>;

interface Props {
  data: PropertyFormData;
  onSubmit: (data: Partial<PropertyFormData>) => void;
  onBack: () => void;
  locale: string;
  isSubmitting?: boolean;
}

export function PropertyFormStep5({
  data,
  onSubmit,
  onBack,
  locale,
  isSubmitting,
}: Props) {
  const form = useForm<Step5FormData>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      furnished: data.furnished || false,
      pool: data.pool || false,
      balcony: data.balcony || false,
      terrace: data.terrace || false,
      security: data.security || false,
      storage: data.storage || false,
      petsAllowed: data.petsAllowed || false,
    },
  });

  const handleSubmit = (formData: Step5FormData) => {
    onSubmit(formData);
  };

  const features = [
    {
      name: "furnished",
      icon: Sofa,
      labelEs: "Amoblado",
      labelEn: "Furnished",
    },
    {
      name: "pool",
      icon: Waves,
      labelEs: "Piscina",
      labelEn: "Pool",
    },
    {
      name: "balcony",
      icon: Wind,
      labelEs: "Balcón",
      labelEn: "Balcony",
    },
    {
      name: "terrace",
      icon: Home,
      labelEs: "Terraza",
      labelEn: "Terrace",
    },
    {
      name: "security",
      icon: Shield,
      labelEs: "Seguridad 24/7",
      labelEn: "24/7 Security",
    },
    {
      name: "storage",
      icon: Package,
      labelEs: "Depósito",
      labelEn: "Storage",
    },
    {
      name: "petsAllowed",
      icon: PawPrint,
      labelEs: "Mascotas permitidas",
      labelEn: "Pets allowed",
    },
  ];

  // Build preview data
  const previewData = { ...data, ...form.watch() };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Features Grid */}
        <div>
          <FormLabel className="text-base">
            {locale === "es"
              ? "Características adicionales"
              : "Additional features"}
          </FormLabel>
          <FormDescription className="mb-4">
            {locale === "es"
              ? "Selecciona las características que aplican a tu propiedad"
              : "Select the features that apply to your property"}
          </FormDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <FormField
                key={feature.name}
                control={form.control}
                name={feature.name as keyof Step5FormData}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <FormControl>
                        <Checkbox
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <feature.icon className="w-5 h-5 text-gray-600" />
                      <FormLabel className="font-normal cursor-pointer flex-1">
                        {locale === "es" ? feature.labelEs : feature.labelEn}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* Preview Card */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            {locale === "es" ? "Vista previa" : "Preview"}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {locale === "es" ? "Título:" : "Title:"}
              </span>
              <span className="font-medium dark:text-gray-200">
                {locale === "es" ? previewData.title : previewData.titleEn}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {locale === "es" ? "Tipo:" : "Type:"}
              </span>
              <span className="font-medium dark:text-gray-200">
                {previewData.propertyTypeId === 1
                  ? locale === "es"
                    ? "Casa"
                    : "House"
                  : previewData.propertyTypeId === 2
                  ? locale === "es"
                    ? "Departamento"
                    : "Apartment"
                  : locale === "es"
                  ? "Otro"
                  : "Other"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {locale === "es" ? "Precio:" : "Price:"}
              </span>
              <span className="font-medium dark:text-gray-200">
                {previewData.priceUS
                  ? `$${previewData.priceUS.toLocaleString()}`
                  : previewData.priceBS
                  ? `Bs ${previewData.priceBS.toLocaleString()}`
                  : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {locale === "es" ? "Área:" : "Area:"}
              </span>
              <span className="font-medium dark:text-gray-200">
                {previewData.totalArea ? `${previewData.totalArea} m²` : "-"}
              </span>
            </div>
            {(previewData.bedrooms || previewData.bathrooms) && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {locale === "es" ? "Habitaciones:" : "Rooms:"}
                </span>
                <span className="font-medium dark:text-gray-200">
                  {previewData.bedrooms || 0} {locale === "es" ? "dorm" : "bed"}{" "}
                  • {previewData.bathrooms || 0}{" "}
                  {locale === "es" ? "baños" : "bath"}
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* Info Message */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            {locale === "es"
              ? "✓ Tu propiedad será revisada por nuestro equipo antes de publicarse. Te notificaremos por email cuando esté aprobada."
              : "✓ Your property will be reviewed by our team before publishing. We'll notify you by email when it's approved."}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
          >
            {locale === "es" ? "Atrás" : "Back"}
          </Button>
          <Button
            type="submit"
            size="lg"
            className="min-w-[150px]"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? locale === "es"
                ? "Publicando..."
                : "Publishing..."
              : locale === "es"
              ? "Publicar propiedad"
              : "Publish property"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
