"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, CreditCard, TrendingUp, Calendar, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { parentAPI } from "@/services/api";

interface ChildData {
    _id: string;
    studentId: string;
    name: string;
    email: string;
    class: string;
    photo: string | null;
    stats: {
        attendancePercentage: number;
        totalPresent: number;
        totalDays: number;
        recentGrades: Array<{
            subject: string;
            score: number;
            total: number;
            grade: string;
        }>;
        feeBalance: number;
        feePaid: number;
        feeTotal: number;
    };
}

export default function ParentDashboard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [dashboardData, setDashboardData] = useState<{
        parentName: string;
        totalChildren: number;
        children: ChildData[];
    } | null>(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const response = await parentAPI.getDashboard();
            setDashboardData(response.data);
        } catch (err: any) {
            console.error("Error fetching dashboard:", err);
            setError(err.response?.data?.message || "Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground">Loading your children's information...</p>
                </div>
            </div>
        );
    }

    if (error || !dashboardData) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Card className="max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                            <h3 className="font-semibold">Error Loading Dashboard</h3>
                            <p className="text-sm text-muted-foreground">{error}</p>
                            <Button onClick={fetchDashboard}>Try Again</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const { parentName, totalChildren, children } = dashboardData;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome, {parentName}</h1>
                    <p className="text-muted-foreground">
                        Monitoring {totalChildren} {totalChildren === 1 ? "child" : "children"}
                    </p>
                </div>
                <Link href="/parent/settings">
                    <Button variant="outline">Settings</Button>
                </Link>
            </div>

            {children.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center space-y-4 py-8">
                            <Users className="h-16 w-16 text-muted-foreground mx-auto" />
                            <h3 className="text-lg font-semibold">No Children Found</h3>
                            <p className="text-sm text-muted-foreground">
                                No students are currently linked to your account.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {children.map((child) => (
                        <Card key={child._id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                                        {child.name?.[0] || "S"}
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">{child.name}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{child.class}</p>
                                        <p className="text-xs text-muted-foreground">{child.studentId}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Attendance */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            Attendance
                                        </span>
                                        <span className={`font-bold ${child.stats.attendancePercentage >= 80
                                                ? "text-green-600"
                                                : child.stats.attendancePercentage >= 60
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                            }`}>
                                            {child.stats.attendancePercentage}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${child.stats.attendancePercentage >= 80
                                                    ? "bg-green-600"
                                                    : child.stats.attendancePercentage >= 60
                                                        ? "bg-yellow-600"
                                                        : "bg-red-600"
                                                }`}
                                            style={{ width: `${child.stats.attendancePercentage}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {child.stats.totalPresent} of {child.stats.totalDays} days (Last 30 days)
                                    </p>
                                </div>

                                {/* Recent Grades */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <GraduationCap className="h-4 w-4" />
                                        <span>Recent Grades</span>
                                    </div>
                                    {child.stats.recentGrades.length > 0 ? (
                                        <div className="space-y-1">
                                            {child.stats.recentGrades.map((grade, idx) => (
                                                <div key={idx} className="flex justify-between text-sm">
                                                    <span>{grade.subject}</span>
                                                    <span className="font-semibold">
                                                        {grade.score}/{grade.total} ({grade.grade})
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-muted-foreground">No recent grades</p>
                                    )}
                                </div>

                                {/* Fee Status */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CreditCard className="h-4 w-4" />
                                        <span>Fee Status</span>
                                    </div>
                                    <div className={`p-3 rounded-lg border ${child.stats.feeBalance === 0
                                            ? "bg-green-50 border-green-200 text-green-700"
                                            : "bg-yellow-50 border-yellow-200 text-yellow-700"
                                        }`}>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">
                                                {child.stats.feeBalance === 0 ? "Fully Paid" : "Balance"}
                                            </span>
                                            <span className="font-bold">
                                                {child.stats.feeBalance === 0
                                                    ? "✓"
                                                    : `₦${child.stats.feeBalance.toLocaleString()}`}
                                            </span>
                                        </div>
                                        <p className="text-xs mt-1">
                                            Paid: ₦{child.stats.feePaid.toLocaleString()} / ₦{child.stats.feeTotal.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <Link href={`/parent/children/${child._id}`}>
                                        <Button size="sm" variant="outline" className="w-full">
                                            View Details
                                        </Button>
                                    </Link>
                                    {child.stats.feeBalance > 0 && (
                                        <Button size="sm" className="w-full">
                                            Pay Fees
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
