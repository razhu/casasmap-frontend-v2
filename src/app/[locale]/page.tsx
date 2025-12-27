import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            Encuentra tu hogar ideal en Bolivia
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Miles de propiedades en venta y alquiler. Conecta con agentes de
            confianza.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Buscar Propiedades</Button>
            <Button size="lg" variant="outline">
              Publicar Propiedad
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>🏠 Miles de Propiedades</CardTitle>
              <CardDescription>
                Encuentra casas, departamentos, terrenos y más
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>🗺️ Búsqueda con Mapas</CardTitle>
              <CardDescription>
                Explora propiedades en el mapa interactivo
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>⭐ Agentes Verificados</CardTitle>
              <CardDescription>
                Conecta con profesionales de confianza
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">
              ¿Listo para encontrar tu hogar?
            </CardTitle>
            <CardDescription className="text-lg">
              Regístrate gratis y comienza tu búsqueda hoy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" className="w-full md:w-auto">
              Comenzar Ahora
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
