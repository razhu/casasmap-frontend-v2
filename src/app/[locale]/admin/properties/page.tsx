"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  useAdminPropertiesQuery,
  useApprovePropertyMutation,
  useRejectPropertyMutation,
} from "@/lib/graphql/generated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { CheckCircle, XCircle, Clock, Eye } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminPropertiesPage() {
  const params = useParams();
  const locale = (params.locale as string) || "es";
  const { toast } = useToast();

  const { data, loading, refetch } = useAdminPropertiesQuery();
  const [approveProperty] = useApprovePropertyMutation();
  const [rejectProperty] = useRejectPropertyMutation();

  const [rejectDialog, setRejectDialog] = useState<{
    open: boolean;
    propertyId: string;
    title: string;
  }>({
    open: false,
    propertyId: "",
    title: "",
  });
  const [rejectReason, setRejectReason] = useState("");
  const [processing, setProcessing] = useState<string | null>(null);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [bulkProcessing, setBulkProcessing] = useState(false);

  const properties = data?.properties?.data || [];
  const pending = properties.filter((p) => p.status === "PENDING");
  const active = properties.filter((p) => p.status === "ACTIVE");
  const rejected = properties.filter((p) => p.status === "REJECTED");

  const handleApprove = async (id: string) => {
    setProcessing(id);
    try {
      await approveProperty({ variables: { id } });
      toast({
        title: locale === "es" ? "Propiedad aprobada" : "Property approved",
        description:
          locale === "es"
            ? "La propiedad ha sido aprobada"
            : "Property has been approved",
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

    setProcessing(rejectDialog.propertyId);
    try {
      await rejectProperty({
        variables: {
          id: rejectDialog.propertyId,
          reason: rejectReason,
        },
      });
      toast({
        title: locale === "es" ? "Propiedad rechazada" : "Property rejected",
        description:
          locale === "es"
            ? "La propiedad ha sido rechazada"
            : "Property has been rejected",
      });
      setRejectDialog({ open: false, propertyId: "", title: "" });
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

  const handleBulkApprove = async () => {
    if (selectedProperties.length === 0) return;

    setBulkProcessing(true);
    let successCount = 0;
    let errorCount = 0;

    for (const id of selectedProperties) {
      try {
        await approveProperty({ variables: { id } });
        successCount++;
      } catch (err) {
        errorCount++;
      }
    }

    toast({
      title:
        locale === "es"
          ? `${successCount} propiedades aprobadas`
          : `${successCount} properties approved`,
      description:
        errorCount > 0
          ? locale === "es"
            ? `${errorCount} fallaron`
            : `${errorCount} failed`
          : undefined,
      variant: errorCount > 0 ? "destructive" : "default",
    });

    setSelectedProperties([]);
    setBulkProcessing(false);
    refetch();
  };

  const handleBulkReject = () => {
    if (selectedProperties.length === 0) return;
    // For bulk reject, we'll use a generic reason
    setRejectDialog({
      open: true,
      propertyId: "bulk",
      title: `${selectedProperties.length} ${
        locale === "es" ? "propiedades" : "properties"
      }`,
    });
  };

  const handleBulkRejectConfirm = async () => {
    if (!rejectReason.trim()) {
      toast({
        title: locale === "es" ? "Error" : "Error",
        description: locale === "es" ? "Ingresa una razón" : "Enter a reason",
        variant: "destructive",
      });
      return;
    }

    setBulkProcessing(true);
    let successCount = 0;
    let errorCount = 0;

    for (const id of selectedProperties) {
      try {
        await rejectProperty({
          variables: { id, reason: rejectReason },
        });
        successCount++;
      } catch (err) {
        errorCount++;
      }
    }

    toast({
      title:
        locale === "es"
          ? `${successCount} propiedades rechazadas`
          : `${successCount} properties rejected`,
      description:
        errorCount > 0
          ? locale === "es"
            ? `${errorCount} fallaron`
            : `${errorCount} failed`
          : undefined,
      variant: errorCount > 0 ? "destructive" : "default",
    });

    setSelectedProperties([]);
    setRejectDialog({ open: false, propertyId: "", title: "" });
    setRejectReason("");
    setBulkProcessing(false);
    refetch();
  };

  const toggleSelectProperty = (id: string) => {
    setSelectedProperties((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (properties: typeof pending) => {
    if (selectedProperties.length === properties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(properties.map((p) => p.id));
    }
  };

  const PropertyTable = ({
    properties: props,
    showActions = true,
    showCheckboxes = false,
  }: {
    properties: typeof properties;
    showActions?: boolean;
    showCheckboxes?: boolean;
  }) => (
    <Table>
      <TableHeader>
        <TableRow>
          {showCheckboxes && (
            <TableHead className="w-12">
              <Checkbox
                checked={
                  props.length > 0 &&
                  props.every((p) => selectedProperties.includes(p.id))
                }
                onCheckedChange={() => toggleSelectAll(props)}
              />
            </TableHead>
          )}
          <TableHead>{locale === "es" ? "Título" : "Title"}</TableHead>
          <TableHead>{locale === "es" ? "Propietario" : "Owner"}</TableHead>
          <TableHead>{locale === "es" ? "Precio" : "Price"}</TableHead>
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
        {props.map((property) => (
          <TableRow key={property.id}>
            {showCheckboxes && (
              <TableCell>
                <Checkbox
                  checked={selectedProperties.includes(property.id)}
                  onCheckedChange={() => toggleSelectProperty(property.id)}
                />
              </TableCell>
            )}
            <TableCell className="font-medium">{property.title}</TableCell>
            <TableCell>
              {property.user?.profile?.firstName}{" "}
              {property.user?.profile?.lastName}
            </TableCell>
            <TableCell>${property.priceUS?.toLocaleString()}</TableCell>
            <TableCell>
              {property.status === "PENDING" && (
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  {locale === "es" ? "Pendiente" : "Pending"}
                </Badge>
              )}
              {property.status === "ACTIVE" && (
                <Badge variant="default">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {locale === "es" ? "Activo" : "Active"}
                </Badge>
              )}
              {property.status === "REJECTED" && (
                <Badge variant="destructive">
                  <XCircle className="h-3 w-3 mr-1" />
                  {locale === "es" ? "Rechazado" : "Rejected"}
                </Badge>
              )}
            </TableCell>
            <TableCell>
              {new Date(property.createdAt).toLocaleDateString()}
            </TableCell>
            {showActions && (
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    window.open(`/inmuebles/${property.id}`, "_blank")
                  }
                >
                  <Eye className="h-4 w-4" />
                </Button>
                {property.status === "PENDING" && (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleApprove(property.id)}
                      disabled={processing === property.id}
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
                          propertyId: property.id,
                          title: property.title,
                        })
                      }
                      disabled={processing === property.id}
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
          {locale === "es" ? "Gestión de Propiedades" : "Property Management"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "es"
            ? "Aprobar, rechazar y gestionar propiedades"
            : "Approve, reject and manage properties"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              {locale === "es" ? "Pendientes" : "Pending"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pending.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              {locale === "es" ? "Activas" : "Active"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{active.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              {locale === "es" ? "Rechazadas" : "Rejected"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejected.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            {locale === "es" ? "Pendientes" : "Pending"} ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            {locale === "es" ? "Activas" : "Active"} ({active.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            {locale === "es" ? "Rechazadas" : "Rejected"} ({rejected.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          {pending.length > 0 && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedProperties.length > 0 &&
                  `${selectedProperties.length} ${
                    locale === "es" ? "seleccionadas" : "selected"
                  }`}
              </span>
              {selectedProperties.length > 0 && (
                <>
                  <Button
                    size="sm"
                    onClick={handleBulkApprove}
                    disabled={bulkProcessing}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {locale === "es"
                      ? "Aprobar Seleccionadas"
                      : "Approve Selected"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleBulkReject}
                    disabled={bulkProcessing}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    {locale === "es"
                      ? "Rechazar Seleccionadas"
                      : "Reject Selected"}
                  </Button>
                </>
              )}
            </div>
          )}
          <Card>
            <CardContent className="pt-6">
              {pending.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {locale === "es"
                    ? "No hay propiedades pendientes"
                    : "No pending properties"}
                </p>
              ) : (
                <PropertyTable properties={pending} showCheckboxes />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active">
          <Card>
            <CardContent className="pt-6">
              <PropertyTable properties={active} showActions={false} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected">
          <Card>
            <CardContent className="pt-6">
              <PropertyTable properties={rejected} showActions={false} />
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
              {locale === "es" ? "Rechazar Propiedad" : "Reject Property"}
            </DialogTitle>
            <DialogDescription>{rejectDialog.title}</DialogDescription>
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
                setRejectDialog({ open: false, propertyId: "", title: "" })
              }
            >
              {locale === "es" ? "Cancelar" : "Cancel"}
            </Button>
            <Button
              variant="destructive"
              onClick={
                rejectDialog.propertyId === "bulk"
                  ? handleBulkRejectConfirm
                  : handleReject
              }
              disabled={!rejectReason.trim() || bulkProcessing}
            >
              {locale === "es" ? "Rechazar" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
