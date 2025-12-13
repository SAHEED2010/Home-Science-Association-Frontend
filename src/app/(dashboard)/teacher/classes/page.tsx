"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { classesAPI, studentsAPI } from "@/services/api";
import { Loader2, Users, BookOpen, GraduationCap } from "lucide-react";

export default function TeacherClassesPage() {
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            setLoading(true);
            const { data } = await classesAPI.getAll();
            // In a real app, filter by teacher's assigned classes
            setClasses(data);
        } catch (error) {
            console.error("Failed to fetch classes", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Classes</h1>
                <p className="text-muted-foreground">Manage your assigned classes and students.</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary h-8 w-8" /></div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {classes.map((cls) => (
                        <Card key={cls._id} className="hover:shadow-lg transition-shadow border-t-4 border-t-primary">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <BookOpen className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="bg-muted px-2 py-1 rounded text-xs font-semibold">
                                        {cls.active ? "Active" : "Archived"}
                                    </div>
                                </div>
                                <CardTitle className="mt-4">{cls.name}</CardTitle>
                                <CardDescription>{cls.abbreviation || "Class Section"}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>Students: {cls.students?.length || 0} Enrolled</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <GraduationCap className="h-4 w-4" />
                                    <span>Form Teacher: {cls.teacher?.name || "None"}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button className="w-full" variant="outline">View List</Button>
                                    <Button className="w-full" variant="secondary">Attendance</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {classes.length === 0 && (
                        <div className="col-span-full text-center p-12 bg-muted/20 rounded-lg">
                            No classes assigned.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
