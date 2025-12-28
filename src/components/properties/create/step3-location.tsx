"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
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
import {
  useCountriesQuery,
  useStatesQuery,
  useCitiesQuery,
  useZonesQuery,
} from "@/lib/graphql/generated";
import { Loader2 } from "lucide-react";

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

  // Watch form values for dependent dropdowns
  const selectedCountryId = form.watch("countryId");
  const selectedStateId = form.watch("stateId");
  const selectedCityId = form.watch("cityId");

  // Fetch data
  const { data: countriesData, loading: countriesLoading } =
    useCountriesQuery();
  const { data: statesData, loading: statesLoading } = useStatesQuery({
    variables: { countryId: selectedCountryId || 0 },
    skip: !selectedCountryId,
  });
  const { data: citiesData, loading: citiesLoading } = useCitiesQuery({
    variables: { stateId: selectedStateId || 0 },
    skip: !selectedStateId,
  });
  const { data: zonesData, loading: zonesLoading } = useZonesQuery({
    variables: { cityId: selectedCityId || 0 },
    skip: !selectedCityId,
  });

  // Reset dependent fields when parent changes
  useEffect(() => {
    if (selectedCountryId) {
      form.setValue("stateId", undefined as any);
      form.setValue("cityId", undefined as any);
      form.setValue("zoneId", undefined as any);
    }
  }, [selectedCountryId, form]);

  useEffect(() => {
    if (selectedStateId) {
      form.setValue("cityId", undefined as any);
      form.setValue("zoneId", undefined as any);
    }
  }, [selectedStateId, form]);

  useEffect(() => {
    if (selectedCityId) {
      form.setValue("zoneId", undefined as any);
    }
  }, [selectedCityId, form]);

  const onSubmit = (formData: Step3FormData) => {
    onNext(formData);
  };

  const countries = countriesData?.countries || [];
  const states = statesData?.states || [];
  const cities = citiesData?.cities || [];
  const zones = zonesData?.zones || [];

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
                disabled={countriesLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        countriesLoading
                          ? locale === "es"
                            ? "Cargando..."
                            : "Loading..."
                          : locale === "es"
                          ? "Seleccionar"
                          : "Select"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id.toString()}>
                      {country.name}
                    </SelectItem>
                  ))}
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
                disabled={!selectedCountryId || statesLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        !selectedCountryId
                          ? locale === "es"
                            ? "Selecciona un país primero"
                            : "Select a country first"
                          : statesLoading
                          ? locale === "es"
                            ? "Cargando..."
                            : "Loading..."
                          : locale === "es"
                          ? "Seleccionar"
                          : "Select"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statesLoading ? (
                    <div className="flex items-center justify-center p-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    states.map((state) => (
                      <SelectItem key={state.id} value={state.id.toString()}>
                        {state.name}
                      </SelectItem>
                    ))
                  )}
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
                disabled={!selectedStateId || citiesLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        !selectedStateId
                          ? locale === "es"
                            ? "Selecciona un departamento primero"
                            : "Select a state first"
                          : citiesLoading
                          ? locale === "es"
                            ? "Cargando..."
                            : "Loading..."
                          : locale === "es"
                          ? "Seleccionar"
                          : "Select"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {citiesLoading ? (
                    <div className="flex items-center justify-center p-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    cities.map((city) => (
                      <SelectItem key={city.id} value={city.id.toString()}>
                        {city.name}
                      </SelectItem>
                    ))
                  )}
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
                disabled={!selectedCityId || zonesLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        !selectedCityId
                          ? locale === "es"
                            ? "Selecciona una ciudad primero"
                            : "Select a city first"
                          : zonesLoading
                          ? locale === "es"
                            ? "Cargando..."
                            : "Loading..."
                          : locale === "es"
                          ? "Seleccionar"
                          : "Select"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {zonesLoading ? (
                    <div className="flex items-center justify-center p-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    zones.map((zone) => (
                      <SelectItem key={zone.id} value={zone.id.toString()}>
                        {zone.name}
                      </SelectItem>
                    ))
                  )}
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
