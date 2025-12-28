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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyFormData } from "@/app/[locale]/properties/new/page";

const step3Schema = z.object({
  address: z.string().min(10, "Address must be at least 10 characters"),
  countryId: z.number().min(1, "Please select a country"),
  stateId: z.number().min(1, "Please select a state"),
  cityId: z.number().min(1, "Please select a city"),
  zoneId: z.number().min(1, "Please select a zone"),
});

type Step3FormData = z.infer<typeof step3Schema>;

interface Props {
  data: PropertyFormData;
  onNext: (data: Partial<PropertyFormData>) => void;
  onBack: () => void;
  locale: string;
}

export function PropertyFormStep3({ data, onNext, onBack, locale }: Props) {
  const form = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      address: data.address || "",
      countryId: data.countryId || undefined,
      stateId: data.stateId || undefined,
      cityId: data.cityId || undefined,
      zoneId: data.zoneId || undefined,
    },
  });

  const onSubmit = (formData: Step3FormData) => {
    onNext(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === "es" ? "Dirección completa" : "Full address"} *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    locale === "es"
                      ? "Ej: Av. Arce 2081, Sopocachi"
                      : "E.g: Av. Arce 2081, Sopocachi"
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {locale === "es"
                  ? "Calle, número, zona o barrio"
                  : "Street, number, neighborhood"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Country */}
        <FormField
          control={form.control}
          name="countryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locale === "es" ? "País" : "Country"} *</FormLabel>
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
                  <SelectItem value="1">Bolivia</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* State */}
        <FormField
          control={form.control}
          name="stateId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === "es" ? "Departamento" : "State"} *
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
                  <SelectItem value="1">La Paz</SelectItem>
                  <SelectItem value="2">Cochabamba</SelectItem>
                  <SelectItem value="3">Santa Cruz</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City */}
        <FormField
          control={form.control}
          name="cityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locale === "es" ? "Ciudad" : "City"} *</FormLabel>
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
                  <SelectItem value="1">La Paz</SelectItem>
                  <SelectItem value="2">El Alto</SelectItem>
                  <SelectItem value="3">Cochabamba</SelectItem>
                  <SelectItem value="4">Santa Cruz de la Sierra</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Zone */}
        <FormField
          control={form.control}
          name="zoneId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locale === "es" ? "Zona" : "Zone"} *</FormLabel>
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
                  <SelectItem value="1">Sopocachi</SelectItem>
                  <SelectItem value="2">Calacoto</SelectItem>
                  <SelectItem value="3">San Miguel</SelectItem>
                  <SelectItem value="4">Achumani</SelectItem>
                  <SelectItem value="5">Obrajes</SelectItem>
                  <SelectItem value="6">Miraflores</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            {locale === "es" ? "Atrás" : "Back"}
          </Button>
          <Button type="submit" size="lg">
            {locale === "es" ? "Siguiente" : "Next"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
