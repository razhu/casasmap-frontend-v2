"use client";

import { useParams } from "next/navigation";
import {
  Users,
  Building2,
  DollarSign,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useAdminUsersQuery,
  useAdminPropertiesQuery,
  useAdminPaymentsQuery,
} from "@/lib/graphql/generated";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardPage() {
  const params = useParams();
  const locale = (params.locale as string) || "es";

  const { data: usersData, loading: usersLoading } = useAdminUsersQuery();
  const { data: propertiesData, loading: propertiesLoading } =
    useAdminPropertiesQuery();
  const { data: paymentsData, loading: paymentsLoading } =
    useAdminPaymentsQuery();

  const users = usersData?.users || [];
  const properties = propertiesData?.properties?.data || [];
  const payments = paymentsData?.allPayments || [];

  // Calculate stats
  const activeUsers = users.filter((u) => u.status === "ACTIVE").length;
  const pendingProperties = properties.filter(
    (p) => p.status === "PENDING"
  ).length;
  const activeProperties = properties.filter(
    (p) => p.status === "ACTIVE"
  ).length;
  const rejectedProperties = properties.filter(
    (p) => p.status === "REJECTED"
  ).length;
  const completedPayments = payments.filter((p) => p.status === "COMPLETED");
  const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    {
      title: locale === "es" ? "Total Usuarios" : "Total Users",
      value: users.length.toString(),
      icon: Users,
      subtitle:
        locale === "es" ? `${activeUsers} activos` : `${activeUsers} active`,
      loading: usersLoading,
    },
    {
      title: locale === "es" ? "Total Propiedades" : "Total Properties",
      value: properties.length.toString(),
      icon: Building2,
      subtitle:
        locale === "es"
          ? `${pendingProperties} pendientes`
          : `${pendingProperties} pending`,
      loading: propertiesLoading,
    },
    {
      title: locale === "es" ? "Ingresos Totales" : "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      subtitle:
        locale === "es"
          ? `${completedPayments.length} pagos`
          : `${completedPayments.length} payments`,
      loading: paymentsLoading,
    },
    {
      title: locale === "es" ? "Propiedades Activas" : "Active Properties",
      value: activeProperties.toString(),
      icon: Activity,
      subtitle:
        locale === "es"
          ? `${rejectedProperties} rechazadas`
          : `${rejectedProperties} rejected`,
      loading: propertiesLoading,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {locale === "es" ? "Panel de Administración" : "Admin Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "es" ? "Resumen general del sistema" : "System overview"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {stat.loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.subtitle}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Properties */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === "es" ? "Propiedades Recientes" : "Recent Properties"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {propertiesLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                {properties.slice(0, 5).map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{property.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {property.user?.profile?.firstName}{" "}
                        {property.user?.profile?.lastName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {property.status === "PENDING" && (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                      {property.status === "ACTIVE" && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {property.status === "REJECTED" && (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-sm font-medium">
                        ${property.priceUS?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === "es" ? "Pagos Recientes" : "Recent Payments"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paymentsLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                {payments.slice(0, 5).map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{payment.plan}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {payment.status === "COMPLETED" && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {payment.status === "PENDING" && (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm font-medium">
                        ${payment.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
