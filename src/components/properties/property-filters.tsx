"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyFiltersProps {
  onSearch: (filters: {
    query?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    dealTypeId?: number;
  }) => void;
}

export function PropertyFilters({ onSearch }: PropertyFiltersProps) {
  const params = useParams();
  const locale = params.locale as string;

  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [dealTypeId, setDealTypeId] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearch = () => {
    const filters: any = {};
    if (query) filters.query = query;
    if (minPrice) filters.minPrice = parseFloat(minPrice);
    if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
    if (bedrooms) filters.bedrooms = parseInt(bedrooms);
    if (bathrooms) filters.bathrooms = parseInt(bathrooms);
    if (dealTypeId) filters.dealTypeId = parseInt(dealTypeId);

    onSearch(filters);
    setOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setBathrooms("");
    setDealTypeId("");
    onSearch({});
  };

  const hasActiveFilters =
    query || minPrice || maxPrice || bedrooms || bathrooms || dealTypeId;

  return (
    <div className="flex gap-2">
      {/* Search Input */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={
            locale === "es"
              ? "Buscar por ubicación, título..."
              : "Search by location, title..."
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="pl-10"
        />
      </div>

      {/* Filters Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {locale === "es" ? "Filtros" : "Filters"}
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-[10px] text-white flex items-center justify-center">
                !
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {locale === "es" ? "Filtros de búsqueda" : "Search filters"}
            </SheetTitle>
            <SheetDescription>
              {locale === "es"
                ? "Refina tu búsqueda con estos filtros"
                : "Refine your search with these filters"}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* Deal Type */}
            <div className="space-y-2">
              <Label>
                {locale === "es" ? "Tipo de operación" : "Deal type"}
              </Label>
              <Select value={dealTypeId} onValueChange={setDealTypeId}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={locale === "es" ? "Seleccionar" : "Select"}
                  />
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
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <Label>
                {locale === "es"
                  ? "Rango de precio (USD)"
                  : "Price range (USD)"}
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder={locale === "es" ? "Mínimo" : "Min"}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder={locale === "es" ? "Máximo" : "Max"}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <Label>{locale === "es" ? "Dormitorios" : "Bedrooms"}</Label>
              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={locale === "es" ? "Cualquiera" : "Any"}
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
            </div>

            {/* Bathrooms */}
            <div className="space-y-2">
              <Label>{locale === "es" ? "Baños" : "Bathrooms"}</Label>
              <Select value={bathrooms} onValueChange={setBathrooms}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={locale === "es" ? "Cualquiera" : "Any"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSearch} className="flex-1">
                {locale === "es" ? "Aplicar" : "Apply"}
              </Button>
              {hasActiveFilters && (
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  {locale === "es" ? "Limpiar" : "Clear"}
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Search Button */}
      <Button onClick={handleSearch}>
        {locale === "es" ? "Buscar" : "Search"}
      </Button>
    </div>
  );
}
