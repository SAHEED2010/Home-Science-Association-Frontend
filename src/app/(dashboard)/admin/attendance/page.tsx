"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { attendanceAPI, classesAPI } from "@/services/api";
import { CalendarCheck, CheckCircle2, XCircle, Clock, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AttendancePage() {
    const [attendance, setAttendance] = useState<any[]>([]);
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const today = new Date().toISOString().split('T')[0];

            const [attendanceRes, classesRes] = await Promise.all([
                attendanceAPI.getAll({ date: today }),
                classesAPI.getAll()
            ]);

            setAttendance(attendanceRes.data);
            setClasses(classesRes.data);
        } catch (err: any) {
            console.error("Error fetching data:", err);
            setError(err.response?.data?.message || "Failed to load attendance data");
        } finally {
            setLoading(false);
        }
    };

    // Calculate today's stats
    const totalPresent = attendance.filter(a => a.status === "Present").length;
    const totalAbsent = attendance.filter(a => a.status === "Absent").length;
    const totalLate = attendance.filter(a => a.status === "Late").length;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
                        <p className="text-muted-foreground">Track daily student attendance.</p>
                    </div>
                </div>
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
                    <p className="text-muted-foreground">Track daily student attendance.</p>
                </div>
                <Button>
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    Mark Attendance
                </Button>
            </div>

            {/* Daily Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Present Today</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalPresent}</div>
                        <p className="text-xs text-muted-foreground">Students on campus</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
                        <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalAbsent}</div>
                        <p className="text-xs text-muted-foreground">Reported absences</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Late Arrival</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalLate}</div>
                        <p className="text-xs text-muted-foreground">Checked in after 8:00 AM</p>
                    </CardContent>
                </Card>
            </div>

            {/* Class Attendance Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Class Attendance Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {classes.map((cls) => (
                            <div key={cls._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {cls.name?.substring(0, 2) || "CL"}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{cls.name}</h3>
                                        <p className="text-sm text-muted-foreground">{cls.teacher?.name || "No teacher assigned"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden md:block">
                                        <p className="text-sm font-medium">
                                            {cls.students ? Math.round((cls.students * 0.95)) : 0}/{cls.students || 0} Present
                                        </p>
                                        <p className="text-xs text-muted-foreground">Last updated: 8:30 AM</p>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
