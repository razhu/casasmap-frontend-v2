"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface City {
  name: string;
  nameEn: string;
  image: string;
  propertyCount: number;
}

const cities: City[] = [
  {
    name: "La Paz",
    nameEn: "La Paz",
    image:
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&h=300&fit=crop",
    propertyCount: 245,
  },
  {
    name: "Santa Cruz",
    nameEn: "Santa Cruz",
    image:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
    propertyCount: 189,
  },
  {
    name: "Cochabamba",
    nameEn: "Cochabamba",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&h=300&fit=crop",
    propertyCount: 156,
  },
  {
    name: "Tarija",
    nameEn: "Tarija",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    propertyCount: 78,
  },
  {
    name: "Sucre",
    nameEn: "Sucre",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop",
    propertyCount: 92,
  },
  {
    name: "Oruro",
    nameEn: "Oruro",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop",
    propertyCount: 45,
  },
];

export function PopularCities() {
  const params = useParams();
  const locale = params.locale as string;

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          {locale === "es" ? "Ciudades Populares" : "Popular Cities"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {locale === "es"
            ? "Explora propiedades en las principales ciudades de Bolivia"
            : "Explore properties in Bolivia's main cities"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => {
          const cityName = locale === "es" ? city.name : city.nameEn;
          return (
            <Link
              key={city.name}
              href={`${getLocalePath("/properties")}?city=${city.name}`}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={city.image}
                    alt={cityName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-5 w-5" />
                      <h3 className="text-xl font-bold">{cityName}</h3>
                    </div>
                    <p className="text-sm text-gray-200">
                      {city.propertyCount}{" "}
                      {locale === "es" ? "propiedades" : "properties"}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
