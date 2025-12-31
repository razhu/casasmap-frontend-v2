"use client";

import { useParams } from "next/navigation";
import { useMyConversationsQuery } from "@/lib/graphql/generated";
import { ConversationListEnhanced } from "@/components/messaging/conversation-list-enhanced";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

function MessagesPageContent() {
  const params = useParams();
  const locale = params.locale as string;

  const { data, loading } = useMyConversationsQuery({
    pollInterval: 15000, // Poll every 15 seconds for new messages
  });

  const conversations = data?.myConversations || [];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {locale === "es" ? "Consultas" : "Inquiries"}
        </h1>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {locale === "es" ? "Consultas" : "Inquiries"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "es"
            ? `${conversations.length} ${
                conversations.length === 1 ? "conversación" : "conversaciones"
              }`
            : `${conversations.length} ${
                conversations.length === 1 ? "conversation" : "conversations"
              }`}
        </p>
      </div>

      {/* Conversations List */}
      <ConversationListEnhanced
        conversations={conversations as any}
        locale={locale}
      />
    </div>
  );
}

export default function MessagesPage() {
  return (
    <ProtectedRoute>
      <MessagesPageContent />
    </ProtectedRoute>
  );
}
