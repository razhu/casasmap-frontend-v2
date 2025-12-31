"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Send,
  Loader2,
  Check,
  CheckCheck,
  Crown,
  Search,
  X,
  Trash2,
  MoreVertical,
  Flag,
  Ban,
  ExternalLink,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  propertyId?: string | null;
  readAt?: string | null;
  createdAt: string;
}

interface MessageThreadWithActionsProps {
  messages: Message[];
  conversationId: string;
  onSendMessage: (content: string) => Promise<void>;
  onDeleteMessage?: (messageId: string) => Promise<void>;
  onBlockUser?: (userId: string, reason?: string) => Promise<void>;
  onReportMessage?: (
    messageId: string,
    reason: string,
    details?: string
  ) => Promise<void>;
  loading?: boolean;
  locale: string;
  otherUser?: User;
}

export function MessageThreadWithActions({
  messages,
  conversationId,
  onSendMessage,
  onDeleteMessage,
  onBlockUser,
  onReportMessage,
  loading = false,
  locale,
  otherUser,
}: MessageThreadWithActionsProps) {
  const { user } = useAuthStore();
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [deleteMessageId, setDeleteMessageId] = useState<string | null>(null);
  const [reportMessageId, setReportMessageId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get property ID from first message
  const propertyId = messages.length > 0 ? messages[0].propertyId : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleBlock = async () => {
    if (!otherUser || !onBlockUser) return;

    try {
      await onBlockUser(otherUser.id, blockReason || undefined);
      setShowBlockDialog(false);
      setBlockReason("");
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handleReport = async () => {
    if (!reportMessageId || !onReportMessage || !reportReason) return;

    try {
      await onReportMessage(
        reportMessageId,
        reportReason,
        reportDetails || undefined
      );
      setReportMessageId(null);
      setReportReason("");
      setReportDetails("");
    } catch (error) {
      console.error("Error reporting message:", error);
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
      {/* Property Card */}
      {propertyId && (
        <Card className="m-4 mb-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Home className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {locale === "es"
                      ? "Consulta sobre propiedad"
                      : "Inquiry about property"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ID: {propertyId.slice(0, 8)}...
                  </p>
                </div>
              </div>
              <Link href={`/properties/${propertyId}`} target="_blank">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {locale === "es" ? "Ver propiedad" : "View property"}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header with search and menu */}
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
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowBlockDialog(true)}>
                <Ban className="h-4 w-4 mr-2" />
                {locale === "es" ? "Bloquear usuario" : "Block user"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

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

                      {/* Action buttons */}
                      <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        {isOwn && onDeleteMessage && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setDeleteMessageId(message.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                        {!isOwn && onReportMessage && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setReportMessageId(message.id)}
                          >
                            <Flag className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
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

      {/* Block user dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {locale === "es" ? "Bloquear usuario" : "Block user"}
            </DialogTitle>
            <DialogDescription>
              {locale === "es"
                ? "Este usuario no podrá enviarte mensajes."
                : "This user will not be able to send you messages."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="blockReason">
                {locale === "es" ? "Razón (opcional)" : "Reason (optional)"}
              </Label>
              <Textarea
                id="blockReason"
                placeholder={
                  locale === "es"
                    ? "¿Por qué bloqueas a este usuario?"
                    : "Why are you blocking this user?"
                }
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
              {locale === "es" ? "Cancelar" : "Cancel"}
            </Button>
            <Button variant="destructive" onClick={handleBlock}>
              {locale === "es" ? "Bloquear" : "Block"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report message dialog */}
      <Dialog
        open={!!reportMessageId}
        onOpenChange={() => setReportMessageId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {locale === "es" ? "Reportar mensaje" : "Report message"}
            </DialogTitle>
            <DialogDescription>
              {locale === "es"
                ? "Ayúdanos a mantener la comunidad segura."
                : "Help us keep the community safe."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reportReason">
                {locale === "es" ? "Razón" : "Reason"}
              </Label>
              <Select value={reportReason} onValueChange={setReportReason}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      locale === "es"
                        ? "Selecciona una razón"
                        : "Select a reason"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spam">Spam</SelectItem>
                  <SelectItem value="harassment">
                    {locale === "es" ? "Acoso" : "Harassment"}
                  </SelectItem>
                  <SelectItem value="inappropriate">
                    {locale === "es"
                      ? "Contenido inapropiado"
                      : "Inappropriate content"}
                  </SelectItem>
                  <SelectItem value="scam">
                    {locale === "es" ? "Estafa" : "Scam"}
                  </SelectItem>
                  <SelectItem value="other">
                    {locale === "es" ? "Otro" : "Other"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reportDetails">
                {locale === "es" ? "Detalles (opcional)" : "Details (optional)"}
              </Label>
              <Textarea
                id="reportDetails"
                placeholder={
                  locale === "es"
                    ? "Proporciona más información..."
                    : "Provide more information..."
                }
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportMessageId(null)}>
              {locale === "es" ? "Cancelar" : "Cancel"}
            </Button>
            <Button onClick={handleReport} disabled={!reportReason}>
              {locale === "es" ? "Reportar" : "Report"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
