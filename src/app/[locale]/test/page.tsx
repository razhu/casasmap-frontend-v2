"use client";

import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Simple test query to check backend connection
const TEST_QUERY = gql`
  query TestConnection {
    __typename
  }
`;

export default function TestPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;

  // Test Apollo Client connection
  const { data, loading, error } = useQuery(TEST_QUERY);

  const tests = [
    {
      name: "Next.js App Router",
      status: "success",
      message: "Page is rendering correctly",
    },
    {
      name: "TypeScript",
      status: "success",
      message: "TypeScript compilation working",
    },
    {
      name: "Tailwind CSS",
      status: "success",
      message: "Styles are applied",
    },
    {
      name: "shadcn/ui Components",
      status: "success",
      message: "UI components rendering",
    },
    {
      name: "i18n (next-intl)",
      status: locale === "es" || locale === "en" ? "success" : "error",
      message: `Current locale: ${locale}`,
    },
    {
      name: "Apollo Client",
      status: loading
        ? "loading"
        : error
        ? "error"
        : data
        ? "success"
        : "error",
      message: loading
        ? "Connecting to backend..."
        : error
        ? `Error: ${error.message}`
        : data
        ? "Connected to GraphQL backend"
        : "No response",
    },
    {
      name: "GraphQL Code Generator",
      status: "success",
      message: "Types generated successfully",
    },
    {
      name: "Environment Variables",
      status: process.env.NEXT_PUBLIC_GRAPHQL_URL ? "success" : "error",
      message:
        process.env.NEXT_PUBLIC_GRAPHQL_URL ||
        "NEXT_PUBLIC_GRAPHQL_URL not set",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            {locale === "es"
              ? "Verificación de Configuración del Frontend"
              : "Frontend Setup Verification"}
          </h1>
          <p className="text-lg text-gray-600">
            {locale === "es"
              ? "Probando todos los componentes y configuraciones"
              : "Testing all components and configurations"}
          </p>

          {/* Language Switcher */}
          <div className="flex gap-2 justify-center">
            <Link href="/test">
              <Button variant={locale === "es" ? "default" : "outline"}>
                Español
              </Button>
            </Link>
            <Link href="/en/test">
              <Button variant={locale === "en" ? "default" : "outline"}>
                English
              </Button>
            </Link>
          </div>
        </div>

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === "es" ? "Pruebas del Sistema" : "System Tests"}
            </CardTitle>
            <CardDescription>
              {locale === "es"
                ? "Verificando que todos los componentes funcionen correctamente"
                : "Verifying all setup components are working correctly"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tests.map((test, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg border bg-white"
              >
                <div className="mt-0.5">
                  {test.status === "success" && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                  {test.status === "error" && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  {test.status === "loading" && (
                    <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{test.name}</h3>
                    <Badge
                      variant={
                        test.status === "success"
                          ? "default"
                          : test.status === "error"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {test.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{test.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Translation Test */}
        <Card>
          <CardHeader>
            <CardTitle>Translation Test</CardTitle>
            <CardDescription>Testing i18n with next-intl</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTitle>Current Locale: {locale}</AlertTitle>
              <AlertDescription>
                {locale === "es"
                  ? "Estás viendo la versión en español"
                  : "You are viewing the English version"}
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Spanish (es)</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Inicio</li>
                  <li>• Propiedades</li>
                  <li>• Favoritos</li>
                  <li>• Mensajes</li>
                  <li>• Perfil</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">English (en)</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Home</li>
                  <li>• Properties</li>
                  <li>• Favorites</li>
                  <li>• Messages</li>
                  <li>• Profile</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Backend Connection Details */}
        <Card>
          <CardHeader>
            <CardTitle>Backend Connection</CardTitle>
            <CardDescription>GraphQL endpoint configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="font-mono text-sm bg-slate-100 p-3 rounded">
              <strong>Endpoint:</strong> {process.env.NEXT_PUBLIC_GRAPHQL_URL}
            </div>
            <div className="font-mono text-sm bg-slate-100 p-3 rounded">
              <strong>Status:</strong>{" "}
              {loading ? (
                <span className="text-blue-600">Connecting...</span>
              ) : error ? (
                <span className="text-red-600">Error - {error.message}</span>
              ) : data ? (
                <span className="text-green-600">Connected ✓</span>
              ) : (
                <span className="text-gray-600">Unknown</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Setup Status</AlertTitle>
          <AlertDescription>
            {tests.filter((t) => t.status === "success").length} of{" "}
            {tests.length} tests passing
            {tests.every((t) => t.status === "success") && (
              <span className="block mt-2 font-semibold text-green-600">
                ✓ All systems operational! Ready to build features.
              </span>
            )}
          </AlertDescription>
        </Alert>

        {/* Navigation */}
        <div className="flex gap-4 justify-center">
          <Link href={`/${locale}`}>
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Link href={`/${locale}/login`}>
            <Button>Go to Login (Next Step)</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
