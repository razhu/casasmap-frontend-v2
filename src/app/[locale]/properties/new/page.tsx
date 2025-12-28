"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { PropertyFormStep1 } from "@/components/properties/create/step1-basics";
import { PropertyFormStep2 } from "@/components/properties/create/step2-details";
import { PropertyFormStep3 } from "@/components/properties/create/step3-location";
import { PropertyFormStep4 } from "@/components/properties/create/step4-media";
import { PropertyFormStep5 } from "@/components/properties/create/step5-features";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

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
    console.log("Submitting property:", completeData);
    // TODO: Call GraphQL mutation
    // For now, redirect to properties page
    router.push(getLocalePath("/properties"));
  };

  const stepTitles = [
    locale === "es" ? "¿Qué publicas?" : "What are you listing?",
    locale === "es" ? "Detalles" : "Details",
    locale === "es" ? "Ubicación" : "Location",
    locale === "es" ? "Fotos y videos" : "Photos & videos",
    locale === "es" ? "Características" : "Features",
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="container mx-auto max-w-3xl">
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
              />
            )}
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
