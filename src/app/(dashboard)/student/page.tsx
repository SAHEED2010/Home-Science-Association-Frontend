"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, FileText, CheckCircle } from "lucide-react";

const TIMETABLE = [
    { time: "08:00 AM", subject: "Mathematics", room: "Room 101", teacher: "Mr. Ibrahim" },
    { time: "09:00 AM", subject: "English Language", room: "Room 102", teacher: "Mrs. Adebayo" },
    { time: "10:00 AM", subject: "Physics", room: "Lab 1", teacher: "Mr. Okonkwo" },
    { time: "11:00 AM", subject: "Break", room: "-", teacher: "-" },
    { time: "11:30 AM", subject: "Chemistry", room: "Lab 2", teacher: "Dr. Alabi" },
];

const ASSIGNMENTS = [
    { id: 1, subject: "Mathematics", title: "Algebraic Expressions", due: "Tomorrow", status: "Pending" },
    { id: 2, subject: "Physics", title: "Motion Laws Lab Report", due: "In 2 days", status: "Pending" },
    { id: 3, subject: "English", title: "Essay on Macbeth", due: "Next Week", status: "Submitted" },
];

export default function StudentDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, Chinedu!</h1>
                    <p className="text-muted-foreground">Here's what's happening today.</p>
                </div>
                <Button>View Full Timetable</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Today's Classes */}
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            Today's Schedule
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {TIMETABLE.map((slot, i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 text-sm font-medium text-muted-foreground">
                                            {slot.time}
                                        </div>
                                        <div>
                                            <p className="font-medium">{slot.subject}</p>
                                            <p className="text-xs text-muted-foreground">{slot.teacher} • {slot.room}</p>
                                        </div>
                                    </div>
                                    {slot.subject !== "Break" && (
                                        <Button variant="ghost" size="sm">View Materials</Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Assignments & Tasks */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-accent" />
                                Due Soon
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {ASSIGNMENTS.map((assignment) => (
                                    <div key={assignment.id} className="rounded-lg border p-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium text-sm">{assignment.title}</p>
                                                <p className="text-xs text-muted-foreground">{assignment.subject}</p>
                                            </div>
                                            <span className={`text-[10px] px-2 py-1 rounded-full ${assignment.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-green-100 text-green-700"
                                                }`}>
                                                {assignment.due}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <Button className="w-full" variant="outline">View All Assignments</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary text-primary-foreground">
                        <CardHeader>
                            <CardTitle className="text-lg">Exam Preparation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm opacity-90 mb-4">
                                Mid-term exams start in 14 days. Check the study guide.
                            </p>
                            <Button variant="secondary" className="w-full">Download Guide</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
