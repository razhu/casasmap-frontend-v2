"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeletePropertyMutation } from "@/lib/graphql/generated";
import { useToast } from "@/hooks/use-toast";

interface DeletePropertyDialogProps {
  propertyId: string;
  propertyTitle: string;
  locale: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function DeletePropertyDialog({
  propertyId,
  propertyTitle,
  locale,
  variant = "destructive",
  size = "lg",
  className = "flex-1",
}: DeletePropertyDialogProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [deleteProperty, { loading }] = useDeletePropertyMutation();

  const handleDelete = async () => {
    try {
      await deleteProperty({
        variables: { id: propertyId },
      });

      toast({
        title: locale === "es" ? "Propiedad eliminada" : "Property deleted",
        description:
          locale === "es"
            ? "La propiedad ha sido eliminada exitosamente"
            : "Property has been deleted successfully",
      });

      // Redirect to properties list
      router.push(`/${locale === "es" ? "" : locale + "/"}properties`);
    } catch (error: any) {
      toast({
        title: locale === "es" ? "Error" : "Error",
        description:
          error?.message ||
          (locale === "es"
            ? "No se pudo eliminar la propiedad"
            : "Could not delete property"),
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Trash2 className="h-4 w-4 mr-2" />
          {locale === "es" ? "Eliminar" : "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {locale === "es" ? "¿Estás seguro?" : "Are you sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {locale === "es" ? (
              <>
                Esta acción eliminará la propiedad{" "}
                <span className="font-semibold">"{propertyTitle}"</span>.
                <br />
                <br />
                La propiedad será archivada y no será visible para otros
                usuarios. Puedes contactar al soporte para restaurarla si es
                necesario.
              </>
            ) : (
              <>
                This will delete the property{" "}
                <span className="font-semibold">"{propertyTitle}"</span>.
                <br />
                <br />
                The property will be archived and won't be visible to other
                users. You can contact support to restore it if needed.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            {locale === "es" ? "Cancelar" : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading
              ? locale === "es"
                ? "Eliminando..."
                : "Deleting..."
              : locale === "es"
              ? "Sí, eliminar"
              : "Yes, delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
