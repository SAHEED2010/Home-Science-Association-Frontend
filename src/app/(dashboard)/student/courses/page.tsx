"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { coursesAPI } from "@/services/api";
import { Loader2, BookOpen, Users, Clock } from "lucide-react";

export default function StudentCoursesPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const { data } = await coursesAPI.getAll();
            setCourses(data);
        } catch (error) {
            console.error("Failed to fetch courses", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
                <p className="text-muted-foreground">Subjects you are currently enrolled in.</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary h-8 w-8" /></div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <Card key={course._id} className="hover:shadow-lg transition-shadow border-t-4 border-t-primary">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <BookOpen className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                                <CardTitle className="mt-4">{course.title}</CardTitle>
                                <CardDescription>{course.code}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>Teacher: {course.teacher?.name || "Not Assigned"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>4 Periods / Week</span>
                                </div>
                                <Button className="w-full" variant="outline">View Resources</Button>
                            </CardContent>
                        </Card>
                    ))}
                    {courses.length === 0 && (
                        <div className="col-span-full text-center p-12 bg-muted/20 rounded-lg">
                            No courses available.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
