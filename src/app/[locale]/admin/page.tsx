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
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

  // Prepare chart data
  const userGrowthData = prepareUserGrowthData(users);
  const revenueData = prepareRevenueData(payments);
  const propertyGrowthData = preparePropertyGrowthData(properties);

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

      <div className="grid gap-4 md:grid-cols-3">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {locale === "es" ? "Usuarios" : "Users"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Property Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {locale === "es" ? "Propiedades" : "Properties"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {propertiesLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={propertyGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="properties"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {locale === "es" ? "Ingresos" : "Revenue"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paymentsLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
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

// Helper functions for chart data
function prepareUserGrowthData(users: any[]) {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split("T")[0];
  });

  const usersByDate = users.reduce((acc: any, user) => {
    const date = new Date(user.createdAt).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  let cumulative = 0;
  return last30Days.map((date) => {
    cumulative += usersByDate[date] || 0;
    return {
      date: new Date(date).toLocaleDateString("es-ES", {
        month: "short",
        day: "numeric",
      }),
      users: cumulative,
    };
  });
}

function prepareRevenueData(payments: any[]) {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split("T")[0];
  });

  const revenueByDate = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((acc: any, payment) => {
      const date = new Date(payment.createdAt).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + payment.amount;
      return acc;
    }, {});

  return last30Days.map((date) => ({
    date: new Date(date).toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
    }),
    amount: revenueByDate[date] || 0,
  }));
}

function preparePropertyGrowthData(properties: any[]) {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split("T")[0];
  });

  const propertiesByDate = properties.reduce((acc: any, property) => {
    const date = new Date(property.createdAt).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  let cumulative = 0;
  return last30Days.map((date) => {
    cumulative += propertiesByDate[date] || 0;
    return {
      date: new Date(date).toLocaleDateString("es-ES", {
        month: "short",
        day: "numeric",
      }),
      properties: cumulative,
    };
  });
}
