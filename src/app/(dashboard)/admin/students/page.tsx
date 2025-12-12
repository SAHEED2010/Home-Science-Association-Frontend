"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Filter, Eye, Edit } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

export default function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const { data } = await api.get("/students");
                setStudents(data);
            } catch (error) {
                console.error("Failed to fetch students:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Students</h1>
                    <p className="text-muted-foreground">Manage student records and admissions.</p>
                </div>
                <Link href="/admin/students/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Student
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium">All Students</CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search students..."
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
                                    <th className="h-12 px-4 font-medium">Admission No</th>
                                    <th className="h-12 px-4 font-medium">Name</th>
                                    <th className="h-12 px-4 font-medium">Class</th>
                                    <th className="h-12 px-4 font-medium">Phone</th>
                                    <th className="h-12 px-4 font-medium">Gender</th>
                                    <th className="h-12 px-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student: any) => (
                                    <tr key={student._id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                        <td className="p-4 font-medium">{student.studentId}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                    {student.user?.name?.[0] || "S"}
                                                </div>
                                                {student.user?.name || "Unknown"}
                                            </div>
                                        </td>
                                        <td className="p-4">{student.class?.name || "Not Assigned"}</td>
                                        <td className="p-4">{student.phone || "N/A"}</td>
                                        <td className="p-4">{student.gender || "N/A"}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {students.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                            No students found. Add your first student to get started.
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
