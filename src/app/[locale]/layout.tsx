import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { fontSans } from "@/lib/fonts";
import { ApolloWrapper } from "@/lib/apollo/provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ComparisonBar } from "@/components/properties/comparison-bar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import "../globals.css";

const locales = ["es", "en"];

export const metadata: Metadata = {
  metadataBase: new URL("https://casasmap.com"),
  title: {
    default: "CasasMap - Encuentra tu hogar ideal en Bolivia",
    template: "%s | CasasMap",
  },
  description:
    "Plataforma de bienes raíces en Bolivia. Miles de propiedades en venta y alquiler en La Paz, Santa Cruz, Cochabamba y más.",
  keywords: [
    "bienes raíces",
    "propiedades",
    "casas",
    "departamentos",
    "Bolivia",
    "La Paz",
    "Santa Cruz",
    "Cochabamba",
    "venta",
    "alquiler",
  ],
  authors: [{ name: "CasasMap" }],
  creator: "CasasMap",
  publisher: "CasasMap",
  openGraph: {
    type: "website",
    locale: "es_BO",
    url: "https://casasmap.com",
    siteName: "CasasMap",
    title: "CasasMap - Encuentra tu hogar ideal en Bolivia",
    description:
      "Plataforma de bienes raíces en Bolivia. Miles de propiedades en venta y alquiler.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CasasMap",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CasasMap - Encuentra tu hogar ideal en Bolivia",
    description:
      "Plataforma de bienes raíces en Bolivia. Miles de propiedades en venta y alquiler.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={fontSans.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <ApolloWrapper>
              <Navbar />
              <main className="min-h-screen pt-16">
                <Breadcrumbs />
                {children}
              </main>
              <Footer />
              <ComparisonBar locale={locale} />
              <Toaster />
            </ApolloWrapper>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
