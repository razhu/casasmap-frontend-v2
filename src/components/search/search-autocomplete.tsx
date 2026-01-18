"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAutocompletePropertiesQuery } from "@/lib/graphql/generated";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

interface SearchAutocompleteProps {
  locale: string;
  onSelect?: (property: any) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  onQueryChange?: (query: string) => void;
}

export function SearchAutocomplete({
  locale,
  onSelect,
  onSearch,
  placeholder,
  className,
  onQueryChange,
}: SearchAutocompleteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, loading } = useAutocompletePropertiesQuery({
    variables: { query: debouncedQuery, limit: 10 },
    skip: debouncedQuery.length < 3,
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const properties = data?.autocompleteProperties || [];
  const showDropdown = isOpen && (loading || properties.length > 0);

  const handleSelect = (property: any) => {
    if (onSelect) {
      onSelect(property);
    } else {
      const propertySlug =
        locale === "es" ? property.slug : property.slugEn || property.slug;
      const path =
        locale === "es"
          ? `/inmuebles/${propertySlug}`
          : `/${locale}/inmuebles/${propertySlug}`;
      router.push(path);
    }
    setIsOpen(false);
    setQuery("");
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setIsOpen(true);
    if (onQueryChange) {
      onQueryChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      setIsOpen(false);

      if (onSearch) {
        onSearch(query);
      } else {
        // Default behavior: navigate to properties page with query
        const path =
          locale === "es"
            ? `/properties?q=${encodeURIComponent(query)}`
            : `/${locale}/properties?q=${encodeURIComponent(query)}`;
        router.push(path);
      }
    }
  };

  const formatPrice = (priceUS?: number | null) => {
    if (!priceUS) return "";
    return `$${priceUS.toLocaleString()}`;
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={
            placeholder ||
            (locale === "es" ? "Buscar propiedades..." : "Search properties...")
          }
          className={className || ""}
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border max-h-96 overflow-y-auto z-50">
          {loading && (
            <div className="p-4 text-center text-gray-500">
              {locale === "es" ? "Buscando..." : "Searching..."}
            </div>
          )}

          {!loading &&
            properties.length === 0 &&
            debouncedQuery.length >= 3 && (
              <div className="p-4 text-center">
                <p className="text-gray-500 mb-2">
                  {locale === "es"
                    ? "No se encontraron sugerencias"
                    : "No suggestions found"}
                </p>
                <p className="text-xs text-gray-400">
                  {locale === "es"
                    ? "Presiona Enter para buscar de todas formas"
                    : "Press Enter to search anyway"}
                </p>
              </div>
            )}

          {!loading && properties.length > 0 && (
            <>
              {/* Hint at top */}
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b text-xs text-gray-500 flex items-center justify-between">
                <span>{locale === "es" ? "Sugerencias" : "Suggestions"}</span>
                <span className="text-gray-400">
                  {locale === "es"
                    ? "Presiona Enter para ver todos"
                    : "Press Enter to see all"}
                </span>
              </div>

              {properties.map((property) => {
                const title =
                  locale === "es"
                    ? property.title
                    : property.titleEn || property.title;
                const image = property.media?.[0]?.url;

                return (
                  <button
                    key={property.id}
                    onClick={() => handleSelect(property)}
                    className="w-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-left border-b last:border-b-0 transition-colors flex gap-3"
                  >
                    {image && (
                      <img
                        src={image}
                        alt={title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm line-clamp-1">
                        {title}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {property.bedrooms && `${property.bedrooms} hab`}
                          {property.bathrooms &&
                            ` • ${property.bathrooms} baños`}
                          {property.totalArea && ` • ${property.totalArea}m²`}
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          {formatPrice(property.priceUS)}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}
