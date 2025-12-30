"use client";

import { useRouter } from "next/navigation";
import { MessageCircle, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/auth";

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
  content: string;
  senderId: string;
  createdAt: string;
  readAt?: string | null;
}

interface Conversation {
  id: string;
  participant1Id: string;
  participant1?: User;
  participant2Id: string;
  participant2?: User;
  propertyId?: string | null;
  lastMessageAt?: string | null;
  createdAt: string;
  messages?: Message[];
}

interface ConversationListEnhancedProps {
  conversations: Conversation[];
  locale: string;
}

export function ConversationListEnhanced({
  conversations,
  locale,
}: ConversationListEnhancedProps) {
  const router = useRouter();
  const { user } = useAuthStore();

  const getOtherUser = (conversation: Conversation): User | undefined => {
    return conversation.participant1Id === user?.id
      ? conversation.participant2
      : conversation.participant1;
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

  const isPremiumUser = (user?: User) => {
    if (!user?.subscriptions || user.subscriptions.length === 0) return false;
    const activeSub = user.subscriptions[0];
    return (
      activeSub.status === "ACTIVE" &&
      ["PREMIUM", "PREMIUM_PLUS"].includes(activeSub.plan) &&
      new Date(activeSub.endDate) > new Date()
    );
  };

  const getUserName = (user?: User) => {
    if (user?.profile?.firstName) {
      return `${user.profile.firstName} ${user.profile.lastName || ""}`.trim();
    }
    return user?.email?.split("@")[0] || "User";
  };

  const getUserInitials = (user?: User) => {
    if (user?.profile?.firstName && user?.profile?.lastName) {
      return `${user.profile.firstName[0]}${user.profile.lastName[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || "U";
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
        const otherUser = getOtherUser(conversation);
        const isPremium = isPremiumUser(otherUser);

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
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={otherUser?.profile?.pictureUrl || ""} />
                    <AvatarFallback>
                      {getUserInitials(otherUser)}
                    </AvatarFallback>
                  </Avatar>
                  {isPremium && (
                    <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-0.5">
                      <Crown className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold truncate">
                        {getUserName(otherUser)}
                      </p>
                      {isPremium && (
                        <Badge variant="secondary" className="h-5 text-xs">
                          Premium
                        </Badge>
                      )}
                    </div>
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
