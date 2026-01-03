"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  useAdminPaymentsQuery,
  useApprovePaymentMutation,
  useRejectPaymentMutation,
} from "@/lib/graphql/generated";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function AdminPaymentsPage() {
  const params = useParams();
  const locale = (params.locale as string) || "es";
  const { toast } = useToast();

  const { data, loading, refetch } = useAdminPaymentsQuery();
  const [approvePayment] = useApprovePaymentMutation();
  const [rejectPayment] = useRejectPaymentMutation();

  const [rejectDialog, setRejectDialog] = useState<{
    open: boolean;
    paymentId: string;
    plan: string;
  }>({
    open: false,
    paymentId: "",
    plan: "",
  });
  const [rejectReason, setRejectReason] = useState("");
  const [processing, setProcessing] = useState<string | null>(null);

  const payments = data?.allPayments || [];
  const pending = payments.filter((p) => p.status === "PENDING");
  const completed = payments.filter((p) => p.status === "COMPLETED");
  const failed = payments.filter((p) => p.status === "FAILED");

  const handleApprove = async (paymentId: string) => {
    setProcessing(paymentId);
    try {
      await approvePayment({ variables: { input: { paymentId } } });
      toast({
        title: locale === "es" ? "Pago aprobado" : "Payment approved",
        description:
          locale === "es"
            ? "El pago ha sido aprobado y la suscripción activada"
            : "Payment approved and subscription activated",
      });
      refetch();
    } catch (err: any) {
      toast({
        title: locale === "es" ? "Error" : "Error",
        description:
          err?.message ||
          (locale === "es" ? "No se pudo aprobar" : "Could not approve"),
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast({
        title: locale === "es" ? "Error" : "Error",
        description: locale === "es" ? "Ingresa una razón" : "Enter a reason",
        variant: "destructive",
      });
      return;
    }

    setProcessing(rejectDialog.paymentId);
    try {
      await rejectPayment({
        variables: {
          input: {
            paymentId: rejectDialog.paymentId,
            reason: rejectReason,
          },
        },
      });
      toast({
        title: locale === "es" ? "Pago rechazado" : "Payment rejected",
        description:
          locale === "es"
            ? "El pago ha sido rechazado"
            : "Payment has been rejected",
      });
      setRejectDialog({ open: false, paymentId: "", plan: "" });
      setRejectReason("");
      refetch();
    } catch (err: any) {
      toast({
        title: locale === "es" ? "Error" : "Error",
        description:
          err?.message ||
          (locale === "es" ? "No se pudo rechazar" : "Could not reject"),
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };

  const PaymentTable = ({
    payments: pmts,
    showActions = true,
  }: {
    payments: typeof payments;
    showActions?: boolean;
  }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{locale === "es" ? "Plan" : "Plan"}</TableHead>
          <TableHead>{locale === "es" ? "Monto" : "Amount"}</TableHead>
          <TableHead>{locale === "es" ? "Método" : "Method"}</TableHead>
          <TableHead>{locale === "es" ? "Estado" : "Status"}</TableHead>
          <TableHead>{locale === "es" ? "Fecha" : "Date"}</TableHead>
          {showActions && (
            <TableHead className="text-right">
              {locale === "es" ? "Acciones" : "Actions"}
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {pmts.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{payment.plan}</TableCell>
            <TableCell>
              ${payment.amount.toLocaleString()} {payment.currency}
            </TableCell>
            <TableCell>{payment.method}</TableCell>
            <TableCell>
              {payment.status === "PENDING" && (
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  {locale === "es" ? "Pendiente" : "Pending"}
                </Badge>
              )}
              {payment.status === "COMPLETED" && (
                <Badge variant="default">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {locale === "es" ? "Completado" : "Completed"}
                </Badge>
              )}
              {payment.status === "FAILED" && (
                <Badge variant="destructive">
                  <XCircle className="h-3 w-3 mr-1" />
                  {locale === "es" ? "Fallido" : "Failed"}
                </Badge>
              )}
            </TableCell>
            <TableCell>
              {new Date(payment.createdAt).toLocaleDateString()}
            </TableCell>
            {showActions && (
              <TableCell className="text-right space-x-2">
                {payment.status === "PENDING" && (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleApprove(payment.id)}
                      disabled={processing === payment.id}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {locale === "es" ? "Aprobar" : "Approve"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        setRejectDialog({
                          open: true,
                          paymentId: payment.id,
                          plan: payment.plan,
                        })
                      }
                      disabled={processing === payment.id}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      {locale === "es" ? "Rechazar" : "Reject"}
                    </Button>
                  </>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {locale === "es" ? "Gestión de Pagos" : "Payment Management"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "es"
            ? "Aprobar y gestionar pagos manuales"
            : "Approve and manage manual payments"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-muted-foreground">
              {locale === "es" ? "Pendientes" : "Pending"}
            </div>
            <div className="text-2xl font-bold">{pending.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-muted-foreground">
              {locale === "es" ? "Completados" : "Completed"}
            </div>
            <div className="text-2xl font-bold">{completed.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-muted-foreground">
              {locale === "es" ? "Total" : "Total"}
            </div>
            <div className="text-2xl font-bold">
              $
              {completed.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            {locale === "es" ? "Pendientes" : "Pending"} ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            {locale === "es" ? "Completados" : "Completed"} ({completed.length})
          </TabsTrigger>
          <TabsTrigger value="failed">
            {locale === "es" ? "Fallidos" : "Failed"} ({failed.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <Card>
            <CardContent className="pt-6">
              {pending.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {locale === "es"
                    ? "No hay pagos pendientes"
                    : "No pending payments"}
                </p>
              ) : (
                <PaymentTable payments={pending} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardContent className="pt-6">
              <PaymentTable payments={completed} showActions={false} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="failed">
          <Card>
            <CardContent className="pt-6">
              <PaymentTable payments={failed} showActions={false} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog
        open={rejectDialog.open}
        onOpenChange={(open) => setRejectDialog({ ...rejectDialog, open })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {locale === "es" ? "Rechazar Pago" : "Reject Payment"}
            </DialogTitle>
            <DialogDescription>{rejectDialog.plan}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder={
                locale === "es"
                  ? "Razón del rechazo..."
                  : "Reason for rejection..."
              }
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setRejectDialog({ open: false, paymentId: "", plan: "" })
              }
            >
              {locale === "es" ? "Cancelar" : "Cancel"}
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectReason.trim()}
            >
              {locale === "es" ? "Rechazar" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
