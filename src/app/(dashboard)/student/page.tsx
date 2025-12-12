"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, BookOpen, GraduationCap, CreditCard, Clock, CheckCircle, XCircle } from "lucide-react";
import { studentAPI } from "@/services/api";
import { format } from "date-fns";

export default function StudentDashboard() {
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const { data } = await studentAPI.getDashboard();
            setDashboardData(data);
        } catch (err: any) {
            console.error("Dashboard error:", err);
            setError(err.response?.data?.message || "Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-center text-red-500 bg-red-50 rounded-lg">
                <p>Error: {error}</p>
                <button
                    onClick={fetchDashboard}
                    className="mt-2 text-sm underline text-red-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!dashboardData) return null;

    const { student, stats, recentActivities } = dashboardData;

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back, {student.name.split(" ")[0]}! 👋
                    </h1>
                    <p className="text-muted-foreground">
                        Here's what's happening with your studies today.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-lg">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                        {format(new Date(), "EEEE, MMMM do, yyyy")}
                    </span>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                        <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.attendance.percentage}%</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.attendance.present} days present
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.courses}</div>
                        <p className="text-xs text-muted-foreground">
                            Active subjects
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recent GPA</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground">
                            Last term result
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Fees Status</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold capitalize">{stats.fees.status}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.fees.status === 'Paid'
                                ? 'All cleared'
                                : 'Payment pending'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Results */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Results</CardTitle>
                        <CardDescription>
                            Your performance in latest assessments
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {stats.results && stats.results.length > 0 ? (
                            <div className="space-y-4">
                                {stats.results.map((result: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-medium">{result.subject?.name || 'Unknown Subject'}</p>
                                            <p className="text-sm text-muted-foreground">{result.term} Term • {result.session}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="font-bold text-lg">{result.totalScore}</p>
                                                <p className="text-xs text-muted-foreground">Score</p>
                                            </div>
                                            <Badge variant={result.totalScore >= 50 ? "default" : "destructive"}>
                                                {result.grade}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                No recent results found.
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Profile Card */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Student Profile</CardTitle>
                        <CardDescription>
                            Your academic details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center mb-6">
                            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary mb-3">
                                {student.name.charAt(0)}
                            </div>
                            <h3 className="text-xl font-bold">{student.name}</h3>
                            <p className="text-muted-foreground">{student.admissionNumber}</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Class</span>
                                <span className="font-medium">{student.class}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Status</span>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Active Student
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Current Term</span>
                                <span className="font-medium">1st Term</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
