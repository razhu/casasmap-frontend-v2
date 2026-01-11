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
      console.log("=== TOAST HOOK CALLED ===");
      console.log("Title:", title);
      console.log("Description:", description);
      console.log("Variant:", variant);

      if (variant === "destructive") {
        console.log("Calling sonnerToast.error");
        sonnerToast.error(title, {
          description,
          duration: 5000, // Show for 5 seconds
        });
        console.log("sonnerToast.error called");
      } else {
        console.log("Calling sonnerToast.success");
        sonnerToast.success(title, {
          description,
          duration: 3000,
        });
        console.log("sonnerToast.success called");
      }
      console.log("=== TOAST HOOK END ===");
    },
  };
}
