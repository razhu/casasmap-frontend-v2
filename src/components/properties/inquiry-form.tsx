"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSendPropertyInquiryMutation } from "@/lib/graphql/generated";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/auth";
import { Loader2, CheckCircle } from "lucide-react";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface InquiryFormProps {
  propertyId: string;
  propertyTitle: string;
  locale: string;
  onSuccess?: () => void;
}

export function InquiryForm({
  propertyId,
  propertyTitle,
  locale,
  onSuccess,
}: InquiryFormProps) {
  const { user } = useAuthStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [sendInquiry, { loading }] = useSendPropertyInquiryMutation();

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: user?.username || "",
      email: user?.email || "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    try {
      await sendInquiry({
        variables: {
          input: {
            propertyId,
            name: data.name,
            email: data.email,
            phone: data.phone || undefined,
            message: data.message,
          },
        },
      });

      setIsSuccess(true);
      form.reset();

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (error: any) {
      console.error("Error sending inquiry:", error);
      // Show error to user
      if (error.message) {
        alert(
          locale === "es"
            ? `Error al enviar mensaje: ${error.message}`
            : `Error sending message: ${error.message}`
        );
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">
          {locale === "es" ? "¡Mensaje enviado!" : "Message sent!"}
        </h3>
        <p className="text-muted-foreground">
          {locale === "es"
            ? "El propietario recibirá tu mensaje y te contactará pronto."
            : "The owner will receive your message and contact you soon."}
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {locale === "es"
              ? `Enviar consulta sobre: ${propertyTitle}`
              : `Send inquiry about: ${propertyTitle}`}
          </p>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locale === "es" ? "Nombre" : "Name"} *</FormLabel>
              <FormControl>
                <Input
                  placeholder={locale === "es" ? "Tu nombre" : "Your name"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === "es" ? "Correo electrónico" : "Email"} *
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={
                    locale === "es" ? "tu@email.com" : "your@email.com"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === "es" ? "Teléfono" : "Phone"}{" "}
                <span className="text-muted-foreground">
                  ({locale === "es" ? "opcional" : "optional"})
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder={locale === "es" ? "Tu teléfono" : "Your phone"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locale === "es" ? "Mensaje" : "Message"} *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    locale === "es"
                      ? "Hola, estoy interesado en esta propiedad..."
                      : "Hi, I'm interested in this property..."
                  }
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {locale === "es" ? "Enviar mensaje" : "Send message"}
        </Button>
      </form>
    </Form>
  );
}
