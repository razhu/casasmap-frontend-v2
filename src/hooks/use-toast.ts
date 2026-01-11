import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: ({
      title,
      description,
      variant,
    }: {
      title: string;
      description?: string;
      variant?: "default" | "destructive";
    }) => {
      if (variant === "destructive") {
        sonnerToast.error(title, {
          description,
          duration: 5000,
        });
      } else {
        sonnerToast.success(title, {
          description,
          duration: 3000,
        });
      }
    },
  };
}
