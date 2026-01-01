"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpgradePage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || "es";

  useEffect(() => {
    router.replace(`/${locale}/pricing`);
  }, [router, locale]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
