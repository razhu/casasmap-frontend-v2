"use client";

import { useParams } from "next/navigation";
import {
  useNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteNotificationMutation,
} from "@/lib/graphql/generated";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Loader2, Bell, Trash2, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function NotificationsPageContent() {
  const params = useParams();
  const locale = params.locale as string;

  const { data, loading, refetch } = useNotificationsQuery({
    variables: { page: 1, limit: 50 },
  });

  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const notifications = data?.notifications?.data || [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead({ variables: { id } });
      await refetch();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      await refetch();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification({ variables: { id } });
      await refetch();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      locale === "es" ? "es-BO" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const getNotificationIcon = (type: string) => {
    // You can customize icons based on notification type
    return "🔔";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {locale === "es" ? "Notificaciones" : "Notifications"}
          </h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? locale === "es"
                ? `${unreadCount} ${unreadCount === 1 ? "nueva" : "nuevas"}`
                : `${unreadCount} ${unreadCount === 1 ? "new" : "new"}`
              : locale === "es"
              ? "No tienes notificaciones nuevas"
              : "No new notifications"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="outline">
            <Check className="h-4 w-4 mr-2" />
            {locale === "es" ? "Marcar todas como leídas" : "Mark all as read"}
          </Button>
        )}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Bell className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            {locale === "es" ? "No tienes notificaciones" : "No notifications"}
          </h2>
          <p className="text-muted-foreground">
            {locale === "es"
              ? "Cuando recibas notificaciones, aparecerán aquí"
              : "When you receive notifications, they will appear here"}
          </p>
        </div>
      )}

      {/* Notifications List */}
      {notifications.length > 0 && (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={notification.read ? "opacity-60" : ""}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-2xl mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base mb-1">
                        {notification.title}
                      </CardTitle>
                      <CardDescription>{notification.message}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Badge variant="default" className="ml-2">
                        {locale === "es" ? "Nueva" : "New"}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {formatDate(notification.createdAt)}
                  </p>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        {locale === "es" ? "Marcar leída" : "Mark read"}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <NotificationsPageContent />
    </ProtectedRoute>
  );
}
