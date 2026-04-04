"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchAutocomplete } from "@/components/search/search-autocomplete";
import { cn } from "@/lib/utils";

export function HomepageSearch() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [query, setQuery] = useState("");
  const [dealTypeId, setDealTypeId] = useState("1"); // Default to Sale
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const handleSearch = (searchQuery?: string) => {
    const searchParams = new URLSearchParams();
    const finalQuery = searchQuery || query;

    if (finalQuery) searchParams.set("q", finalQuery);
    if (dealTypeId) searchParams.set("dealType", dealTypeId);
    if (priceRange) searchParams.set("priceRange", priceRange);
    if (bedrooms) searchParams.set("bedrooms", bedrooms);
    if (propertyType) searchParams.set("propertyType", propertyType);

    const path = getLocalePath("/properties");
    router.push(`${path}?${searchParams.toString()}`);
  };

  const handlePropertySelect = (property: any) => {
    router.push(getLocalePath(`/inmuebles/${property.slug}`));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Container */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        {/* Buy/Rent Tabs - Integrated into search box */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setDealTypeId("1")}
            className={cn(
              "flex-1 px-6 py-4 text-base font-semibold transition-all",
              dealTypeId === "1"
                ? "bg-primary text-primary-foreground"
                : "bg-transparent text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-800",
            )}
          >
            {locale === "es" ? "Comprar" : "Buy"}
          </button>
          <button
            onClick={() => setDealTypeId("2")}
            className={cn(
              "flex-1 px-6 py-4 text-base font-semibold transition-all",
              dealTypeId === "2"
                ? "bg-primary text-primary-foreground"
                : "bg-transparent text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-800",
            )}
          >
            {locale === "es" ? "Alquilar" : "Rent"}
          </button>
        </div>

        {/* Search Content */}
        <div className="p-6 space-y-4">
          {/* Main Search Input - Full Width, Prominent */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
            <SearchAutocomplete
              onSelect={handlePropertySelect}
              onSearch={handleSearch}
              placeholder={
                locale === "es"
                  ? "Dirección, ciudad, barrio..."
                  : "Address, city, neighborhood..."
              }
              locale={locale}
              className="h-16 text-base pl-14 pr-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary"
              onQueryChange={setQuery}
            />
          </div>

          {/* Filters Row - Compact, Inline */}
          <div className="flex flex-wrap gap-3">
            {/* Price */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-11 min-w-[140px] rounded-lg border-gray-300 dark:border-gray-600">
                <SelectValue
                  placeholder={locale === "es" ? "Precio" : "Price"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-50000">
                  {locale === "es" ? "Hasta $50k" : "Up to $50k"}
                </SelectItem>
                <SelectItem value="50000-100000">$50k - $100k</SelectItem>
                <SelectItem value="100000-200000">$100k - $200k</SelectItem>
                <SelectItem value="200000-500000">$200k - $500k</SelectItem>
                <SelectItem value="500000-999999999">
                  {locale === "es" ? "Más de $500k" : "$500k+"}
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Bedrooms */}
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="h-11 min-w-[140px] rounded-lg border-gray-300 dark:border-gray-600">
                <SelectValue
                  placeholder={locale === "es" ? "Dormitorios" : "Beds"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>

            {/* Property Type */}
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="h-11 min-w-[140px] rounded-lg border-gray-300 dark:border-gray-600">
                <SelectValue placeholder={locale === "es" ? "Tipo" : "Type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">
                  {locale === "es" ? "Casa" : "House"}
                </SelectItem>
                <SelectItem value="2">
                  {locale === "es" ? "Departamento" : "Apartment"}
                </SelectItem>
                <SelectItem value="3">
                  {locale === "es" ? "Terreno" : "Land"}
                </SelectItem>
                <SelectItem value="4">
                  {locale === "es" ? "Oficina" : "Office"}
                </SelectItem>
                <SelectItem value="5">
                  {locale === "es" ? "Local Comercial" : "Commercial"}
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Search Button - Inline with filters */}
            <Button
              onClick={() => handleSearch()}
              size="lg"
              className="h-11 px-8 rounded-lg font-semibold ml-auto"
            >
              <Search className="h-4 w-4 mr-2" />
              {locale === "es" ? "Buscar" : "Search"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
