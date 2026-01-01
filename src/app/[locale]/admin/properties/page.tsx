"use client";

import { useTranslations } from "next-intl";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminPropertiesPage() {
    const t = useTranslations("admin.properties");
    // Helper to translate status (mock)
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PUBLISHED":
                return <Badge className="bg-green-500">Publicado</Badge>;
            case "PENDING":
                return <Badge variant="secondary">Pendiente</Badge>;
            case "REJECTED":
                return <Badge variant="destructive">Rechazado</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const properties = [
        {
            id: "1",
            title: "Casa Moderna en Calacoto",
            price: 250000,
            status: "PUBLISHED",
            owner: "Juan Pérez",
            date: "2024-03-15",
        },
        {
            id: "2",
            title: "Departamento en Sopocachi",
            price: 120000,
            status: "PENDING",
            owner: "Maria Lopez",
            date: "2024-03-14",
        },
        // Add more mock data
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Gestión de Propiedades</h1>
                <div className="flex gap-2">
                    {/* Filters could go here */}
                </div>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Propiedad</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Propietario</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {properties.map((property) => (
                            <TableRow key={property.id}>
                                <TableCell className="font-medium">{property.title}</TableCell>
                                <TableCell>${property.price.toLocaleString()}</TableCell>
                                <TableCell>{property.owner}</TableCell>
                                <TableCell>{getStatusBadge(property.status)}</TableCell>
                                <TableCell>{property.date}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
