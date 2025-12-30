"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useSendMessageMutation } from "@/lib/graphql/generated";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface MessageButtonProps {
  receiverId: string;
  receiverName: string;
  propertyId?: string;
  locale: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function MessageButton({
  receiverId,
  receiverName,
  propertyId,
  locale,
  variant = "default",
  size = "default",
}: MessageButtonProps) {
  const router = useRouter();
  const { token, _hasHydrated } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [sendMessage] = useSendMessageMutation();

  const handleSend = async () => {
    if (!token || !_hasHydrated) {
      const loginPath = locale === "es" ? "/login" : `/${locale}/login`;
      router.push(loginPath);
      return;
    }

    if (!message.trim()) {
      toast.error(
        locale === "es"
          ? "Por favor escribe un mensaje"
          : "Please write a message"
      );
      return;
    }

    setLoading(true);

    try {
      const result = await sendMessage({
        variables: {
          input: {
            receiverId,
            content: message,
            propertyId,
          },
        },
      });

      if (result.data?.sendMessage) {
        toast.success(locale === "es" ? "Consulta enviada" : "Inquiry sent");
        setMessage("");
        setOpen(false);

        // Redirect to conversation
        const conversationId = result.data.sendMessage.conversationId;
        const messagesPath =
          locale === "es"
            ? `/messages/${conversationId}`
            : `/${locale}/messages/${conversationId}`;
        router.push(messagesPath);
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(
        locale === "es" ? "Error al enviar consulta" : "Error sending inquiry"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size}>
          <MessageCircle className="h-4 w-4 mr-2" />
          {locale === "es" ? "Enviar consulta" : "Send inquiry"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {locale === "es" ? "Enviar consulta a" : "Send inquiry to"}{" "}
            {receiverName}
          </DialogTitle>
          <DialogDescription>
            {locale === "es"
              ? "Escribe tu consulta sobre esta propiedad."
              : "Write your inquiry about this property."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder={
              locale === "es"
                ? "Escribe tu consulta aquí..."
                : "Write your inquiry here..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            disabled={loading}
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              {locale === "es" ? "Cancelar" : "Cancel"}
            </Button>
            <Button onClick={handleSend} disabled={loading || !message.trim()}>
              {loading
                ? locale === "es"
                  ? "Enviando..."
                  : "Sending..."
                : locale === "es"
                ? "Enviar"
                : "Send"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
