"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/hooks/use-toast";
import {
  useResetPasswordMutation,
  useValidateResetTokenQuery,
} from "@/lib/graphql/generated";
import { PasswordStrengthIndicator } from "@/components/auth/password-strength-indicator";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const token = params.token as string;
  const t = useTranslations("auth.resetPassword");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [resetPasswordMutation] = useResetPasswordMutation();

  // Validate token on page load
  const { data: tokenValidation, loading: isValidating } =
    useValidateResetTokenQuery({
      variables: { token },
    });

  const tokenValid = tokenValidation?.validateResetToken ?? false;

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  // Watch form values for real-time feedback
  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  // Check if passwords match (for real-time feedback)
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;
  const passwordsDontMatch = confirmPassword && password !== confirmPassword;

  // Check if form is valid for submit button
  const isFormValid = form.formState.isValid && !isLoading;

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  // Validate token on page load
  useEffect(() => {
    const validateToken = async () => {
      try {
        // Try to reset with a dummy password to check if token is valid
        // We'll catch the error if token is invalid
        // This is a workaround since we don't have a separate validate endpoint
        setIsValidating(true);

        // For now, we'll assume token is valid and let the form submission handle validation
        // A better approach would be to add a validateResetToken query to the backend
        setTokenValid(true);
        setIsValidating(false);
      } catch (error) {
        setTokenValid(false);
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true);
    try {
      const result = await resetPasswordMutation({
        variables: {
          token: token,
          newPassword: data.password,
        },
      });

      // Check for GraphQL errors (Apollo errorPolicy: "all" puts error in result.error)
      if (result.error) {
        const errorMessage = result.error.message;

        // User-friendly error messages
        const friendlyMessage =
          errorMessage === "Invalid or expired reset token"
            ? locale === "es"
              ? "Este enlace ya fue usado o expiró. Solicita uno nuevo."
              : "This link has been used or expired. Request a new one."
            : errorMessage;

        toast({
          title: t("error"),
          description: friendlyMessage,
          variant: "destructive",
        });

        // If token is invalid, redirect to forgot password after showing error
        if (errorMessage === "Invalid or expired reset token") {
          setTimeout(() => {
            router.push(getLocalePath("/forgot-password"));
          }, 3000);
        }

        setIsLoading(false);
        return;
      }

      if (result.data?.resetPassword) {
        toast({
          title: t("success"),
          description:
            locale === "es"
              ? "Ahora puedes iniciar sesión con tu nueva contraseña"
              : "You can now sign in with your new password",
        });

        setTimeout(() => {
          router.push(getLocalePath("/login"));
        }, 2000);
      }
    } catch (error: any) {
      // Network errors
      console.error("Reset password error:", error);

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
          {isValidating ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-sm text-gray-600">
                {locale === "es" ? "Validando enlace..." : "Validating link..."}
              </p>
            </div>
          ) : !tokenValid ? (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {locale === "es"
                    ? "Este enlace ya fue usado o expiró."
                    : "This link has been used or expired."}
                </AlertDescription>
              </Alert>
              <p className="text-sm text-gray-600 text-center">
                {locale === "es"
                  ? "Por favor solicita un nuevo enlace de recuperación."
                  : "Please request a new recovery link."}
              </p>
              <Link href={getLocalePath("/forgot-password")}>
                <Button className="w-full">
                  {locale === "es"
                    ? "Solicitar nuevo enlace"
                    : "Request new link"}
                </Button>
              </Link>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="••••••••"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <PasswordStrengthIndicator
                        password={field.value}
                        locale={locale}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("confirmPassword")}</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="••••••••"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      {/* Real-time password match feedback */}
                      {passwordsMatch && (
                        <p className="text-sm text-green-600 flex items-center gap-1">
                          <span>✓</span>
                          {locale === "es"
                            ? "Las contraseñas coinciden"
                            : "Passwords match"}
                        </p>
                      )}
                      {passwordsDontMatch && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <span>✗</span>
                          {locale === "es"
                            ? "Las contraseñas no coinciden"
                            : "Passwords don't match"}
                        </p>
                      )}
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
      </Card>
    </div>
  );
}
