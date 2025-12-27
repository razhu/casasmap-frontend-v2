import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "@/lib/apollo/provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

const locales = ["es", "en"];

export const metadata: Metadata = {
  title: "CasasMap - Encuentra tu hogar ideal en Bolivia",
  description:
    "Plataforma de bienes raíces en Bolivia. Miles de propiedades en venta y alquiler.",
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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <ApolloWrapper>
              <Navbar />
              <main className="min-h-screen pt-16">{children}</main>
              <Footer />
              <Toaster />
            </ApolloWrapper>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
