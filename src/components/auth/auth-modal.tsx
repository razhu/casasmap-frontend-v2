"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth";
import {
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
  useFacebookLoginMutation,
} from "@/lib/graphql/generated";
import { CasasMapAuthProvider } from "@/components/auth/google-oauth-provider";
import { GoogleLoginButton } from "@/components/auth/google-login-button";
import { FacebookLoginButton } from "@/components/auth/facebook-login-button";
import { PasswordStrengthIndicator } from "@/components/auth/password-strength-indicator";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

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

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: "login" | "register";
}

export function AuthModal({
  open,
  onOpenChange,
  defaultMode = "login",
}: AuthModalProps) {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("auth");
  const { toast } = useToast();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [googleLoginMutation] = useGoogleLoginMutation();
  const [facebookLoginMutation] = useFacebookLoginMutation();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    mode: "onChange",
  });

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const result = await loginMutation({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      if (result.error) {
        const errorMessage = result.error.message;
        let friendlyMessage = errorMessage;

        if (errorMessage === "Invalid credentials") {
          friendlyMessage =
            locale === "es"
              ? "Correo o contraseña incorrectos"
              : "Invalid email or password";
        } else if (errorMessage === "Email not verified") {
          friendlyMessage =
            locale === "es"
              ? "Tu cuenta no está verificada. Revisa tu correo."
              : "Your account is not verified. Check your email.";

          localStorage.setItem("pending-verification-email", data.email);
          toast({
            title:
              locale === "es" ? "Cuenta no verificada" : "Account not verified",
            description: friendlyMessage,
            variant: "destructive",
          });

          setTimeout(() => {
            router.push(getLocalePath("/verify-email-sent"));
          }, 2000);

          setIsLoading(false);
          return;
        }

        toast({
          title: t("login.error"),
          description: friendlyMessage,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (result.data?.login) {
        const { access_token, user } = result.data.login;
        setAuth(user as any, access_token, data.rememberMe);

        toast({
          title: t("login.success"),
          description: `${locale === "es" ? "Bienvenido" : "Welcome"} ${
            user.email
          }`,
        });

        onOpenChange(false);
        router.refresh();
      }
    } catch (error: any) {
      toast({
        title: t("login.error"),
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

  const onRegisterSubmit = async (data: RegisterFormValues) => {
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

      if (result.error) {
        const errorMessage = result.error.message;
        const friendlyMessage =
          errorMessage === "User already exists"
            ? locale === "es"
              ? "Este correo ya está registrado"
              : "This email is already registered"
            : errorMessage;

        toast({
          title: t("register.error"),
          description: friendlyMessage,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (result.data?.register) {
        toast({
          title:
            locale === "es" ? "¡Registro exitoso!" : "Registration successful!",
          description: result.data.register.message,
        });

        localStorage.setItem("pending-verification-email", data.email);
        onOpenChange(false);
        router.push(getLocalePath("/verify-email-sent"));
      }
    } catch (error: any) {
      toast({
        title: t("register.error"),
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

      if (result.error) {
        toast({
          title: t("login.error"),
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
        setAuth(user as any, access_token);

        toast({
          title: t("login.success"),
          description: `${locale === "es" ? "Bienvenido" : "Welcome"} ${
            user.email
          }`,
        });

        onOpenChange(false);
        router.refresh();
      }
    } catch (error: any) {
      toast({
        title: t("login.error"),
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

      if (result.error) {
        toast({
          title: t("login.error"),
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
        setAuth(user as any, access_token);

        toast({
          title: t("login.success"),
          description: `${locale === "es" ? "Bienvenido" : "Welcome"} ${
            user.email
          }`,
        });

        onOpenChange(false);
        router.refresh();
      }
    } catch (error: any) {
      toast({
        title: t("login.error"),
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

  const handleGoogleError = (error: any) => {
    console.error("Google login error:", error);
    toast({
      title: t("login.error"),
      description: "Google login failed",
      variant: "destructive",
    });
    setIsGoogleLoading(false);
  };

  const handleFacebookError = (error: any) => {
    console.error("Facebook login error:", error);
    toast({
      title: t("login.error"),
      description: "Facebook login failed",
      variant: "destructive",
    });
    setIsFacebookLoading(false);
  };

  const password = registerForm.watch("password");
  const confirmPassword = registerForm.watch("confirmPassword");
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;
  const passwordsDontMatch = confirmPassword && password !== confirmPassword;

  return (
    <CasasMapAuthProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {mode === "login" ? t("login.title") : t("register.title")}
            </DialogTitle>
            <DialogDescription className="text-center">
              {mode === "login" ? t("login.subtitle") : t("register.subtitle")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Login Form */}
            {mode === "login" && (
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("login.email")}</FormLabel>
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
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("login.password")}</FormLabel>
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
                      control={loginForm.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={
                                isLoading ||
                                isGoogleLoading ||
                                isFacebookLoading
                              }
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {t("login.rememberMe")}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onOpenChange(false);
                        router.push(getLocalePath("/forgot-password"));
                      }}
                      className="text-sm text-primary hover:underline"
                    >
                      {t("login.forgotPassword")}
                    </button>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!loginForm.formState.isValid || isLoading}
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {t("login.submit")}
                  </Button>
                </form>
              </Form>
            )}

            {/* Register Form */}
            {mode === "register" && (
              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("register.email")}</FormLabel>
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
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("register.password")}</FormLabel>
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
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("register.confirmPassword")}</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="••••••••"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
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
                    control={registerForm.control}
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
                        <FormLabel className="text-sm font-normal cursor-pointer leading-none">
                          {t("register.agreeToTerms")}
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!registerForm.formState.isValid || isLoading}
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {t("register.submit")}
                  </Button>
                </form>
              </Form>
            )}
            {/* Toggle Mode */}
            <div className="text-center text-sm">
              {mode === "login" ? (
                <p className="text-gray-600 dark:text-gray-400">
                  {t("login.noAccount")}{" "}
                  <button
                    onClick={() => setMode("register")}
                    className="text-primary hover:underline font-bold"
                  >
                    {t("login.signUp")}
                  </button>
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  {t("register.hasAccount")}{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-primary hover:underline font-bold"
                  >
                    {t("register.signIn")}
                  </button>
                </p>
              )}
            </div>
            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white dark:bg-gray-950 px-2 text-muted-foreground">
                  {locale === "es" ? "O continuar con" : "Or continue with"}
                </span>
              </div>
            </div>

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
          </div>
        </DialogContent>
      </Dialog>
    </CasasMapAuthProvider>
  );
}
