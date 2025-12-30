"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  useUnreadNotificationsCountQuery,
  useNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
} from "@/lib/graphql/generated";
import { useAuthStore } from "@/store/auth";

interface NotificationBellProps {
  locale: string;
}

export function NotificationBell({ locale }: NotificationBellProps) {
  const router = useRouter();
  const { token, _hasHydrated } = useAuthStore();
  const [open, setOpen] = useState(false);

  // Query unread count
  const { data: countData, refetch: refetchCount } =
    useUnreadNotificationsCountQuery({
      skip: !token || !_hasHydrated,
      pollInterval: 30000, // Poll every 30 seconds
    });

  // Query recent notifications
  const { data: notificationsData, refetch: refetchNotifications } =
    useNotificationsQuery({
      variables: { page: 1, limit: 5 },
      skip: !token || !_hasHydrated || !open,
    });

  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();

  const unreadCount = countData?.unreadNotificationsCount || 0;
  const notifications = notificationsData?.notifications?.data || [];

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead({ variables: { id } });
      await refetchCount();
      await refetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      await refetchCount();
      await refetchNotifications();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleViewAll = () => {
    setOpen(false);
    const notificationsPath =
      locale === "es" ? "/notifications" : `/${locale}/notifications`;
    router.push(notificationsPath);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return locale === "es" ? "Ahora" : "Now";
    if (seconds < 3600)
      return `${Math.floor(seconds / 60)}${locale === "es" ? "m" : "m"}`;
    if (seconds < 86400)
      return `${Math.floor(seconds / 3600)}${locale === "es" ? "h" : "h"}`;
    return `${Math.floor(seconds / 86400)}${locale === "es" ? "d" : "d"}`;
  };

  if (!token || !_hasHydrated) {
    return null;
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>{locale === "es" ? "Notificaciones" : "Notifications"}</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="h-auto p-1 text-xs"
            >
              {locale === "es" ? "Marcar todas" : "Mark all"}
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            {locale === "es" ? "No tienes notificaciones" : "No notifications"}
          </div>
        ) : (
          <>
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start p-3 cursor-pointer"
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex items-start justify-between w-full gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(notification.createdAt)}
                    </span>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-center justify-center"
              onClick={handleViewAll}
            >
              {locale === "es" ? "Ver todas" : "View all"}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
