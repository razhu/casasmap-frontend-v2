"use client";

import { useParams } from "next/navigation";
import { useAdminUsersQuery } from "@/lib/graphql/generated";
import { Card, CardContent } from "@/components/ui/card";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, User as UserIcon } from "lucide-react";

export default function AdminUsersPage() {
  const params = useParams();
  const locale = (params.locale as string) || "es";

  const { data, loading } = useAdminUsersQuery();
  const users = data?.users || [];

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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
