"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InquiryForm } from "./inquiry-form";
import { Mail } from "lucide-react";

interface InquiryButtonProps {
  propertyId: string;
  propertyTitle: string;
  locale: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function InquiryButton({
  propertyId,
  propertyTitle,
  locale,
  variant = "outline",
  size = "lg",
  className,
}: InquiryButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Mail className="h-4 w-4 mr-2" />
          {locale === "es" ? "Enviar mensaje" : "Send message"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {locale === "es" ? "Contactar al propietario" : "Contact owner"}
          </DialogTitle>
          <DialogDescription>
            {locale === "es"
              ? "Envía un mensaje al propietario de esta propiedad. Te responderán directamente a tu correo electrónico."
              : "Send a message to the property owner. They will respond directly to your email."}
          </DialogDescription>
        </DialogHeader>
        <InquiryForm
          propertyId={propertyId}
          propertyTitle={propertyTitle}
          locale={locale}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
