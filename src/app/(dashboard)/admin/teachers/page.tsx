"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Filter, Eye, Edit, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { teachersAPI } from "@/services/api";

export default function TeachersPage() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            setLoading(true);
            const { data } = await teachersAPI.getAll();
            setTeachers(data);
        } catch (error: any) {
            console.error("Failed to fetch teachers:", error);
            setError(error.response?.data?.message || "Failed to load teachers");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground">Loading teachers...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Card className="max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                            <h3 className="font-semibold">Error Loading Teachers</h3>
                            <p className="text-sm text-muted-foreground">{error}</p>
                            <Button onClick={fetchTeachers}>Try Again</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
                    <p className="text-muted-foreground">Manage teaching staff and assignments.</p>
                </div>
                <Link href="/admin/teachers/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Teacher
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium">All Teachers ({teachers.length})</CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search teachers..."
                                    className="pl-9 w-[250px]"
                                />
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground">
                                <tr>
                                    <th className="h-12 px-4 font-medium">Employee ID</th>
                                    <th className="h-12 px-4 font-medium">Name</th>
                                    <th className="h-12 px-4 font-medium">Subjects</th>
                                    <th className="h-12 px-4 font-medium">Phone</th>
                                    <th className="h-12 px-4 font-medium">Email</th>
                                    <th className="h-12 px-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.map((teacher: any) => (
                                    <tr key={teacher._id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                        <td className="p-4 font-medium">{teacher.employeeId}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                    {teacher.user?.name?.[0] || "T"}
                                                </div>
                                                {teacher.user?.name || "Unknown"}
                                            </div>
                                        </td>
                                        <td className="p-4">{teacher.subjects?.join(", ") || "Not Assigned"}</td>
                                        <td className="p-4">{teacher.phone || "N/A"}</td>
                                        <td className="p-4">{teacher.user?.email || "N/A"}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/teachers/${teacher._id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {teachers.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                            No teachers found. Add your first teacher to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
