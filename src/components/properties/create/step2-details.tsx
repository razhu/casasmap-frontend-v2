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
import { PropertyFormData } from "@/app/[locale]/properties/new/page";

const step2Schema = z
  .object({
    priceUS: z.number().min(1, "Price is required").optional(),
    priceBS: z.number().min(1, "Price is required").optional(),
    bedrooms: z.number().min(0).optional(),
    bathrooms: z.number().min(0).optional(),
    totalArea: z.number().min(1, "Total area is required"),
    coveredArea: z.number().min(0).optional(),
    yearBuilt: z
      .number()
      .min(1900)
      .max(new Date().getFullYear() + 1)
      .optional(),
    parkingSpaces: z.number().min(0).optional(),
  })
  .refine((data) => data.priceUS || data.priceBS, {
    message: "Please provide at least one price (USD or BS)",
    path: ["priceUS"],
  });

type Step2FormData = z.infer<typeof step2Schema>;

interface Props {
  data: PropertyFormData;
  onNext: (data: Partial<PropertyFormData>) => void;
  onBack: () => void;
  locale: string;
}

export function PropertyFormStep2({ data, onNext, onBack, locale }: Props) {
  const form = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      priceUS: data.priceUS || undefined,
      priceBS: data.priceBS || undefined,
      bedrooms: data.bedrooms || undefined,
      bathrooms: data.bathrooms || undefined,
      totalArea: data.totalArea || undefined,
      coveredArea: data.coveredArea || undefined,
      yearBuilt: data.yearBuilt || undefined,
      parkingSpaces: data.parkingSpaces || undefined,
    },
  });

  const onSubmit = (formData: Step2FormData) => {
    onNext(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Price Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="priceUS"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {locale === "es" ? "Precio (USD)" : "Price (USD)"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="85000"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priceBS"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {locale === "es" ? "Precio (Bs)" : "Price (Bs)"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="588000"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                  />
                </FormControl>
                <FormDescription>
                  {locale === "es"
                    ? "Proporciona al menos un precio"
                    : "Provide at least one price"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {locale === "es" ? "Dormitorios" : "Bedrooms"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="3"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{locale === "es" ? "Baños" : "Bathrooms"}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="totalArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {locale === "es" ? "Área total (m²)" : "Total area (m²)"} *
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="120"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coveredArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {locale === "es" ? "Área cubierta (m²)" : "Covered area (m²)"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="yearBuilt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {locale === "es" ? "Año de construcción" : "Year built"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2020"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parkingSpaces"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {locale === "es" ? "Estacionamientos" : "Parking spaces"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
