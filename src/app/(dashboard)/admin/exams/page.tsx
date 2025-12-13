"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { examsAPI, resultsAPI, classesAPI, studentsAPI, coursesAPI } from "@/services/api";
import { Plus, Calendar, BookOpen, Save, FileSpreadsheet } from "lucide-react";
import { format } from "date-fns";

export default function ExamsPage() {
    const [activeTab, setActiveTab] = useState("schedule");
    const [exams, setExams] = useState([]);
    const [classes, setClasses] = useState([]);
    const [courses, setCourses] = useState([]); // Subjects
    const [loading, setLoading] = useState(true);

    // Create Exam State
    const [createOpen, setCreateOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        type: "Main Exam",
        subject: "",
        class: "",
        startDate: "",
        endDate: "",
        totalMarks: 100
    });

    // Grading State
    const [selectedExam, setSelectedExam] = useState("");
    const [students, setStudents] = useState<any[]>([]);
    const [grades, setGrades] = useState<any>({});
    const [gradingLoading, setGradingLoading] = useState(false);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [examsRes, classesRes, coursesRes] = await Promise.all([
                examsAPI.getAll(),
                classesAPI.getAll(),
                coursesAPI.getAll()
            ]);
            setExams(examsRes.data);
            setClasses(classesRes.data);
            setCourses(coursesRes.data);
        } catch (error) {
            console.error("Failed to load data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateExam = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await examsAPI.create(formData);
            setCreateOpen(false);
            setFormData({
                title: "",
                type: "Main Exam",
                subject: "",
                class: "",
                startDate: "",
                endDate: "",
                totalMarks: 100
            });
            fetchInitialData();
            alert("Exam scheduled successfully!");
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to create exam");
        }
    };

    const handleLoadStudents = async () => {
        if (!selectedExam) return;
        setGradingLoading(true);
        try {
            const exam: any = exams.find((e: any) => e._id === selectedExam);
            if (!exam) return;

            // Fetch students for the exam's class
            // Ideally we should have a 'getStudentsByClass' API, but filtering 'getAll' works for small datasets
            const { data: allStudents } = await studentsAPI.getAll();
            const classStudents = allStudents.filter((s: any) => s.class?._id === exam.class?._id || s.class === exam.class?._id);
            setStudents(classStudents);

            // Here we could also fetch existing results to populate the inputs
            // const { data: existingResults } = await resultsAPI.getByExam(selectedExam); 
        } catch (error) {
            console.error("Failed to load students", error);
        } finally {
            setGradingLoading(false);
        }
    };

    const handleGradeChange = (studentId: string, score: number) => {
        setGrades({
            ...grades,
            [studentId]: { score }
        });
    };

    const handleSubmitGrades = async () => {
        if (!selectedExam) return;
        const exam: any = exams.find((e: any) => e._id === selectedExam);

        const resultsToSubmit = Object.keys(grades).map(studentId => ({
            studentId,
            score: grades[studentId].score,
            remarks: "Generated via Portal"
        }));

        try {
            await resultsAPI.recordBulk({
                examId: selectedExam,
                subjectId: exam.subject?._id || exam.subject, // Handle populated/unpopulated
                term: "First Term", // Should be dynamic
                session: "2023/2024", // Should be dynamic
                results: resultsToSubmit
            });
            alert("Grades saved successfully!");
            setGrades({});
            setStudents([]);
            setSelectedExam("");
        } catch (error: any) {
            alert("Failed to save grades: " + error.response?.data?.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Exams & Grades</h2>
                    <p className="text-muted-foreground">Schedule assessments and record student performance.</p>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
                    <TabsTrigger value="grading">Grade Entry</TabsTrigger>
                </TabsList>

                {/* SCHEDULE TAB */}
                <TabsContent value="schedule" className="space-y-4">
                    <div className="flex justify-end">
                        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" /> Schedule Exam
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <form onSubmit={handleCreateExam}>
                                    <DialogHeader>
                                        <DialogTitle>Schedule New Exam</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Exam Title</Label>
                                            <Input id="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. First Term Mathematics" required />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Class</Label>
                                                <Select onValueChange={val => setFormData({ ...formData, class: val })}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Class" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {classes.map((c: any) => (
                                                            <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Subject</Label>
                                                <Select onValueChange={val => setFormData({ ...formData, subject: val })}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Subject" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {courses.map((c: any) => (
                                                            <SelectItem key={c._id} value={c._id}>{c.title}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="start">Start Date</Label>
                                                <Input id="start" type="date" onChange={e => setFormData({ ...formData, startDate: e.target.value })} required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="end">End Date</Label>
                                                <Input id="end" type="date" onChange={e => setFormData({ ...formData, endDate: e.target.value })} required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="marks">Total Marks</Label>
                                            <Input id="marks" type="number" value={formData.totalMarks} onChange={e => setFormData({ ...formData, totalMarks: parseInt(e.target.value) })} required />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit">Schedule Exam</Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {exams.map((exam: any) => (
                            <Card key={exam._id}>
                                <CardHeader>
                                    <CardTitle>{exam.title}</CardTitle>
                                    <CardDescription>{exam.class?.name} • {exam.subject?.title}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span>
                                                {format(new Date(exam.startDate), "MMM d")} - {format(new Date(exam.endDate), "MMM d, yyyy")}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                                            <span>Max Marks: {exam.totalMarks}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* GRADING TAB */}
                <TabsContent value="grading" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Enter Student Grades</CardTitle>
                            <CardDescription>Select an exam to start entering scores. Make sure the exam is already scheduled.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-4 items-end">
                                <div className="space-y-2 w-full md:w-1/2">
                                    <Label>Select Exam</Label>
                                    <Select value={selectedExam} onValueChange={setSelectedExam}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose an exam..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {exams.map((exam: any) => (
                                                <SelectItem key={exam._id} value={exam._id}>
                                                    {exam.title} ({exam.class?.name})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={handleLoadStudents} disabled={!selectedExam || gradingLoading}>
                                    {gradingLoading ? "Loading..." : "Load Students"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {students.length > 0 && (
                        <Card>
                            <CardContent className="p-0">
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-3 bg-muted p-4 font-medium">
                                        <div>Student Name</div>
                                        <div>Admission No.</div>
                                        <div>Score (Max 100)</div>
                                    </div>
                                    {students.map((student) => (
                                        <div key={student._id} className="grid grid-cols-3 p-4 border-t items-center">
                                            <div>{student.name}</div>
                                            <div className="text-sm text-muted-foreground">{student.admissionNumber}</div>
                                            <div>
                                                <Input
                                                    type="number"
                                                    max={100}
                                                    className="w-24"
                                                    placeholder="0"
                                                    onChange={(e) => handleGradeChange(student._id, parseInt(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <div className="p-4 flex justify-end bg-muted/20">
                                <Button onClick={handleSubmitGrades} size="lg">
                                    <Save className="mr-2 h-4 w-4" /> Save All Grades
                                </Button>
                            </div>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
