"use client";

import { useParams, useRouter } from "next/navigation";
import { useMyPaymentsQuery } from "@/lib/graphql/generated";
import { useAuthStore } from "@/store/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  ExternalLink,
} from "lucide-react";

export default function PaymentHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "es";
  const { user } = useAuthStore();

  const { data, loading, error } = useMyPaymentsQuery({
    skip: !user,
  });

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      COMPLETED: {
        variant: "default" as const,
        icon: CheckCircle2,
        label: locale === "es" ? "Completado" : "Completed",
        className: "bg-green-500",
      },
      PENDING: {
        variant: "secondary" as const,
        icon: Clock,
        label: locale === "es" ? "Pendiente" : "Pending",
        className: "bg-yellow-500",
      },
      FAILED: {
        variant: "destructive" as const,
        icon: XCircle,
        label: locale === "es" ? "Fallido" : "Failed",
        className: "bg-red-500",
      },
      CANCELLED: {
        variant: "outline" as const,
        icon: XCircle,
        label: locale === "es" ? "Cancelado" : "Cancelled",
        className: "",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getMethodLabel = (method: string) => {
    const methods: Record<string, string> = {
      BANK_TRANSFER: locale === "es" ? "Transferencia" : "Bank Transfer",
      STRIPE: locale === "es" ? "Tarjeta" : "Card",
      MERCADOPAGO: "Mercado Pago",
      PAYPAL: "PayPal",
    };
    return methods[method] || method;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 max-w-6xl">
        <Skeleton className="h-12 w-64 mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto py-8 max-w-6xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {locale === "es"
              ? "No se pudo cargar el historial de pagos"
              : "Could not load payment history"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const payments = data?.myPayments || [];

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <Button
        variant="ghost"
        onClick={() => router.push(getLocalePath("/subscription"))}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {locale === "es" ? "Volver" : "Back"}
      </Button>

      <h1 className="text-3xl font-bold mb-6">
        {locale === "es" ? "Historial de Pagos" : "Payment History"}
      </h1>

      {payments.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              {locale === "es"
                ? "No tienes pagos registrados"
                : "You don't have any payments yet"}
            </p>
            <Button
              onClick={() =>
                router.push(getLocalePath("/subscription/upgrade"))
              }
            >
              {locale === "es" ? "Mejorar Plan" : "Upgrade Plan"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === "es" ? "Todos los Pagos" : "All Payments"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{locale === "es" ? "Fecha" : "Date"}</TableHead>
                  <TableHead>{locale === "es" ? "Plan" : "Plan"}</TableHead>
                  <TableHead>{locale === "es" ? "Monto" : "Amount"}</TableHead>
                  <TableHead>{locale === "es" ? "Método" : "Method"}</TableHead>
                  <TableHead>{locale === "es" ? "Estado" : "Status"}</TableHead>
                  <TableHead className="text-right">
                    {locale === "es" ? "Acciones" : "Actions"}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      {new Date(payment.createdAt).toLocaleDateString(
                        locale === "es" ? "es-BO" : "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {payment.plan}
                    </TableCell>
                    <TableCell>
                      {payment.amount} {payment.currency}
                    </TableCell>
                    <TableCell>{getMethodLabel(payment.method)}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {payment.receiptUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              window.open(payment.receiptUrl!, "_blank")
                            }
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        {payment.transactionId && (
                          <Button
                            variant="ghost"
                            size="sm"
                            title={payment.transactionId}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
