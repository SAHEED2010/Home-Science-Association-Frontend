"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { examsAPI, resultsAPI, studentsAPI } from "@/services/api";
import { Save, Loader2, Award } from "lucide-react";

export default function TeacherResultsPage() {
    const [exams, setExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState("");
    const [students, setStudents] = useState<any[]>([]);
    const [grades, setGrades] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [gradingLoading, setGradingLoading] = useState(false);

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            setLoading(true);
            const { data } = await examsAPI.getAll();
            // Filter exams to show only those relevant to the teacher (mock logic: show all for now)
            setExams(data);
        } catch (error) {
            console.error("Failed to load exams", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadStudents = async () => {
        if (!selectedExam) return;
        setGradingLoading(true);
        try {
            const exam: any = exams.find((e: any) => e._id === selectedExam);
            if (!exam) return;

            // Fetch students for the exam's class
            const { data: allStudents } = await studentsAPI.getAll();
            const classStudents = allStudents.filter((s: any) => s.class?._id === exam.class?._id || s.class === exam.class?._id);
            setStudents(classStudents);

            // Initialize grades
            const initialGrades: any = {};
            classStudents.forEach((s: any) => {
                initialGrades[s._id] = { score: "" };
            });
            setGrades(initialGrades);

            // Ideally fetch existing results here to pre-fill
        } catch (error) {
            console.error("Failed to load students", error);
        } finally {
            setGradingLoading(false);
        }
    };

    const handleGradeChange = (studentId: string, score: string) => {
        setGrades({
            ...grades,
            [studentId]: { score: parseInt(score) || 0 }
        });
    };

    const handleSubmitGrades = async () => {
        if (!selectedExam) return;
        const exam: any = exams.find((e: any) => e._id === selectedExam);

        const resultsToSubmit = students.map(student => ({
            studentId: student._id,
            score: grades[student._id]?.score || 0,
            remarks: "Graded by Teacher"
        })).filter(r => r.score > 0); // Only submit entered grades

        try {
            await resultsAPI.recordBulk({
                examId: selectedExam,
                subjectId: exam.subject?._id || exam.subject,
                term: "First Term", // Should be dynamic
                session: "2023/2024",
                results: resultsToSubmit
            });
            alert("Grades submitted successfully!");
            setStudents([]);
            setSelectedExam("");
        } catch (error: any) {
            alert("Failed to submit grades: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Student Grading</h1>
                <p className="text-muted-foreground">Enter scores for exams and assessments.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Select Assessment
                    </CardTitle>
                    <CardDescription>Choose an exam/test to grade.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="space-y-2 w-full sm:w-1/2">
                            <Label>Exam / Assessment</Label>
                            <Select value={selectedExam} onValueChange={setSelectedExam}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an exam..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {exams.map((exam: any) => (
                                        <SelectItem key={exam._id} value={exam._id}>
                                            {exam.title} ({exam.class?.name} - {exam.subject?.title})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            onClick={handleLoadStudents}
                            disabled={!selectedExam || gradingLoading}
                            className="w-full sm:w-auto"
                        >
                            {gradingLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Load Student List
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {students.length > 0 && (
                <Card className="overflow-hidden">
                    <CardHeader>
                        <CardTitle>Enter Scores</CardTitle>
                        <CardDescription>
                            Max Marks: {exams.find((e: any) => e._id === selectedExam)?.totalMarks || 100}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="border-t">
                            <div className="grid grid-cols-12 bg-muted/50 p-4 font-medium text-sm">
                                <div className="col-span-5">Student</div>
                                <div className="col-span-4">Admission No</div>
                                <div className="col-span-3">Score</div>
                            </div>
                            <div className="divide-y">
                                {students.map((student) => (
                                    <div key={student._id} className="grid grid-cols-12 p-4 items-center gap-4 hover:bg-muted/5">
                                        <div className="col-span-5 font-medium truncate">
                                            {student.name}
                                        </div>
                                        <div className="col-span-4 text-sm text-muted-foreground truncate">
                                            {student.admissionNumber}
                                        </div>
                                        <div className="col-span-3">
                                            <Input
                                                type="number"
                                                min="0"
                                                max="100"
                                                className="h-9"
                                                placeholder="0"
                                                value={grades[student._id]?.score}
                                                onChange={(e) => handleGradeChange(student._id, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <div className="p-6 border-t bg-muted/10 flex justify-end">
                        <Button onClick={handleSubmitGrades} size="lg" className="px-8">
                            <Save className="mr-2 h-4 w-4" />
                            Submit Grades
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
