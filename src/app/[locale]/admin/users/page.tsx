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
import { Crown, User as UserIcon, Eye, Mail, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
                    <Badge
                      variant={
                        user.role.name === "Super Admin"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {user.role.name === "Super Admin" && (
                        <Crown className="h-3 w-3 mr-1" />
                      )}
                      {user.role.name === "Admin" && (
                        <UserIcon className="h-3 w-3 mr-1" />
                      )}
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewDialog({ open: true, user })}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
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
                    variant={
                      viewDialog.user.role.name === "Super Admin"
                        ? "default"
                        : "secondary"
                    }
                    className="mt-2"
                  >
                    {viewDialog.user.role.name === "Super Admin" && (
                      <Crown className="h-3 w-3 mr-1" />
                    )}
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
    </div>
  );
}
