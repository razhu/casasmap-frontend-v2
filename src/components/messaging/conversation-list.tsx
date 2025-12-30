"use client";

import { useRouter } from "next/navigation";
import { MessageCircle, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/auth";

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  readAt?: string | null;
}

interface Conversation {
  id: string;
  participant1Id: string;
  participant2Id: string;
  propertyId?: string | null;
  lastMessageAt?: string | null;
  createdAt: string;
  messages?: Message[];
}

interface ConversationListProps {
  conversations: Conversation[];
  locale: string;
}

export function ConversationList({
  conversations,
  locale,
}: ConversationListProps) {
  const router = useRouter();
  const { user } = useAuthStore();

  const getOtherParticipantId = (conversation: Conversation) => {
    return conversation.participant1Id === user?.id
      ? conversation.participant2Id
      : conversation.participant1Id;
  };

  const getLastMessage = (conversation: Conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return null;
    }
    return conversation.messages[conversation.messages.length - 1];
  };

  const hasUnreadMessages = (conversation: Conversation) => {
    if (!conversation.messages) return false;
    return conversation.messages.some(
      (msg) => msg.senderId !== user?.id && !msg.readAt
    );
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
    if (seconds < 604800)
      return `${Math.floor(seconds / 86400)}${locale === "es" ? "d" : "d"}`;
    return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US");
  };

  const handleConversationClick = (conversationId: string) => {
    const path =
      locale === "es"
        ? `/messages/${conversationId}`
        : `/${locale}/messages/${conversationId}`;
    router.push(path);
  };

  if (conversations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <MessageCircle className="h-8 w-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          {locale === "es" ? "No hay conversaciones" : "No conversations"}
        </h3>
        <p className="text-muted-foreground">
          {locale === "es"
            ? "Tus conversaciones aparecerán aquí"
            : "Your conversations will appear here"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => {
        const lastMessage = getLastMessage(conversation);
        const hasUnread = hasUnreadMessages(conversation);

        return (
          <Card
            key={conversation.id}
            className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
              hasUnread ? "border-primary" : ""
            }`}
            onClick={() => handleConversationClick(conversation.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold truncate">
                      {locale === "es" ? "Usuario" : "User"}{" "}
                      {getOtherParticipantId(conversation).slice(0, 8)}
                    </p>
                    {lastMessage && (
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(lastMessage.createdAt)}
                      </span>
                    )}
                  </div>

                  {lastMessage && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {lastMessage.senderId === user?.id &&
                          `${locale === "es" ? "Tú: " : "You: "}`}
                        {lastMessage.content}
                      </p>
                      {hasUnread && (
                        <Badge
                          variant="default"
                          className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                        >
                          !
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
