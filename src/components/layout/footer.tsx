"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("nav");

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-primary">🏠 CasasMap</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {locale === "es"
                ? "Tu plataforma de confianza para encontrar propiedades en Bolivia."
                : "Your trusted platform to find properties in Bolivia."}
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              {locale === "es" ? "Enlaces Rápidos" : "Quick Links"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={getLocalePath("/")}
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/properties")}
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  {t("properties")}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/about")}
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  {locale === "es" ? "Acerca de" : "About"}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/contact")}
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  {locale === "es" ? "Contacto" : "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          {/* For Agents */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              {locale === "es" ? "Para Agentes" : "For Agents"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={getLocalePath("/register")}
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  {locale === "es" ? "Registrarse" : "Register"}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/pricing")}
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  {locale === "es" ? "Precios" : "Pricing"}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/features")}
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  {locale === "es" ? "Características" : "Features"}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/help")}
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                >
                  {locale === "es" ? "Ayuda" : "Help"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              {locale === "es" ? "Contacto" : "Contact"}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>La Paz, Bolivia</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+591 2 123 4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@casasmap.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {currentYear} CasasMap.{" "}
              {locale === "es"
                ? "Todos los derechos reservados."
                : "All rights reserved."}
            </p>
            <div className="flex gap-6">
              <Link
                href={getLocalePath("/privacy")}
                className="hover:text-primary dark:hover:text-primary"
              >
                {locale === "es" ? "Privacidad" : "Privacy"}
              </Link>
              <Link
                href={getLocalePath("/terms")}
                className="hover:text-primary dark:hover:text-primary"
              >
                {locale === "es" ? "Términos" : "Terms"}
              </Link>
              <Link
                href={getLocalePath("/cookies")}
                className="hover:text-primary dark:hover:text-primary"
              >
                {locale === "es" ? "Cookies" : "Cookies"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
