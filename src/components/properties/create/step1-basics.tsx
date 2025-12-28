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
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyFormData } from "@/app/[locale]/properties/new/page";

const step1Schema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  titleEn: z
    .string()
    .min(10, "English title must be at least 10 characters")
    .optional()
    .or(z.literal("")),
  description: z.string().min(50, "Description must be at least 50 characters"),
  descriptionEn: z
    .string()
    .min(50, "English description must be at least 50 characters")
    .optional()
    .or(z.literal("")),
  propertyTypeId: z.number().min(1, "Please select a property type"),
  dealTypeId: z.number().min(1, "Please select a deal type"),
});

type Step1FormData = z.infer<typeof step1Schema>;

interface Props {
  data: PropertyFormData;
  onNext: (data: Partial<PropertyFormData>) => void;
  locale: string;
}

export function PropertyFormStep1({ data, onNext, locale }: Props) {
  const form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      title: data.title || "",
      titleEn: data.titleEn || "",
      description: data.description || "",
      descriptionEn: data.descriptionEn || "",
      propertyTypeId: data.propertyTypeId || undefined,
      dealTypeId: data.dealTypeId || undefined,
    },
  });

  const onSubmit = (formData: Step1FormData) => {
    onNext(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Property Type */}
        <FormField
          control={form.control}
          name="propertyTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === "es" ? "Tipo de propiedad" : "Property type"} *
              </FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={locale === "es" ? "Seleccionar" : "Select"}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">
                    {locale === "es" ? "Casa" : "House"}
                  </SelectItem>
                  <SelectItem value="2">
                    {locale === "es" ? "Departamento" : "Apartment"}
                  </SelectItem>
                  <SelectItem value="3">
                    {locale === "es" ? "Terreno" : "Land"}
                  </SelectItem>
                  <SelectItem value="4">
                    {locale === "es" ? "Oficina" : "Office"}
                  </SelectItem>
                  <SelectItem value="5">
                    {locale === "es" ? "Local Comercial" : "Commercial"}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Deal Type */}
        <FormField
          control={form.control}
          name="dealTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === "es" ? "Tipo de operación" : "Deal type"} *
              </FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={locale === "es" ? "Seleccionar" : "Select"}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">
                    {locale === "es" ? "Venta" : "Sale"}
                  </SelectItem>
                  <SelectItem value="2">
                    {locale === "es" ? "Alquiler" : "Rent"}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title (Spanish) */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === "es" ? "Título (Español)" : "Title (Spanish)"} *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    locale === "es"
                      ? "Ej: Hermoso departamento en Sopocachi"
                      : "E.g: Beautiful apartment in Sopocachi"
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {locale === "es"
                  ? "Título atractivo que describa tu propiedad"
                  : "Catchy title that describes your property"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title (English) */}
        <FormField
          control={form.control}
          name="titleEn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === "es" ? "Título (Inglés)" : "Title (English)"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="E.g: Beautiful apartment in Sopocachi"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {locale === "es" ? "Opcional" : "Optional"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description (Spanish) */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === "es"
                  ? "Descripción (Español)"
                  : "Description (Spanish)"}{" "}
                *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    locale === "es"
                      ? "Describe tu propiedad en detalle..."
                      : "Describe your property in detail..."
                  }
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {locale === "es"
                  ? "Incluye detalles importantes, ubicación, características especiales"
                  : "Include important details, location, special features"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description (English) */}
        <FormField
          control={form.control}
          name="descriptionEn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === "es"
                  ? "Descripción (Inglés)"
                  : "Description (English)"}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your property in detail..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {locale === "es" ? "Opcional" : "Optional"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Next Button */}
        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg">
            {locale === "es" ? "Siguiente" : "Next"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
