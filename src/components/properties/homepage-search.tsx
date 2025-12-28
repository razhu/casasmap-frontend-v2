"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function HomepageSearch() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [query, setQuery] = useState("");
  const [dealTypeId, setDealTypeId] = useState("");

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (query) searchParams.set("q", query);
    if (dealTypeId) searchParams.set("dealType", dealTypeId);

    const path = getLocalePath("/properties");
    router.push(`${path}?${searchParams.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={
              locale === "es"
                ? "Buscar por ubicación, título..."
                : "Search by location, title..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Deal Type Select */}
        <Select value={dealTypeId} onValueChange={setDealTypeId}>
          <SelectTrigger className="w-full sm:w-40 h-12">
            <SelectValue placeholder={locale === "es" ? "Tipo" : "Type"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">
              {locale === "es" ? "Venta" : "Sale"}
            </SelectItem>
            <SelectItem value="2">
              {locale === "es" ? "Alquiler" : "Rent"}
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Search Button */}
        <Button onClick={handleSearch} size="lg" className="h-12 px-8">
          <Search className="h-5 w-5 sm:mr-2" />
          <span className="hidden sm:inline">
            {locale === "es" ? "Buscar" : "Search"}
          </span>
        </Button>
      </div>

      {/* Advanced Filters Link */}
      <div className="mt-3 text-center">
        <button
          onClick={() => router.push(getLocalePath("/properties"))}
          className="text-sm text-primary hover:underline"
        >
          {locale === "es" ? "Filtros avanzados" : "Advanced filters"}
        </button>
      </div>
    </div>
  );
}
