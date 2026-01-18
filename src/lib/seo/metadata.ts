import { Metadata } from "next";

interface PropertySEOData {
  title: string;
  description: string;
  price?: number;
  currency?: string;
  images?: string[];
  bedrooms?: number;
  bathrooms?: number;
  totalArea?: number;
  city?: string;
  country?: string;
  slug: string;
  locale: string;
}

export function generatePropertyMetadata(data: PropertySEOData): Metadata {
  const {
    title,
    description,
    price,
    currency = "USD",
    images = [],
    bedrooms,
    bathrooms,
    totalArea,
    city,
    country = "Bolivia",
    slug,
    locale,
  } = data;

  const url = `https://casasmap.com/${
    locale === "es" ? "" : `${locale}/`
  }inmuebles/${slug}`;
  const siteName = "CasasMap";

  // Format price for display
  const priceText = price ? `${currency} ${price.toLocaleString()}` : "";

  // Build property details text
  const details = [
    bedrooms && `${bedrooms} ${locale === "es" ? "dormitorios" : "bedrooms"}`,
    bathrooms && `${bathrooms} ${locale === "es" ? "baños" : "bathrooms"}`,
    totalArea && `${totalArea}m²`,
    city,
  ]
    .filter(Boolean)
    .join(" • ");

  const fullTitle = `${title} ${
    priceText ? `- ${priceText}` : ""
  } | ${siteName}`;
  const fullDescription = `${description.substring(0, 150)}... ${details}`;

  return {
    title: fullTitle,
    description: fullDescription,
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName,
      images: images.map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: title,
      })),
      locale: locale === "es" ? "es_BO" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: images[0] ? [images[0]] : [],
    },
    alternates: {
      canonical: url,
      languages: {
        es: `https://casasmap.com/inmuebles/${slug}`,
        en: `https://casasmap.com/en/inmuebles/${slug}`,
      },
    },
  };
}

export function generatePropertyStructuredData(data: PropertySEOData) {
  const {
    title,
    description,
    price,
    currency = "USD",
    images = [],
    bedrooms,
    bathrooms,
    totalArea,
    city,
    country = "Bolivia",
    slug,
    locale,
  } = data;

  const url = `https://casasmap.com/${
    locale === "es" ? "" : `${locale}/`
  }inmuebles/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: title,
    description,
    url,
    image: images,
    ...(price && {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: currency,
      },
    }),
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressCountry: country,
    },
    ...(bedrooms && { numberOfRooms: bedrooms }),
    ...(totalArea && {
      floorSize: {
        "@type": "QuantitativeValue",
        value: totalArea,
        unitCode: "MTK",
      },
    }),
  };
}

interface PageSEOData {
  title: string;
  description: string;
  path: string;
  locale: string;
  images?: string[];
}

export function generatePageMetadata(data: PageSEOData): Metadata {
  const { title, description, path, locale, images = [] } = data;

  const url = `https://casasmap.com/${
    locale === "es" ? "" : `${locale}/`
  }${path}`;
  const siteName = "CasasMap";
  const fullTitle = `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: images.map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: title,
      })),
      locale: locale === "es" ? "es_BO" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images[0] ? [images[0]] : [],
    },
    alternates: {
      canonical: url,
      languages: {
        es: `https://casasmap.com/${path}`,
        en: `https://casasmap.com/en/${path}`,
      },
    },
  };
}
