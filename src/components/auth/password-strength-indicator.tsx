"use client";

import { useMemo } from "react";
import { Check, X } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password: string;
  locale?: string;
}

export function PasswordStrengthIndicator({
  password,
  locale = "es",
}: PasswordStrengthIndicatorProps) {
  const checks = useMemo(() => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    };
  }, [password]);

  const allValid = Object.values(checks).every((check) => check);

  const labels = {
    es: {
      length: "Al menos 8 caracteres",
      uppercase: "Al menos 1 mayúscula",
      lowercase: "Al menos 1 minúscula",
      number: "Al menos 1 número",
      allGood: "✓ Contraseña segura",
    },
    en: {
      length: "At least 8 characters",
      uppercase: "At least 1 uppercase letter",
      lowercase: "At least 1 lowercase letter",
      number: "At least 1 number",
      allGood: "✓ Strong password",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.es;

  if (!password) return null;

  // If all requirements met, show simple success message
  if (allValid) {
    return (
      <div className="text-sm text-green-600 font-medium flex items-center gap-2">
        <Check className="h-4 w-4" />
        {t.allGood}
      </div>
    );
  }

  // Otherwise show requirements
  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2">
        {checks.length ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <X className="h-4 w-4 text-gray-400" />
        )}
        <span className={checks.length ? "text-green-600" : "text-gray-500"}>
          {t.length}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {checks.uppercase ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <X className="h-4 w-4 text-gray-400" />
        )}
        <span className={checks.uppercase ? "text-green-600" : "text-gray-500"}>
          {t.uppercase}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {checks.lowercase ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <X className="h-4 w-4 text-gray-400" />
        )}
        <span className={checks.lowercase ? "text-green-600" : "text-gray-500"}>
          {t.lowercase}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {checks.number ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <X className="h-4 w-4 text-gray-400" />
        )}
        <span className={checks.number ? "text-green-600" : "text-gray-500"}>
          {t.number}
        </span>
      </div>
    </div>
  );
}
