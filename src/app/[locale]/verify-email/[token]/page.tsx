"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

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
import { useAuthStore } from "@/store/auth";
import {
  useValidateVerificationTokenQuery,
  useVerifyEmailMutation,
} from "@/lib/graphql/generated";

export default function VerifyEmailPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const token = params.token as string;
  const { toast } = useToast();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const [verifyEmailMutation] = useVerifyEmailMutation();

  // Validate token on page load
  const { data: tokenValidation, loading: isValidating } =
    useValidateVerificationTokenQuery({
      variables: { token },
    });

  const tokenValid = tokenValidation?.validateVerificationToken ?? false;

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  // Auto-verify when token is valid
  useEffect(() => {
    if (tokenValid && !isVerifying && !verificationSuccess) {
      handleVerify();
    }
  }, [tokenValid]);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const result = await verifyEmailMutation({
        variables: { token },
      });

      if (result.error) {
        const errorMessage = result.error.message;

        const friendlyMessage =
          errorMessage === "Invalid or expired verification token"
            ? locale === "es"
              ? "Este enlace ya fue usado o expiró."
              : "This link has been used or expired."
            : errorMessage;

        toast({
          title: locale === "es" ? "Error" : "Error",
          description: friendlyMessage,
          variant: "destructive",
        });
        setIsVerifying(false);
        return;
      }

      if (result.data?.verifyEmail) {
        const { access_token, user } = result.data.verifyEmail;
        setAuth(user, access_token);
        setVerificationSuccess(true);

        // Clear pending email from localStorage
        localStorage.removeItem("pending-verification-email");

        toast({
          title: locale === "es" ? "¡Correo verificado!" : "Email verified!",
          description:
            locale === "es"
              ? "Tu cuenta ha sido activada exitosamente"
              : "Your account has been activated successfully",
        });

        // Redirect to home after 2 seconds
        setTimeout(() => {
          router.push(getLocalePath("/"));
        }, 2000);
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: locale === "es" ? "Error" : "Error",
        description:
          locale === "es"
            ? "Error de conexión. Por favor intenta de nuevo."
            : "Connection error. Please try again.",
        variant: "destructive",
      });
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            {isValidating || isVerifying ? (
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
                <Loader2 className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
            ) : verificationSuccess ? (
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            ) : (
              <div className="rounded-full bg-red-100 dark:bg-red-900 p-3">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {isValidating || isVerifying
              ? locale === "es"
                ? "Verificando..."
                : "Verifying..."
              : verificationSuccess
              ? locale === "es"
                ? "¡Verificación exitosa!"
                : "Verification successful!"
              : locale === "es"
              ? "Enlace inválido"
              : "Invalid link"}
          </CardTitle>
          <CardDescription>
            {isValidating || isVerifying
              ? locale === "es"
                ? "Por favor espera mientras verificamos tu correo"
                : "Please wait while we verify your email"
              : verificationSuccess
              ? locale === "es"
                ? "Redirigiendo a la página principal..."
                : "Redirecting to home page..."
              : locale === "es"
              ? "Este enlace de verificación no es válido"
              : "This verification link is not valid"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isValidating || isVerifying ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-sm text-gray-600">
                {locale === "es" ? "Validando enlace..." : "Validating link..."}
              </p>
            </div>
          ) : verificationSuccess ? (
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                {locale === "es"
                  ? "Tu cuenta ha sido verificada. Serás redirigido automáticamente."
                  : "Your account has been verified. You will be redirected automatically."}
              </AlertDescription>
            </Alert>
          ) : (
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
                  ? "Por favor solicita un nuevo enlace de verificación."
                  : "Please request a new verification link."}
              </p>
              <Link href={getLocalePath("/verify-email-sent")}>
                <Button className="w-full">
                  {locale === "es"
                    ? "Solicitar nuevo enlace"
                    : "Request new link"}
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
