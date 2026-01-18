"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchAutocomplete } from "@/components/search/search-autocomplete";

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
    <div className="w-full max-w-5xl mx-auto">
      {/* Tabs for Buy/Rent */}
      <div className="mb-4">
        <Tabs
          value={dealTypeId}
          onValueChange={setDealTypeId}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12">
            <TabsTrigger value="1" className="text-base font-semibold">
              {locale === "es" ? "Comprar" : "Buy"}
            </TabsTrigger>
            <TabsTrigger value="2" className="text-base font-semibold">
              {locale === "es" ? "Alquilar" : "Rent"}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Search Box */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <div className="flex flex-col gap-4">
          {/* Search Input with Autocomplete */}
          <div className="relative">
            <SearchAutocomplete
              onSelect={handlePropertySelect}
              onSearch={handleSearch}
              placeholder={
                locale === "es"
                  ? "Buscar por ubicación, título..."
                  : "Search by location, title..."
              }
              locale={locale}
              className="h-14 text-lg pl-12"
              onQueryChange={setQuery}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground pointer-events-none" />
          </div>

          {/* Quick Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12">
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
              <SelectTrigger className="h-12">
                <SelectValue
                  placeholder={locale === "es" ? "Dormitorios" : "Bedrooms"}
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
              <SelectTrigger className="h-12">
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
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            size="lg"
            className="h-14 text-lg font-semibold"
          >
            <Search className="h-5 w-5 mr-2" />
            {locale === "es" ? "Buscar Propiedades" : "Search Properties"}
          </Button>

          {/* Advanced Filters Link */}
          <div className="text-center">
            <button
              onClick={() => router.push(getLocalePath("/properties"))}
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {locale === "es" ? "Filtros avanzados" : "Advanced filters"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
