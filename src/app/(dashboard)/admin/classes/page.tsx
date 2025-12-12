"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, BookOpen, Loader2, AlertCircle } from "lucide-react";
import { classesAPI } from "@/services/api";

export default function ClassesPage() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            setLoading(true);
            const { data } = await classesAPI.getAll();
            setClasses(data);
        } catch (error: any) {
            console.error("Failed to fetch classes:", error);
            setError(error.response?.data?.message || "Failed to load classes");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground">Loading classes...</p>
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
                            <h3 className="font-semibold">Error Loading Classes</h3>
                            <p className="text-sm text-muted-foreground">{error}</p>
                            <Button onClick={fetchClasses}>Try Again</Button>
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
                    <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
                    <p className="text-muted-foreground">Manage classes and course assignments.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Class
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {classes.map((classItem: any) => (
                    <Card key={classItem._id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl">{classItem.name}</CardTitle>
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <BookOpen className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>Grade Level: {classItem.gradeLevel}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium">Subjects:</span>
                                <span className="text-muted-foreground">
                                    {classItem.subjects?.length || 0} subjects
                                </span>
                            </div>
                            <div className="pt-2 border-t">
                                <Button variant="outline" className="w-full">
                                    View Details
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {classes.length === 0 && (
                    <Card className="col-span-full">
                        <CardContent className="p-8 text-center text-muted-foreground">
                            No classes found. Add your first class to get started.
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
