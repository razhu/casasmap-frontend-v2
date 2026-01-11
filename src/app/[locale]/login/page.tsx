"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
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
import {
  useLoginMutation,
  useGoogleLoginMutation,
  useFacebookLoginMutation,
} from "@/lib/graphql/generated";
import { GoogleAuthProvider } from "@/components/auth/google-oauth-provider";
import { GoogleLoginButton } from "@/components/auth/google-login-button";
import { FacebookLoginButton } from "@/components/auth/facebook-login-button";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("auth.login");
  const { toast } = useToast();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  const [loginMutation] = useLoginMutation();
  const [googleLoginMutation] = useGoogleLoginMutation();
  const [facebookLoginMutation] = useFacebookLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange", // Enable real-time validation
  });

  // Check if form is valid for submit button
  const isFormValid =
    form.formState.isValid &&
    !isLoading &&
    !isGoogleLoading &&
    !isFacebookLoading;

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const onSubmit = async (data: LoginFormValues) => {
    console.log("=== LOGIN SUBMIT START ===");
    setIsLoading(true);
    try {
      console.log("Calling loginMutation with:", { email: data.email });
      const result = await loginMutation({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      console.log("Result received:", result);
      console.log("Result.error:", result.error);
      console.log("Result.errors:", result.errors);
      console.log("Result.data:", result.data);

      // Check for GraphQL errors (Apollo errorPolicy: "all" puts error in result.error)
      if (result.error) {
        console.log("FOUND ERROR IN RESULT!");
        const errorMessage = result.error.message;
        console.log("Error message:", errorMessage);

        // User-friendly error messages
        const friendlyMessage =
          errorMessage === "Invalid credentials"
            ? locale === "es"
              ? "Correo o contraseña incorrectos"
              : "Invalid email or password"
            : errorMessage;

        console.log("Friendly message:", friendlyMessage);
        console.log("About to call toast with:", {
          title: t("error"),
          description: friendlyMessage,
          variant: "destructive",
        });

        toast({
          title: t("error"),
          description: friendlyMessage,
          variant: "destructive",
        });

        console.log("Toast called!");
        setIsLoading(false);
        return;
      }

      console.log("No errors, checking data...");
      if (result.data?.login) {
        console.log("Login successful!");
        const { access_token, user } = result.data.login;
        setAuth(user, access_token);

        toast({
          title: t("success"),
          description: `${t("subtitle")} ${user.email}`,
        });

        router.push(getLocalePath("/"));
      } else {
        console.log("No data in result!");
      }
    } catch (error: any) {
      // Network errors or other unexpected errors
      console.error("CAUGHT ERROR:", error);

      toast({
        title: t("error"),
        description:
          locale === "es"
            ? "Error de conexión. Por favor intenta de nuevo."
            : "Connection error. Please try again.",
        variant: "destructive",
      });
    } finally {
      console.log("=== LOGIN SUBMIT END ===");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (idToken: string) => {
    setIsGoogleLoading(true);
    try {
      const result = await googleLoginMutation({
        variables: {
          googleLoginInput: {
            token: idToken,
          },
        },
      });

      // Check for GraphQL errors
      if (result.error) {
        toast({
          title: t("error"),
          description:
            result.error.message ||
            (locale === "es"
              ? "Error al iniciar sesión con Google"
              : "Google login failed"),
          variant: "destructive",
        });
        setIsGoogleLoading(false);
        return;
      }

      if (result.data?.googleLogin) {
        const { access_token, user } = result.data.googleLogin;
        setAuth(user, access_token);

        toast({
          title: t("success"),
          description: `${locale === "es" ? "Bienvenido" : "Welcome"} ${
            user.email
          }`,
        });

        router.push(getLocalePath("/"));
      }
    } catch (error: any) {
      toast({
        title: t("error"),
        description:
          locale === "es"
            ? "Error de conexión con Google"
            : "Google connection error",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleError = (error: any) => {
    console.error("Google login error:", error);
    toast({
      title: t("error"),
      description: "Google login failed",
      variant: "destructive",
    });
    setIsGoogleLoading(false);
  };

  const handleFacebookLogin = async (accessToken: string) => {
    setIsFacebookLoading(true);
    try {
      const result = await facebookLoginMutation({
        variables: {
          facebookLoginInput: {
            accessToken,
          },
        },
      });

      // Check for GraphQL errors
      if (result.error) {
        toast({
          title: t("error"),
          description:
            result.error.message ||
            (locale === "es"
              ? "Error al iniciar sesión con Facebook"
              : "Facebook login failed"),
          variant: "destructive",
        });
        setIsFacebookLoading(false);
        return;
      }

      if (result.data?.facebookLogin) {
        const { access_token, user } = result.data.facebookLogin;
        setAuth(user, access_token);

        toast({
          title: t("success"),
          description: `${locale === "es" ? "Bienvenido" : "Welcome"} ${
            user.email
          }`,
        });

        router.push(getLocalePath("/"));
      }
    } catch (error: any) {
      toast({
        title: t("error"),
        description:
          locale === "es"
            ? "Error de conexión con Facebook"
            : "Facebook connection error",
        variant: "destructive",
      });
    } finally {
      setIsFacebookLoading(false);
    }
  };

  const handleFacebookError = (error: any) => {
    console.error("Facebook login error:", error);
    toast({
      title: t("error"),
      description: "Facebook login failed",
      variant: "destructive",
    });
    setIsFacebookLoading(false);
  };

  return (
    <GoogleAuthProvider>
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
          <CardContent className="space-y-4">
            {/* Social Login Buttons */}
            <div className="space-y-2">
              <GoogleLoginButton
                onSuccess={handleGoogleLogin}
                onError={handleGoogleError}
                disabled={isLoading || isGoogleLoading || isFacebookLoading}
                locale={locale}
              />
              <FacebookLoginButton
                onSuccess={handleFacebookLogin}
                onError={handleFacebookError}
                disabled={isLoading || isGoogleLoading || isFacebookLoading}
                locale={locale}
              />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-950 px-2 text-muted-foreground">
                  {locale === "es"
                    ? "O continúa con email"
                    : "Or continue with email"}
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
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
                          disabled={
                            isLoading || isGoogleLoading || isFacebookLoading
                          }
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
                          disabled={
                            isLoading || isGoogleLoading || isFacebookLoading
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={
                              isLoading || isGoogleLoading || isFacebookLoading
                            }
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          {t("rememberMe")}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <Link
                    href={getLocalePath("/forgot-password")}
                    className="text-sm text-primary hover:underline"
                  >
                    {t("forgotPassword")}
                  </Link>
                </div>
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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-600 dark:text-gray-400">
              {t("noAccount")}{" "}
              <Link
                href={getLocalePath("/register")}
                className="text-primary hover:underline font-semibold"
              >
                {t("signUp")}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </GoogleAuthProvider>
  );
}
