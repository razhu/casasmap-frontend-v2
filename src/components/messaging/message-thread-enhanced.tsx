"use client";

import { useEffect, useRef, useState } from "react";
import {
  Send,
  Loader2,
  Check,
  CheckCheck,
  Crown,
  Search,
  X,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UserProfile {
  firstName?: string | null;
  lastName?: string | null;
  pictureUrl?: string | null;
}

interface Subscription {
  id: string;
  plan: string;
  status: string;
  endDate: string;
}

interface User {
  id: string;
  email: string;
  profile?: UserProfile | null;
  subscriptions?: Subscription[];
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender?: User;
  receiverId: string;
  receiver?: User;
  content: string;
  status: string;
  readAt?: string | null;
  createdAt: string;
}

interface MessageThreadEnhancedProps {
  messages: Message[];
  conversationId: string;
  onSendMessage: (content: string) => Promise<void>;
  onDeleteMessage?: (messageId: string) => Promise<void>;
  loading?: boolean;
  locale: string;
  otherUser?: User;
}

export function MessageThreadEnhanced({
  messages,
  conversationId,
  onSendMessage,
  onDeleteMessage,
  loading = false,
  locale,
  otherUser,
}: MessageThreadEnhancedProps) {
  const { user } = useAuthStore();
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [deleteMessageId, setDeleteMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator (in real app, use WebSocket)
  useEffect(() => {
    if (newMessage.length > 0) {
      setIsTyping(true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    } else {
      setIsTyping(false);
    }
  }, [newMessage]);

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      await onSendMessage(newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteMessageId || !onDeleteMessage) return;

    try {
      await onDeleteMessage(deleteMessageId);
      setDeleteMessageId(null);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(locale === "es" ? "es-ES" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return locale === "es" ? "Hoy" : "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return locale === "es" ? "Ayer" : "Yesterday";
    } else {
      return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US");
    }
  };

  const isPremiumUser = (user?: User) => {
    if (!user?.subscriptions || user.subscriptions.length === 0) return false;
    const activeSub = user.subscriptions[0];
    return (
      activeSub.status === "ACTIVE" &&
      ["PREMIUM", "PREMIUM_PLUS"].includes(activeSub.plan) &&
      new Date(activeSub.endDate) > new Date()
    );
  };

  const getUserInitials = (user?: User) => {
    if (user?.profile?.firstName && user?.profile?.lastName) {
      return `${user.profile.firstName[0]}${user.profile.lastName[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  };

  const getUserName = (user?: User) => {
    if (user?.profile?.firstName) {
      return `${user.profile.firstName} ${user.profile.lastName || ""}`.trim();
    }
    return user?.email?.split("@")[0] || "User";
  };

  // Filter messages by search query
  const filteredMessages = searchQuery
    ? messages.filter((msg) =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  // Group messages by date
  const groupedMessages = filteredMessages.reduce((groups, message) => {
    const date = formatDate(message.createdAt);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      {showSearch && (
        <div className="border-b p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={
                locale === "es" ? "Buscar mensajes..." : "Search messages..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
              onClick={() => {
                setShowSearch(false);
                setSearchQuery("");
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Header with search button */}
      {!showSearch && (
        <div className="border-b p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={otherUser?.profile?.pictureUrl || ""} />
              <AvatarFallback className="text-xs">
                {getUserInitials(otherUser)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{getUserName(otherUser)}</p>
              {isPremiumUser(otherUser) && (
                <Badge variant="secondary" className="h-4 text-xs">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            {/* Date separator */}
            <div className="flex items-center justify-center my-4">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1">
                <span className="text-xs text-muted-foreground">{date}</span>
              </div>
            </div>

            {/* Messages for this date */}
            {dateMessages.map((message) => {
              const isOwn = message.senderId === user?.id;
              const messageUser = isOwn ? message.sender : message.receiver;
              const isPremium = isPremiumUser(messageUser);

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2 mb-4 group",
                    isOwn ? "justify-end" : "justify-start"
                  )}
                >
                  {!isOwn && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={messageUser?.profile?.pictureUrl || ""}
                      />
                      <AvatarFallback className="text-xs">
                        {getUserInitials(messageUser)}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className="flex flex-col gap-1 max-w-[70%]">
                    {/* Premium badge above message */}
                    {isPremium && !isOwn && (
                      <Badge
                        variant="secondary"
                        className="h-5 text-xs w-fit ml-2"
                      >
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}

                    <div
                      className={cn(
                        "rounded-lg px-4 py-2 relative",
                        isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-gray-100 dark:bg-gray-800"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                      <div
                        className={cn(
                          "flex items-center gap-1 mt-1",
                          isOwn ? "justify-end" : "justify-start"
                        )}
                      >
                        <span
                          className={cn(
                            "text-xs",
                            isOwn
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          )}
                        >
                          {formatTime(message.createdAt)}
                        </span>
                        {/* Read receipts (Premium feature) */}
                        {isOwn && isPremiumUser(user as any) && (
                          <span className="text-primary-foreground/70">
                            {message.readAt ? (
                              <CheckCheck className="h-3 w-3 text-blue-400" />
                            ) : (
                              <Check className="h-3 w-3" />
                            )}
                          </span>
                        )}
                      </div>

                      {/* Delete button (only for own messages) */}
                      {isOwn && onDeleteMessage && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setDeleteMessageId(message.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {isOwn && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profile?.pictureUrl || ""} />
                      <AvatarFallback className="text-xs">
                        {getUserInitials(user as any)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && otherUser && (
          <div className="flex gap-2 items-center text-sm text-muted-foreground">
            <Avatar className="h-6 w-6">
              <AvatarImage src={otherUser.profile?.pictureUrl || ""} />
              <AvatarFallback className="text-xs">
                {getUserInitials(otherUser)}
              </AvatarFallback>
            </Avatar>
            <span>{locale === "es" ? "escribiendo..." : "typing..."}</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            placeholder={
              locale === "es" ? "Escribe un mensaje..." : "Write a message..."
            }
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={sending}
            rows={2}
            className="resize-none"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            size="icon"
            className="h-auto"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={!!deleteMessageId}
        onOpenChange={() => setDeleteMessageId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {locale === "es" ? "Eliminar mensaje" : "Delete message"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {locale === "es"
                ? "¿Estás seguro de que quieres eliminar este mensaje? Esta acción no se puede deshacer."
                : "Are you sure you want to delete this message? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {locale === "es" ? "Cancelar" : "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              {locale === "es" ? "Eliminar" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
