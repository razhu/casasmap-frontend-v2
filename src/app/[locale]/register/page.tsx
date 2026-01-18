"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function RegisterRedirectPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // If already authenticated, redirect to home
    if (isAuthenticated) {
      const homePath = locale === "es" ? "/" : `/${locale}`;
      router.replace(homePath);
    } else {
      // Redirect to home with modal trigger
      const homePath =
        locale === "es" ? "/?auth=register" : `/${locale}?auth=register`;
      router.replace(homePath);
    }
  }, [isAuthenticated, router, locale]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">
          {locale === "es" ? "Redirigiendo..." : "Redirecting..."}
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2 } from "lucide-react";

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
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth";
import { useRegisterMutation } from "@/lib/graphql/generated";
import { PasswordStrengthIndicator } from "@/components/auth/password-strength-indicator";

const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("auth.register");
  const { toast } = useToast();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);

  const [registerMutation] = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    mode: "onChange", // Enable real-time validation
  });

  // Watch form values for real-time feedback
  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");
  const agreeToTerms = form.watch("agreeToTerms");

  // Check if passwords match (for real-time feedback)
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;
  const passwordsDontMatch = confirmPassword && password !== confirmPassword;

  // Check if form is valid for submit button
  const isFormValid = form.formState.isValid && !isLoading;

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const result = await registerMutation({
        variables: {
          registerInput: {
            email: data.email,
            password: data.password,
          },
        },
      });

      // Check for GraphQL errors (Apollo errorPolicy: "all" puts error in result.error)
      if (result.error) {
        const errorMessage = result.error.message;

        // User-friendly error messages
        const friendlyMessage =
          errorMessage === "User already exists"
            ? locale === "es"
              ? "Este correo ya está registrado"
              : "This email is already registered"
            : errorMessage;

        toast({
          title: t("error"),
          description: friendlyMessage,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (result.data?.register) {
        // Registration successful - redirect to verify email page
        toast({
          title:
            locale === "es" ? "¡Registro exitoso!" : "Registration successful!",
          description: result.data.register.message,
        });

        // Save email to localStorage for resend functionality
        localStorage.setItem("pending-verification-email", data.email);

        // Redirect to verify-email-sent page
        router.push(getLocalePath("/verify-email-sent"));
      }
    } catch (error: any) {
      // Network errors or other unexpected errors
      console.error("Registration error:", error);

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {t("agreeToTerms")}
                    </FormLabel>
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
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-600 dark:text-gray-400">
            {t("hasAccount")}{" "}
            <Link
              href={getLocalePath("/login")}
              className="text-primary hover:underline font-semibold"
            >
              {t("signIn")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
