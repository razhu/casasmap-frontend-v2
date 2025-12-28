"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerifyEmailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const token = params.token as string;
  const t = useTranslations("auth");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    // TODO: Call verifyEmail mutation when backend implements it
    // For now, just simulate verification
    const verifyEmail = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // TODO: Replace with actual mutation
        // const result = await verifyEmailMutation({ variables: { token } });

        setStatus("success");
        setMessage(
          locale === "es"
            ? "Tu correo ha sido verificado exitosamente"
            : "Your email has been verified successfully"
        );
      } catch (error) {
        setStatus("error");
        setMessage(
          locale === "es"
            ? "El enlace de verificación es inválido o ha expirado"
            : "The verification link is invalid or has expired"
        );
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, locale]);

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {status === "loading" && (
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
            )}
            {status === "success" && (
              <CheckCircle className="h-16 w-16 text-green-500" />
            )}
            {status === "error" && (
              <XCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {status === "loading" &&
              (locale === "es" ? "Verificando..." : "Verifying...")}
            {status === "success" &&
              (locale === "es" ? "¡Verificado!" : "Verified!")}
            {status === "error" && (locale === "es" ? "Error" : "Error")}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {status === "success" && (
            <Button onClick={() => router.push(getLocalePath("/login"))}>
              {locale === "es" ? "Ir a Iniciar Sesión" : "Go to Login"}
            </Button>
          )}
          {status === "error" && (
            <Button
              variant="outline"
              onClick={() => router.push(getLocalePath("/"))}
            >
              {locale === "es" ? "Volver al Inicio" : "Back to Home"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
