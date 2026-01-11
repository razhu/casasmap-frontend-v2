"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/hooks/use-toast";
import { useResetPasswordMutation } from "@/lib/graphql/generated";
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

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true);
    try {
      const result = await resetPasswordMutation({
        variables: {
          token: token,
          newPassword: data.password,
        },
      });

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
      toast({
        title: t("error"),
        description: error.message || "Something went wrong",
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <Button type="submit" className="w-full" disabled={!isFormValid}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("submit")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
