"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, FileText, Calendar, Clock, MoreHorizontal, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AssignmentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
                    <p className="text-muted-foreground">Manage homework and project submissions.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Assignment
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Mock Assignment Cards */}
                {[
                    {
                        title: "Algebraic Expressions",
                        subject: "Mathematics",
                        class: "SS2 Science",
                        due: "Tomorrow, 11:59 PM",
                        submitted: 15,
                        total: 42,
                        status: "Active"
                    },
                    {
                        title: "Physics Lab Report: Pendulum",
                        subject: "Physics",
                        class: "SS2 Science",
                        due: "Fri, 24th May",
                        submitted: 40,
                        total: 42,
                        status: "Active"
                    },
                    {
                        title: "Essay: Colonial History",
                        subject: "History",
                        class: "JSS3 A",
                        due: "Mon, 27th May",
                        submitted: 5,
                        total: 50,
                        status: "Active"
                    },
                    {
                        title: "Chemical Bonding Quiz",
                        subject: "Chemistry",
                        class: "SS1 Science",
                        due: "Closed",
                        submitted: 45,
                        total: 45,
                        status: "Closed"
                    }
                ].map((assignment, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                                    <CardDescription>{assignment.subject} • {assignment.class}</CardDescription>
                                </div>
                                <Button variant="ghost" size="icon" className="-mr-2">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>Due: {assignment.due}</span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Submissions</span>
                                        <span className="font-medium">{assignment.submitted} / {assignment.total}</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all"
                                            style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button variant="outline" className="w-full">View</Button>
                                    <Button variant="secondary" className="w-full">Grade</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
