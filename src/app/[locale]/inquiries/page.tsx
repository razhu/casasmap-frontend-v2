"use client";

import { useParams } from "next/navigation";
import { useMyInquiriesQuery } from "@/lib/graphql/generated";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Loader2, Mail, Phone, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function InquiriesPageContent() {
  const params = useParams();
  const locale = params.locale as string;

  const { data, loading } = useMyInquiriesQuery();

  const inquiries = data?.myInquiries || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-500";
      case "READ":
        return "bg-yellow-500";
      case "REPLIED":
        return "bg-green-500";
      case "CLOSED":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    if (locale === "es") {
      switch (status) {
        case "NEW":
          return "Nuevo";
        case "READ":
          return "Leído";
        case "REPLIED":
          return "Respondido";
        case "CLOSED":
          return "Cerrado";
        default:
          return status;
      }
    } else {
      return status.charAt(0) + status.slice(1).toLowerCase();
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {locale === "es" ? "Mis Consultas" : "My Inquiries"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "es"
            ? `${inquiries.length} ${
                inquiries.length === 1
                  ? "consulta enviada"
                  : "consultas enviadas"
              }`
            : `${inquiries.length} ${
                inquiries.length === 1 ? "inquiry sent" : "inquiries sent"
              }`}
        </p>
      </div>

      {/* Empty State */}
      {inquiries.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Mail className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            {locale === "es"
              ? "No has enviado consultas aún"
              : "No inquiries sent yet"}
          </h2>
          <p className="text-muted-foreground">
            {locale === "es"
              ? "Cuando envíes consultas sobre propiedades, aparecerán aquí"
              : "When you send inquiries about properties, they will appear here"}
          </p>
        </div>
      )}

      {/* Inquiries List */}
      {inquiries.length > 0 && (
        <div className="space-y-4">
          {inquiries.map((inquiry) => {
            const propertyTitle =
              locale === "es"
                ? inquiry.property?.title
                : inquiry.property?.titleEn || inquiry.property?.title;

            return (
              <Card key={inquiry.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">
                        {propertyTitle}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {formatDate(inquiry.createdAt)}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(inquiry.status)}>
                      {getStatusText(inquiry.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">
                      {locale === "es" ? "Mensaje:" : "Message:"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {inquiry.message}
                    </p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-1">
                        {locale === "es" ? "Nombre:" : "Name:"}
                      </p>
                      <p className="text-muted-foreground">{inquiry.name}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">
                        {locale === "es" ? "Email:" : "Email:"}
                      </p>
                      <p className="text-muted-foreground">{inquiry.email}</p>
                    </div>
                    {inquiry.phone && (
                      <div>
                        <p className="font-medium mb-1">
                          {locale === "es" ? "Teléfono:" : "Phone:"}
                        </p>
                        <p className="text-muted-foreground">{inquiry.phone}</p>
                      </div>
                    )}
                  </div>

                  {inquiry.property && (
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">
                        {inquiry.property.address}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function InquiriesPage() {
  return (
    <ProtectedRoute>
      <InquiriesPageContent />
    </ProtectedRoute>
  );
}
