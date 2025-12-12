"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EXAMS, GRADES } from "@/lib/data";
import { Plus, FileBarChart, Calendar, ChevronRight, Download } from "lucide-react";
import Link from "next/link";

export default function ExamsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Exams & Grades</h1>
                    <p className="text-muted-foreground">Manage examination schedules and student results.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule Exam
                    </Button>
                </div>
            </div>

            {/* Exam Schedule */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Examination Schedule</CardTitle>
                        <CardDescription>Upcoming and past examinations.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {EXAMS.map((exam) => (
                                <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${exam.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                                            }`}>
                                            <Calendar className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{exam.title}</h3>
                                            <p className="text-sm text-muted-foreground">{exam.type} • {exam.startDate} to {exam.endDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${exam.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                                            }`}>
                                            {exam.status}
                                        </span>
                                        <Button variant="ghost" size="icon">
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Grades Preview */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Results Uploaded</CardTitle>
                    <CardDescription>Latest grades entered for Second Term Examination.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground">
                                <tr>
                                    <th className="h-12 px-4 font-medium">Student</th>
                                    <th className="h-12 px-4 font-medium">Subject</th>
                                    <th className="h-12 px-4 font-medium">Score</th>
                                    <th className="h-12 px-4 font-medium">Grade</th>
                                    <th className="h-12 px-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {GRADES.map((grade, i) => (
                                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                        <td className="p-4 font-medium">{grade.studentName}</td>
                                        <td className="p-4">{grade.subject}</td>
                                        <td className="p-4">{grade.score}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${grade.grade.startsWith("A") ? "bg-green-100 text-green-700" :
                                                    grade.grade.startsWith("B") ? "bg-blue-100 text-blue-700" :
                                                        grade.grade.startsWith("C") ? "bg-yellow-100 text-yellow-700" :
                                                            "bg-red-100 text-red-700"
                                                }`}>
                                                {grade.grade}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button variant="ghost" size="sm">Edit</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
