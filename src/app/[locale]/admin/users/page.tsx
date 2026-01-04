"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useAdminUsersQuery } from "@/lib/graphql/generated";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Crown,
  User as UserIcon,
  Eye,
  Mail,
  Phone,
  Shield,
  Briefcase,
  UserCog,
  Ban,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AdminUsersPage() {
  const params = useParams();
  const locale = (params.locale as string) || "es";

  const { data, loading } = useAdminUsersQuery();
  const users = data?.users || [];

  const [viewDialog, setViewDialog] = useState<{
    open: boolean;
    user: any;
  }>({
    open: false,
    user: null,
  });

  const [deactivateDialog, setDeactivateDialog] = useState<{
    open: boolean;
    user: any;
  }>({
    open: false,
    user: null,
  });

  const getRoleIcon = (roleName: string) => {
    switch (roleName) {
      case "Super Admin":
        return <Crown className="h-3 w-3 mr-1" />;
      case "Admin":
        return <Shield className="h-3 w-3 mr-1" />;
      case "Agency Manager":
        return <Briefcase className="h-3 w-3 mr-1" />;
      case "Property Owner":
        return <UserCog className="h-3 w-3 mr-1" />;
      default:
        return <UserIcon className="h-3 w-3 mr-1" />;
    }
  };

  const getRoleVariant = (
    roleName: string
  ): "default" | "secondary" | "outline" => {
    switch (roleName) {
      case "Super Admin":
        return "default";
      case "Admin":
        return "secondary";
      default:
        return "outline";
    }
  };

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
          {locale === "es" ? "Gestión de Usuarios" : "User Management"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "es"
            ? `${users.length} usuarios registrados`
            : `${users.length} registered users`}
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === "es" ? "Usuario" : "User"}</TableHead>
                <TableHead>{locale === "es" ? "Email" : "Email"}</TableHead>
                <TableHead>{locale === "es" ? "Rol" : "Role"}</TableHead>
                <TableHead>{locale === "es" ? "Plan" : "Plan"}</TableHead>
                <TableHead>{locale === "es" ? "Estado" : "Status"}</TableHead>
                <TableHead>
                  {locale === "es" ? "Registro" : "Registered"}
                </TableHead>
                <TableHead className="text-right">
                  {locale === "es" ? "Acciones" : "Actions"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.profile?.pictureUrl || ""} />
                        <AvatarFallback>
                          {user.profile?.firstName?.[0]}
                          {user.profile?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {user.profile?.firstName} {user.profile?.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          @{user.username || user.email.split("@")[0]}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleVariant(user.role.name)}>
                      {getRoleIcon(user.role.name)}
                      {user.role.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.subscriptions?.[0]?.plan || "FREE"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "ACTIVE" ? "default" : "secondary"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewDialog({ open: true, user })}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {locale === "es"
                              ? "Ver detalles del usuario"
                              : "View user details"}
                          </p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewDialog({ open: true, user })}
                          >
                            <UserCog className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {locale === "es" ? "Editar usuario" : "Edit user"}
                          </p>
                        </TooltipContent>
                      </Tooltip>

                      {user.status === "ACTIVE" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setDeactivateDialog({ open: true, user })
                              }
                            >
                              <Ban className="h-4 w-4 text-destructive" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {locale === "es"
                                ? "Desactivar usuario"
                                : "Deactivate user"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View User Dialog */}
      <Dialog
        open={viewDialog.open}
        onOpenChange={(open) => setViewDialog({ ...viewDialog, open })}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {locale === "es" ? "Detalles del Usuario" : "User Details"}
            </DialogTitle>
          </DialogHeader>
          {viewDialog.user && (
            <div className="space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={viewDialog.user.profile?.pictureUrl || ""}
                  />
                  <AvatarFallback className="text-2xl">
                    {viewDialog.user.profile?.firstName?.[0]}
                    {viewDialog.user.profile?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">
                    {viewDialog.user.profile?.firstName}{" "}
                    {viewDialog.user.profile?.lastName}
                  </h3>
                  <p className="text-muted-foreground">
                    @
                    {viewDialog.user.username ||
                      viewDialog.user.email.split("@")[0]}
                  </p>
                  <Badge
                    variant={getRoleVariant(viewDialog.user.role.name)}
                    className="mt-2"
                  >
                    {getRoleIcon(viewDialog.user.role.name)}
                    {viewDialog.user.role.name}
                  </Badge>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{viewDialog.user.email}</span>
                </div>
                {viewDialog.user.profile?.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{viewDialog.user.profile.phoneNumber}</span>
                  </div>
                )}
              </div>

              {/* Subscription Info */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">
                  {locale === "es" ? "Suscripción" : "Subscription"}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === "es" ? "Plan" : "Plan"}
                    </p>
                    <p className="font-medium">
                      {viewDialog.user.subscriptions?.[0]?.plan || "FREE"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === "es" ? "Estado" : "Status"}
                    </p>
                    <Badge
                      variant={
                        viewDialog.user.subscriptions?.[0]?.status === "ACTIVE"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {viewDialog.user.subscriptions?.[0]?.status || "N/A"}
                    </Badge>
                  </div>
                  {viewDialog.user.subscriptions?.[0]?.endDate && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {locale === "es" ? "Vence" : "Expires"}
                      </p>
                      <p className="font-medium">
                        {new Date(
                          viewDialog.user.subscriptions[0].endDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Info */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">
                  {locale === "es" ? "Cuenta" : "Account"}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === "es" ? "Estado" : "Status"}
                    </p>
                    <Badge
                      variant={
                        viewDialog.user.status === "ACTIVE"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {viewDialog.user.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === "es" ? "Registrado" : "Registered"}
                    </p>
                    <p className="font-medium">
                      {new Date(viewDialog.user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewDialog({ open: false, user: null })}
            >
              {locale === "es" ? "Cerrar" : "Close"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate User Dialog */}
      <Dialog
        open={deactivateDialog.open}
        onOpenChange={(open) =>
          setDeactivateDialog({ ...deactivateDialog, open })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {locale === "es" ? "Desactivar Usuario" : "Deactivate User"}
            </DialogTitle>
            <DialogDescription>
              {deactivateDialog.user && (
                <>
                  {deactivateDialog.user.profile?.firstName}{" "}
                  {deactivateDialog.user.profile?.lastName} (
                  {deactivateDialog.user.email})
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {locale === "es"
                ? "¿Estás seguro de que deseas desactivar este usuario? El usuario no podrá iniciar sesión hasta que sea reactivado."
                : "Are you sure you want to deactivate this user? The user will not be able to log in until reactivated."}
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">
                {locale === "es" ? "Esto hará que:" : "This will:"}
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>
                  {locale === "es"
                    ? "El usuario no pueda iniciar sesión"
                    : "User cannot log in"}
                </li>
                <li>
                  {locale === "es"
                    ? "Sus propiedades se oculten"
                    : "Their properties will be hidden"}
                </li>
                <li>
                  {locale === "es"
                    ? "Se pueda reactivar más tarde"
                    : "Can be reactivated later"}
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeactivateDialog({ open: false, user: null })}
            >
              {locale === "es" ? "Cancelar" : "Cancel"}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // TODO: Implement deactivate user mutation
                console.log("Deactivate user:", deactivateDialog.user?.id);
                setDeactivateDialog({ open: false, user: null });
              }}
            >
              <Ban className="h-4 w-4 mr-2" />
              {locale === "es" ? "Desactivar" : "Deactivate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
