"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormLabel, FormDescription } from "@/components/ui/form";
import { PropertyFormData } from "@/app/[locale]/properties/new/page";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CldUploadWidget } from "next-cloudinary";

const step4Schema = z.object({
  images: z.array(z.string()).optional(),
});

type Step4FormData = z.infer<typeof step4Schema>;

interface Props {
  data: PropertyFormData;
  onNext: (data: Partial<PropertyFormData>) => void;
  onBack: () => void;
  locale: string;
}

export function PropertyFormStep4({ data, onNext, onBack, locale }: Props) {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>(
    (data.images as string[]) || []
  );
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<Step4FormData>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      images: (data.images as string[]) || [],
    },
  });

  const removeImage = (index: number) => {
    setUploadedUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = () => {
    onNext({ images: uploadedUrls as any });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Upload Area */}
        <CldUploadWidget
          uploadPreset="casasmap_uploads"
          options={{
            multiple: true,
            maxFiles: 20,
            folder: "casasmap/properties",
            resourceType: "image",
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            maxFileSize: 10000000, // 10MB
          }}
          onSuccess={(result: any) => {
            if (result.event === "success") {
              setUploadedUrls((prev) => [...prev, result.info.secure_url]);
              setIsUploading(false);
            }
          }}
          onQueuesEnd={() => {
            setIsUploading(false);
          }}
        >
          {({ open }) => (
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
                isUploading
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-gray-400"
              )}
              onClick={() => {
                setIsUploading(true);
                open();
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  {isUploading ? (
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  ) : (
                    <Upload className="w-8 h-8 text-gray-600" />
                  )}
                </div>
                <div>
                  <p className="text-lg font-medium mb-1">
                    {isUploading
                      ? locale === "es"
                        ? "Subiendo..."
                        : "Uploading..."
                      : locale === "es"
                      ? "Haz clic para subir fotos"
                      : "Click to upload photos"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {locale === "es"
                      ? "Sube hasta 20 fotos de tu propiedad"
                      : "Upload up to 20 photos of your property"}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {locale === "es"
                    ? "Formatos: JPG, PNG, WEBP (máx. 10MB cada una)"
                    : "Formats: JPG, PNG, WEBP (max 10MB each)"}
                </p>
              </div>
            </div>
          )}
        </CldUploadWidget>

        {/* Preview Grid */}
        {uploadedUrls.length > 0 && (
          <div>
            <FormLabel>
              {locale === "es" ? "Fotos subidas" : "Uploaded photos"} (
              {uploadedUrls.length})
            </FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {uploadedUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={url}
                      alt={`Property ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-white text-xs rounded">
                      {locale === "es" ? "Portada" : "Cover"}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <FormDescription className="mt-2">
              {locale === "es"
                ? "La primera foto será la imagen de portada"
                : "The first photo will be the cover image"}
            </FormDescription>
          </div>
        )}

        {/* Info Message */}
        {uploadedUrls.length === 0 && (
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <ImageIcon className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">
                {locale === "es"
                  ? "Las fotos son importantes"
                  : "Photos are important"}
              </p>
              <p className="text-blue-700">
                {locale === "es"
                  ? "Las propiedades con fotos de calidad reciben hasta 10x más visitas. Puedes agregar fotos ahora o más tarde."
                  : "Properties with quality photos receive up to 10x more visits. You can add photos now or later."}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            {locale === "es" ? "Atrás" : "Back"}
          </Button>
          <Button type="submit" size="lg" disabled={isUploading}>
            {locale === "es" ? "Siguiente" : "Next"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
