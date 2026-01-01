"use client";

import { useTranslations } from "next-intl";
import {
    Users,
    Building2,
    DollarSign,
    Activity
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AdminDashboardPage() {
    // const t = useTranslations("admin.dashboard"); // Todo: add dashboard translations

    const stats = [
        {
            title: "Total Properties",
            value: "1,234",
            icon: Building2,
            change: "+12%",
        },
        {
            title: "Total Users",
            value: "567",
            icon: Users,
            change: "+5%",
        },
        {
            title: "Revenue",
            value: "$12,345",
            icon: DollarSign,
            change: "+8%",
        },
        {
            title: "Active Sessions",
            value: "45",
            icon: Activity,
            change: "-2%",
        },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.change} from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-center text-muted-foreground py-10">
                            Chart Placeholder
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Olivia Martin</p>
                                    <p className="text-xs text-muted-foreground">olivia.martin@email.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$1,999.00</div>
                            </div>
                            {/* More items */}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
