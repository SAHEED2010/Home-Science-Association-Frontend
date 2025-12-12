"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { coursesAPI } from "@/services/api";
import { Plus, BookOpen, Layers, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await coursesAPI.getAll();
            setCourses(response.data);
        } catch (err: any) {
            console.error("Error fetching courses:", err);
            setError(err.response?.data?.message || "Failed to load courses");
        } finally {
            setLoading(false);
        }
    };

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
                        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
                        <p className="text-muted-foreground">Manage subjects and curriculum.</p>
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
                    <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
                    <p className="text-muted-foreground">Manage subjects and curriculum.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Course
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                    <Card key={course._id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{course.title}</CardTitle>
                                    <CardDescription>
                                        {course.code} • {course.class?.name || "N/A"}
                                    </CardDescription>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                    <Layers className="h-5 w-5" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 py-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <BookOpen className="h-4 w-4" />
                                    <span>{course.modules || 0} Modules</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    By {course.teacher?.name || "Unassigned"}
                                </div>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <Button variant="outline" className="w-full">Syllabus</Button>
                                <Button variant="secondary" className="w-full">
                                    Manage <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Add New Course Card Placeholder */}
                <button className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-muted-foreground/25 p-6 hover:border-primary/50 hover:bg-muted/50 transition-colors">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                        <h3 className="font-semibold">Add Course</h3>
                        <p className="text-sm text-muted-foreground">Create a new subject module</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
