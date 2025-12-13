"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { studentsAPI, attendanceAPI } from "@/services/api";
import { Loader2, Save, UserCheck, Check, X, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CLASSES = ["SS 1", "SS 2", "SS 3", "JSS 1", "JSS 2", "JSS 3"];

export default function TeacherAttendancePage() {
    const [selectedClass, setSelectedClass] = useState("");
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [attendance, setAttendance] = useState<any>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (selectedClass) {
            fetchStudents();
        }
    }, [selectedClass]);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const { data } = await studentsAPI.getAll();
            // Filter by class (assuming simple string match or id match)
            // In a real app, use an API filter param: studentsAPI.getAll({ class: selectedClass })
            const filtered = data.filter((s: any) =>
                s.class === selectedClass || s.class?.name === selectedClass
            );
            setStudents(filtered);

            // Initialize all as present
            const initialAttendance: any = {};
            filtered.forEach((s: any) => {
                initialAttendance[s._id] = "Present";
            });
            setAttendance(initialAttendance);

        } catch (error) {
            console.error("Failed to fetch students", error);
        } finally {
            setLoading(false);
        }
    };

    const handleMark = (studentId: string, status: string) => {
        setAttendance((prev: any) => ({
            ...prev,
            [studentId]: status
        }));
    };

    const handleSubmit = async () => {
        setSaving(true);
        try {
            const date = new Date().toISOString().split('T')[0];
            const records = students.map(student => ({
                student: student._id,
                status: attendance[student._id],
                date: date,
                class: selectedClass
            }));

            await attendanceAPI.bulkCreate(records);
            alert("Attendance marked successfully for " + date);
            setSelectedClass("");
            setStudents([]);
        } catch (error: any) {
            alert("Failed to save: " + (error.response?.data?.message || "Error saving attendance"));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Daily Attendance</h1>
                <p className="text-muted-foreground">Mark student attendance for {new Date().toLocaleDateString()}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Select Class</CardTitle>
                    <CardDescription>Choose a class to start marking attendance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="max-w-xs">
                        <Select value={selectedClass} onValueChange={setSelectedClass}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Class" />
                            </SelectTrigger>
                            <SelectContent>
                                {CLASSES.map((cls) => (
                                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {loading && (
                <div className="flex justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}

            {!loading && selectedClass && students.length === 0 && (
                <div className="text-center p-8 text-muted-foreground">
                    No students found in {selectedClass}.
                </div>
            )}

            {!loading && students.length > 0 && (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Students - {selectedClass}</CardTitle>
                            <CardDescription>{students.length} students found</CardDescription>
                        </div>
                        <Button onClick={handleSubmit} disabled={saving}>
                            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save Attendance
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="border-t">
                            <div className="grid grid-cols-12 bg-muted/50 p-4 font-medium text-sm">
                                <div className="col-span-6">Student</div>
                                <div className="col-span-6 flex justify-end pr-4">Status</div>
                            </div>
                            <div className="divide-y">
                                {students.map((student) => (
                                    <div key={student._id} className="grid grid-cols-12 p-4 items-center gap-4 hover:bg-muted/5">
                                        <div className="col-span-6 flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium">{student.name}</div>
                                                <div className="text-xs text-muted-foreground">{student.admissionNumber}</div>
                                            </div>
                                        </div>
                                        <div className="col-span-6 flex justify-end gap-2">
                                            <Button
                                                variant={attendance[student._id] === "Present" ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => handleMark(student._id, "Present")}
                                                className={attendance[student._id] === "Present" ? "bg-green-600 hover:bg-green-700" : ""}
                                            >
                                                P
                                            </Button>
                                            <Button
                                                variant={attendance[student._id] === "Absent" ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => handleMark(student._id, "Absent")}
                                                className={attendance[student._id] === "Absent" ? "bg-red-600 hover:bg-red-700" : ""}
                                            >
                                                A
                                            </Button>
                                            <Button
                                                variant={attendance[student._id] === "Late" ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => handleMark(student._id, "Late")}
                                                className={attendance[student._id] === "Late" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                                            >
                                                L
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
