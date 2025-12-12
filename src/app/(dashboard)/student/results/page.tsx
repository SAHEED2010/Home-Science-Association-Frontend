"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Download, Printer } from "lucide-react";
import api from "@/lib/api";

export default function StudentResultsPage() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [studentId, setStudentId] = useState("");

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // Get student ID from local storage or user profile
                // For now, we'll try to get it from the user object if available, 
                // or fetch the student profile first.
                // Assuming the user object has a 'studentId' or we need to fetch the student profile using the user ID.

                // Strategy: Fetch current user profile to get student ID
                // But for simplicity, let's assume the backend /api/results/student/me endpoint exists or we use the user ID
                // Wait, the resultController uses `studentId` (the Student model ID), not User ID.
                // We need to find the Student record for the current User.

                // Let's try to fetch all students and find the one matching the current user email/id
                // Or better, update the backend to allow fetching "my results".

                // For this implementation, I'll assume we can get the student ID from the user object 
                // if we updated the login response. If not, we might need a workaround.
                // Workaround: Fetch all students, find me.

                const userStr = localStorage.getItem("user");
                if (!userStr) return;
                const user = JSON.parse(userStr);

                // Fetch student profile linked to this user
                // We don't have a direct endpoint for "get my student profile" yet.
                // Let's fetch all students and filter (inefficient but works for now)
                const studentsRes = await api.get("/students");
                const myStudentProfile = studentsRes.data.find((s: any) => s.user._id === user._id || s.user === user._id);

                if (myStudentProfile) {
                    setStudentId(myStudentProfile._id);
                    const { data } = await api.get(`/results/student/${myStudentProfile._id}`);
                    setResults(data);
                }
            } catch (error) {
                console.error("Failed to fetch results:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading results...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight glow-text">My Results</h1>
                    <p className="text-muted-foreground">View your academic performance and grades.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                {results.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                            No results found for this session.
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="glow-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-primary" />
                                Academic Record
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/50 text-muted-foreground">
                                        <tr>
                                            <th className="h-12 px-4 font-medium">Subject</th>
                                            <th className="h-12 px-4 font-medium">Exam</th>
                                            <th className="h-12 px-4 font-medium">Term</th>
                                            <th className="h-12 px-4 font-medium">Score</th>
                                            <th className="h-12 px-4 font-medium">Grade</th>
                                            <th className="h-12 px-4 font-medium">Session</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((result: any) => (
                                            <tr key={result._id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                                <td className="p-4 font-medium">{result.subject}</td>
                                                <td className="p-4">{result.examTitle}</td>
                                                <td className="p-4">{result.term}</td>
                                                <td className="p-4">{result.score}</td>
                                                <td className="p-4">
                                                    <span className={`font-bold ${['A', 'B'].includes(result.grade) ? 'text-green-600' :
                                                            result.grade === 'C' ? 'text-yellow-600' :
                                                                result.grade === 'F' ? 'text-red-600' : 'text-blue-600'
                                                        }`}>
                                                        {result.grade}
                                                    </span>
                                                </td>
                                                <td className="p-4">{result.session}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
