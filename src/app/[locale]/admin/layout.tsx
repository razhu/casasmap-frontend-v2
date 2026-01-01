"use client";

import { AdminRoute } from "@/components/auth/admin-route";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminRoute>
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
                <AdminSidebar />
                <main className="flex-1 overflow-y-auto max-h-screen p-8">
                    {children}
                </main>
            </div>
        </AdminRoute>
    );
}
