"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessAnimationProps {
  show: boolean;
  message?: string;
  duration?: number;
  onComplete?: () => void;
}

export function SuccessAnimation({
  show,
  message,
  duration = 2000,
  onComplete,
}: SuccessAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {/* Outer ring animation */}
            <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
            {/* Checkmark */}
            <CheckCircle2 className="h-16 w-16 text-green-500 animate-in zoom-in-50 duration-500" />
          </div>
          {message && (
            <p className="text-lg font-semibold text-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Inline success checkmark for buttons
export function InlineSuccessCheck({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <CheckCircle2 className="h-4 w-4 text-green-500 animate-in zoom-in-50 duration-300" />
  );
}
