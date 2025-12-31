"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useConversationMessagesQuery,
  useSendMessageMutation,
  useMarkConversationAsReadMutation,
  useDeleteMessageMutation,
  useBlockUserMutation,
  useReportMessageMutation,
} from "@/lib/graphql/generated";
import { MessageThreadWithActions } from "@/components/messaging/message-thread-with-actions";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

function ConversationPageContent() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const conversationId = params.conversationId as string;
  const { user } = useAuthStore();

  const { data, loading, refetch } = useConversationMessagesQuery({
    variables: { conversationId },
    pollInterval: 10000, // Poll every 10 seconds for new messages
  });

  const [sendMessage] = useSendMessageMutation();
  const [markAsRead] = useMarkConversationAsReadMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [blockUser] = useBlockUserMutation();
  const [reportMessage] = useReportMessageMutation();

  const messages = data?.conversationMessages || [];

  // Get other user from messages
  const otherUser =
    messages.length > 0
      ? messages[0].senderId === user?.id
        ? messages[0].receiver
        : messages[0].sender
      : undefined;

  // Mark conversation as read when opened
  useEffect(() => {
    if (conversationId) {
      markAsRead({ variables: { conversationId } }).catch((error) => {
        console.error("Error marking as read:", error);
      });
    }
  }, [conversationId, markAsRead]);

  const handleSendMessage = async (content: string) => {
    try {
      // Get receiver ID from messages
      const firstMessage = messages[0];
      if (!firstMessage) {
        throw new Error("No messages found");
      }

      const receiverId =
        firstMessage.senderId === user?.id
          ? firstMessage.receiverId
          : firstMessage.senderId;

      await sendMessage({
        variables: {
          input: {
            conversationId,
            receiverId,
            content,
          },
        },
      });

      // Refetch messages
      await refetch();
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(
        locale === "es" ? "Error al enviar mensaje" : "Error sending message"
      );
      throw error;
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage({
        variables: { messageId },
      });

      toast.success(locale === "es" ? "Mensaje eliminado" : "Message deleted");

      // Refetch messages
      await refetch();
    } catch (error: any) {
      console.error("Error deleting message:", error);
      toast.error(
        locale === "es" ? "Error al eliminar mensaje" : "Error deleting message"
      );
      throw error;
    }
  };

  const handleBlockUser = async (userId: string, reason?: string) => {
    try {
      await blockUser({
        variables: { blockedId: userId, reason },
      });

      toast.success(locale === "es" ? "Usuario bloqueado" : "User blocked");

      // Redirect back to messages
      const messagesPath =
        locale === "es" ? "/messages" : `/${locale}/messages`;
      router.push(messagesPath);
    } catch (error: any) {
      console.error("Error blocking user:", error);
      toast.error(
        locale === "es" ? "Error al bloquear usuario" : "Error blocking user"
      );
      throw error;
    }
  };

  const handleReportMessage = async (
    messageId: string,
    reason: string,
    details?: string
  ) => {
    try {
      await reportMessage({
        variables: { messageId, reason, details },
      });

      toast.success(locale === "es" ? "Mensaje reportado" : "Message reported");
    } catch (error: any) {
      console.error("Error reporting message:", error);

      if (error.message?.includes("already reported")) {
        toast.error(
          locale === "es"
            ? "Ya has reportado este mensaje"
            : "You have already reported this message"
        );
      } else {
        toast.error(
          locale === "es"
            ? "Error al reportar mensaje"
            : "Error reporting message"
        );
      }
      throw error;
    }
  };

  const handleBack = () => {
    const messagesPath = locale === "es" ? "/messages" : `/${locale}/messages`;
    router.push(messagesPath);
  };

  return (
    <div className="h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="border-b p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">
              {locale === "es" ? "Consulta" : "Inquiry"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {messages.length}{" "}
              {locale === "es"
                ? messages.length === 1
                  ? "mensaje"
                  : "mensajes"
                : messages.length === 1
                ? "message"
                : "messages"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="container mx-auto h-[calc(100%-5rem)]">
        <MessageThreadWithActions
          messages={messages as any}
          conversationId={conversationId}
          onSendMessage={handleSendMessage}
          onDeleteMessage={handleDeleteMessage}
          onBlockUser={handleBlockUser}
          onReportMessage={handleReportMessage}
          loading={loading}
          locale={locale}
          otherUser={otherUser as any}
        />
      </div>
    </div>
  );
}

export default function ConversationPage() {
  return (
    <ProtectedRoute>
      <ConversationPageContent />
    </ProtectedRoute>
  );
}
