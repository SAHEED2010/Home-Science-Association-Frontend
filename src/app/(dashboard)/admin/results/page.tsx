"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award } from "lucide-react";
import api from "@/lib/api";

export default function AdminResultsPage() {
    const [formData, setFormData] = useState({
        studentId: "",
        examTitle: "",
        subject: "",
        score: "",
        grade: "",
        term: "First Term",
        session: "2023/2024"
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/results', formData);
            alert('Result released successfully!');
            setFormData({
                studentId: "",
                examTitle: "",
                subject: "",
                score: "",
                grade: "",
                term: "First Term",
                session: "2023/2024"
            });
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to release result');
        } finally {
            setLoading(false);
        }
    };

    const calculateGrade = (score: number) => {
        if (score >= 75) return "A";
        if (score >= 65) return "B";
        if (score >= 50) return "C";
        if (score >= 40) return "D";
        return "F";
    };

    const handleScoreChange = (value: string) => {
        setFormData({ ...formData, score: value, grade: calculateGrade(Number(value)) });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight glow-text">Release Exam Results</h1>
                <p className="text-muted-foreground">Enter and publish student exam results</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Result Entry Form */}
                <Card className="glow-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Enter Result
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="studentId">Student ID</Label>
                                <Input
                                    id="studentId"
                                    value={formData.studentId}
                                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                    placeholder="e.g., 64f5a..."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="examTitle">Exam Title</Label>
                                <Input
                                    id="examTitle"
                                    value={formData.examTitle}
                                    onChange={(e) => setFormData({ ...formData, examTitle: e.target.value })}
                                    placeholder="e.g., First Term Exam"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    placeholder="e.g., Mathematics"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="score">Score</Label>
                                    <Input
                                        id="score"
                                        type="number"
                                        value={formData.score}
                                        onChange={(e) => handleScoreChange(e.target.value)}
                                        placeholder="0-100"
                                        min="0"
                                        max="100"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="grade">Grade (Auto)</Label>
                                    <Input
                                        id="grade"
                                        value={formData.grade}
                                        readOnly
                                        className="bg-muted"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="term">Term</Label>
                                    <Select value={formData.term} onValueChange={(value) => setFormData({ ...formData, term: value })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="First Term">First Term</SelectItem>
                                            <SelectItem value="Second Term">Second Term</SelectItem>
                                            <SelectItem value="Third Term">Third Term</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="session">Session</Label>
                                    <Select value={formData.session} onValueChange={(value) => setFormData({ ...formData, session: value })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2023/2024">2023/2024</SelectItem>
                                            <SelectItem value="2024/2025">2024/2025</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full gradient-primary">
                                {loading ? 'Releasing...' : 'Release Result'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="glow-card gradient-secondary text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            Grading System
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>A - Excellent</span>
                                <span className="font-bold">75-100</span>
                            </div>
                            <div className="flex justify-between">
                                <span>B - Good</span>
                                <span className="font-bold">65-74</span>
                            </div>
                            <div className="flex justify-between">
                                <span>C - Average</span>
                                <span className="font-bold">50-64</span>
                            </div>
                            <div className="flex justify-between">
                                <span>D - Pass</span>
                                <span className="font-bold">40-49</span>
                            </div>
                            <div className="flex justify-between">
                                <span>F - Fail</span>
                                <span className="font-bold">0-39</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/20">
                            <p className="text-sm opacity-90">
                                Results are immediately visible to students and parents once released.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
