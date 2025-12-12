"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TEACHERS } from "@/lib/data";
import { Mail, Phone, MapPin, Calendar, BookOpen, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function TeacherDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const id = decodeURIComponent(resolvedParams.id);

    // Find teacher (mock data lookup)
    // In a real app, this would be an API call
    // We'll just find the first one that matches or default to the first one for demo if ID format is complex
    const teacher = TEACHERS.find((t) => t.id === id) || TEACHERS[0];

    if (!teacher) {
        return notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/teachers">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{teacher.name}</h1>
                    <p className="text-muted-foreground">Staff Profile & Schedule</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline">Edit Profile</Button>
                    <Button variant="destructive">Suspend</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Profile Card */}
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col items-center py-4">
                            <div className="h-24 w-24 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-3xl mb-4">
                                {teacher.name[0]}
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-lg">{teacher.name}</p>
                                <p className="text-sm text-muted-foreground">{teacher.subject} Teacher</p>
                                <span className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${teacher.status === "Active"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}>
                                    {teacher.status}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{teacher.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{teacher.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>Lagos, Nigeria</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>Joined: Sept 2020</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule & Classes */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                Assigned Classes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {teacher.classes.map((cls, i) => (
                                    <div key={i} className="flex items-center gap-2 rounded-lg border p-3 bg-muted/30">
                                        <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {cls.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{cls}</p>
                                            <p className="text-xs text-muted-foreground">35 Students</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-secondary" />
                                Weekly Schedule
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { day: "Monday", time: "08:00 - 09:00", class: "SS2 Science", room: "Room 101" },
                                    { day: "Monday", time: "10:00 - 11:00", class: "SS2 Art", room: "Room 104" },
                                    { day: "Tuesday", time: "09:00 - 10:00", class: "SS2 Science", room: "Lab 1" },
                                    { day: "Wednesday", time: "11:00 - 12:00", class: "SS2 Art", room: "Room 104" },
                                ].map((slot, i) => (
                                    <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="w-24 font-medium text-sm">{slot.day}</div>
                                            <div>
                                                <p className="text-sm font-medium">{slot.class}</p>
                                                <p className="text-xs text-muted-foreground">{slot.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                            {slot.room}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
