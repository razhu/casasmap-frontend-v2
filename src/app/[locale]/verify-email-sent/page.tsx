"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Mail, Loader2, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useResendVerificationEmailMutation } from "@/lib/graphql/generated";

export default function VerifyEmailSentPage() {
  const params = useParams();
  const locale = params.locale as string;
  const { toast } = useToast();
  const [isResending, setIsResending] = useState(false);
  const [emailResent, setEmailResent] = useState(false);

  const [resendMutation] = useResendVerificationEmailMutation();

  // Get email from localStorage (saved during registration)
  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("pending-verification-email")
      : null;

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const handleResend = async () => {
    if (!email) {
      toast({
        title: locale === "es" ? "Error" : "Error",
        description:
          locale === "es"
            ? "No se encontró el correo electrónico"
            : "Email not found",
        variant: "destructive",
      });
      return;
    }

    setIsResending(true);
    try {
      const result = await resendMutation({
        variables: { email },
      });

      if (result.error) {
        toast({
          title: locale === "es" ? "Error" : "Error",
          description:
            result.error.message ||
            (locale === "es"
              ? "No se pudo reenviar el correo"
              : "Failed to resend email"),
          variant: "destructive",
        });
        setIsResending(false);
        return;
      }

      if (result.data?.resendVerificationEmail) {
        setEmailResent(true);
        toast({
          title: locale === "es" ? "¡Correo reenviado!" : "Email resent!",
          description:
            locale === "es"
              ? "Revisa tu bandeja de entrada"
              : "Check your inbox",
        });
      }
    } catch (error) {
      toast({
        title: locale === "es" ? "Error" : "Error",
        description:
          locale === "es"
            ? "Error de conexión. Por favor intenta de nuevo."
            : "Connection error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
              <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {locale === "es"
              ? "Revisa tu correo electrónico"
              : "Check your email"}
          </CardTitle>
          <CardDescription>
            {locale === "es"
              ? "Te enviamos un enlace de verificación"
              : "We sent you a verification link"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              {locale === "es" ? (
                <>
                  Hemos enviado un correo de verificación a{" "}
                  <strong>{email || "tu correo"}</strong>. Por favor revisa tu
                  bandeja de entrada y haz clic en el enlace para activar tu
                  cuenta.
                </>
              ) : (
                <>
                  We've sent a verification email to{" "}
                  <strong>{email || "your email"}</strong>. Please check your
                  inbox and click the link to activate your account.
                </>
              )}
            </AlertDescription>
          </Alert>

          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>
              {locale === "es"
                ? "El enlace expira en 24 horas."
                : "The link expires in 24 hours."}
            </p>
            <p>
              {locale === "es"
                ? "Si no ves el correo, revisa tu carpeta de spam."
                : "If you don't see the email, check your spam folder."}
            </p>
          </div>

          {emailResent && (
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                {locale === "es"
                  ? "¡Correo reenviado exitosamente!"
                  : "Email resent successfully!"}
              </AlertDescription>
            </Alert>
          )}

          <div className="pt-4 space-y-3">
            <Button
              onClick={handleResend}
              disabled={isResending || emailResent}
              variant="outline"
              className="w-full"
            >
              {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {locale === "es"
                ? "Reenviar correo de verificación"
                : "Resend verification email"}
            </Button>

            <Link href={getLocalePath("/login")}>
              <Button variant="ghost" className="w-full">
                {locale === "es"
                  ? "Volver al inicio de sesión"
                  : "Back to login"}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
