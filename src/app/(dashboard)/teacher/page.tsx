"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CLASSES } from "@/lib/data";
import { Users, BookOpen, Plus, ClipboardList } from "lucide-react";

export default function TeacherDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
                    <p className="text-muted-foreground">Manage your classes and students.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <ClipboardList className="mr-2 h-4 w-4" />
                        Mark Attendance
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Assignment
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">137</div>
                        <p className="text-xs text-muted-foreground">Across 3 classes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">Next: SS2 Physics (10:00 AM)</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">28</div>
                        <p className="text-xs text-muted-foreground">Assignments to review</p>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-xl font-semibold mt-6">My Classes</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {CLASSES.map((cls) => (
                    <Card key={cls.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle>{cls.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-muted-foreground">{cls.students} Students</span>
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Active</span>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" className="w-full" variant="outline">View Students</Button>
                                <Button size="sm" className="w-full">Gradebook</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
