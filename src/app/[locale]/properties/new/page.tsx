"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { PropertyFormStep1 } from "@/components/properties/create/step1-basics";
import { PropertyFormStep2 } from "@/components/properties/create/step2-details";
import { PropertyFormStep3 } from "@/components/properties/create/step3-location";
import { PropertyFormStep4 } from "@/components/properties/create/step4-media";
import { PropertyFormStep5 } from "@/components/properties/create/step5-features";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useCreatePropertyMutation } from "@/lib/graphql/generated";
import { AlertCircle } from "lucide-react";

export interface PropertyFormData {
  // Step 1: Basics
  title?: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  propertyTypeId?: number;
  dealTypeId?: number;

  // Step 2: Details
  priceUS?: number;
  priceBS?: number;
  bedrooms?: number;
  bathrooms?: number;
  totalArea?: number;
  coveredArea?: number;
  yearBuilt?: number;
  parkingSpaces?: number;

  // Step 3: Location
  address?: string;
  latitude?: number;
  longitude?: number;
  countryId?: number;
  stateId?: number;
  cityId?: number;
  zoneId?: number;

  // Step 4: Media (handled separately)
  images?: File[];

  // Step 5: Features
  furnished?: boolean;
  pool?: boolean;
  balcony?: boolean;
  terrace?: boolean;
  security?: boolean;
  storage?: boolean;
  petsAllowed?: boolean;
}

export default function CreatePropertyPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations("properties");

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createProperty] = useCreatePropertyMutation();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("property-draft");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(draft.data || {});
        setCurrentStep(draft.step || 1);
      } catch (e) {
        console.error("Failed to load draft:", e);
      }
    }
  }, []);

  // Save draft to localStorage whenever formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(
        "property-draft",
        JSON.stringify({
          data: formData,
          step: currentStep,
          savedAt: new Date().toISOString(),
        })
      );
    }
  }, [formData, currentStep]);

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const handleNext = (stepData: Partial<PropertyFormData>) => {
    setFormData({ ...formData, ...stepData });
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (finalData: Partial<PropertyFormData>) => {
    const completeData = { ...formData, ...finalData };
    setIsSubmitting(true);

    try {
      // Prepare input for GraphQL mutation
      const input = {
        title: completeData.title!,
        titleEn: completeData.titleEn || completeData.title!, // Fallback to Spanish if English not provided
        description: completeData.description!,
        descriptionEn: completeData.descriptionEn || completeData.description!, // Fallback to Spanish
        propertyTypeId: completeData.propertyTypeId!,
        dealTypeId: completeData.dealTypeId!,
        address: completeData.address!,
        countryId: completeData.countryId!,
        stateId: completeData.stateId!,
        cityId: completeData.cityId!,
        zoneId: completeData.zoneId!,
        priceUS: completeData.priceUS,
        priceBS: completeData.priceBS,
        bedrooms: completeData.bedrooms,
        bathrooms: completeData.bathrooms,
        totalArea: completeData.totalArea,
        coveredArea: completeData.coveredArea,
        parkingSpaces: completeData.parkingSpaces,
        yearBuilt: completeData.yearBuilt,
        furnished: completeData.furnished || false,
        pool: completeData.pool || false,
        balcony: completeData.balcony || false,
        terrace: completeData.terrace || false,
        security: completeData.security || false,
        storage: completeData.storage || false,
        petsAllowed: completeData.petsAllowed || false,
      };

      const { data } = await createProperty({
        variables: { input },
      });

      if (data?.createProperty) {
        // Clear draft after successful submission
        localStorage.removeItem("property-draft");

        toast.success(
          locale === "es"
            ? "¡Propiedad creada exitosamente! Será revisada por nuestro equipo."
            : "Property created successfully! It will be reviewed by our team."
        );
        router.push(getLocalePath("/properties"));
      }
    } catch (error: any) {
      console.error("Error creating property:", error);
      toast.error(
        locale === "es"
          ? "Error al crear la propiedad. Por favor intenta de nuevo."
          : "Error creating property. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = [
    locale === "es" ? "¿Qué publicas?" : "What are you listing?",
    locale === "es" ? "Detalles" : "Details",
    locale === "es" ? "Ubicación" : "Location",
    locale === "es" ? "Fotos y videos" : "Photos & videos",
    locale === "es" ? "Características" : "Features",
  ];

  const hasDraft =
    typeof window !== "undefined" && localStorage.getItem("property-draft");

  const clearDraft = () => {
    localStorage.removeItem("property-draft");
    setFormData({});
    setCurrentStep(1);
    toast.success(locale === "es" ? "Borrador eliminado" : "Draft cleared");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Draft Notice */}
          {hasDraft && (
            <Card className="p-4 mb-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    {locale === "es"
                      ? "Borrador guardado automáticamente"
                      : "Draft saved automatically"}
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    {locale === "es"
                      ? "Tu progreso se guarda automáticamente. Puedes cerrar esta página y volver más tarde."
                      : "Your progress is saved automatically. You can close this page and come back later."}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearDraft}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  {locale === "es" ? "Borrar" : "Clear"}
                </Button>
              </div>
            </Card>
          )}

          {/* Progress Header */}
          <Card className="p-6 mb-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">
                  {locale === "es" ? "Paso" : "Step"} {currentStep}{" "}
                  {locale === "es" ? "de" : "of"} {totalSteps}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <h1 className="text-2xl font-bold">
              {stepTitles[currentStep - 1]}
            </h1>
          </Card>

          {/* Step Content */}
          <Card className="p-6">
            {currentStep === 1 && (
              <PropertyFormStep1
                data={formData}
                onNext={handleNext}
                locale={locale}
              />
            )}
            {currentStep === 2 && (
              <PropertyFormStep2
                data={formData}
                onNext={handleNext}
                onBack={handleBack}
                locale={locale}
              />
            )}
            {currentStep === 3 && (
              <PropertyFormStep3
                data={formData}
                onNext={handleNext}
                onBack={handleBack}
                locale={locale}
              />
            )}
            {currentStep === 4 && (
              <PropertyFormStep4
                data={formData}
                onNext={handleNext}
                onBack={handleBack}
                locale={locale}
              />
            )}
            {currentStep === 5 && (
              <PropertyFormStep5
                data={formData}
                onSubmit={handleSubmit}
                onBack={handleBack}
                locale={locale}
                isSubmitting={isSubmitting}
              />
            )}
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
