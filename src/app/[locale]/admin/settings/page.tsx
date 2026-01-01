"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Configuración del Sistema</h1>
                <Button>Guardar Cambios</Button>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                    <TabsTrigger value="integrations">Integraciones</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información del Sitio</CardTitle>
                            <CardDescription>
                                Configura los detalles básicos de la plataforma.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="siteName">Nombre del Sitio</Label>
                                <Input id="siteName" defaultValue="CSSMP Real Estate" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contactEmail">Email de Contacto</Label>
                                <Input id="contactEmail" defaultValue="contact@example.com" />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Modo Mantenimiento</Label>
                                    <CardDescription>
                                        Desactiva el acceso público al sitio.
                                    </CardDescription>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                {/* Other tabs would go here */}
            </Tabs>
        </div>
    );
}
