"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2, ArrowLeft, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useForgotPasswordMutation } from "@/lib/graphql/generated";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("auth.forgotPassword");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [forgotPasswordMutation] = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  // Check if form is valid for submit button
  const isFormValid = form.formState.isValid && !isLoading;

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      const result = await forgotPasswordMutation({
        variables: {
          email: data.email,
        },
      });

      // Check for GraphQL errors (Apollo errorPolicy: "all" puts error in result.error)
      if (result.error) {
        toast({
          title: t("error"),
          description:
            result.error.message ||
            (locale === "es"
              ? "Algo salió mal. Por favor intenta de nuevo."
              : "Something went wrong. Please try again."),
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (result.data?.forgotPassword) {
        setEmailSent(true);
        toast({
          title: t("success"),
          description: data.email,
        });
      }
    } catch (error: any) {
      // Network errors
      toast({
        title: t("error"),
        description:
          locale === "es"
            ? "Error de conexión. Por favor intenta de nuevo."
            : "Connection error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {t("title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {emailSent ? (
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <Mail className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                {locale === "es"
                  ? "Hemos enviado un enlace de recuperación a tu correo electrónico. Por favor revisa tu bandeja de entrada."
                  : "We've sent a recovery link to your email. Please check your inbox."}
              </AlertDescription>
            </Alert>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isFormValid}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("submit")}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Link
            href={getLocalePath("/login")}
            className="text-sm text-center text-gray-600 dark:text-gray-400 hover:text-primary flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToLogin")}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
