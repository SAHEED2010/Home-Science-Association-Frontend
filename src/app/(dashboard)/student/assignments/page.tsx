"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { assignmentsAPI, studentAPI } from "@/services/api";
import { Loader2, Calendar, FileText, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function StudentAssignmentsPage() {
    const [assignments, setAssignments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [studentProfile, setStudentProfile] = useState<any>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Get student profile to know their class
            const { data: profile } = await studentAPI.getDashboard();
            setStudentProfile(profile.student); // Assuming structure from Dashboard API

            const { data: allAssignments } = await assignmentsAPI.getAll();
            // Filter assignments for student's class
            const filtered = allAssignments.filter((a: any) =>
                // Flexible matching for class string or object
                a.class === profile.student.class ||
                a.class?._id === profile.student.class?._id ||
                a.class === profile.student.class.name
            );
            setAssignments(filtered);
        } catch (error) {
            console.error("Failed to load data", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Assignments</h1>
                <p className="text-muted-foreground">View your homework and projects.</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary h-8 w-8" /></div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {assignments.map((assignment) => (
                        <Card key={assignment._id} className="group hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>{assignment.title}</CardTitle>
                                        <CardDescription>{assignment.subject}</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                        Pending
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-sm text-muted-foreground line-clamp-2">
                                    {assignment.description}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <FileText className="h-4 w-4" />
                                    <span>Marks: {assignment.totalMarks}</span>
                                </div>
                                <Button className="w-full mt-2" variant="secondary">
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                    {assignments.length === 0 && (
                        <div className="col-span-full text-center p-12 border rounded-lg bg-muted/20">
                            <div className="flex justify-center mb-4">
                                <CheckCircle2 className="h-12 w-12 text-muted-foreground/50" />
                            </div>
                            <h3 className="text-lg font-medium">No Pending Assignments</h3>
                            <p className="text-muted-foreground">You're all caught up!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
