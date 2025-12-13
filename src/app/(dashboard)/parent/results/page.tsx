"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { parentAPI } from "@/services/api";
import { Loader2, FileText, Download, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ParentResultsPage() {
    const [children, setChildren] = useState<any[]>([]);
    const [selectedChild, setSelectedChild] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [resultsLoading, setResultsLoading] = useState(false);

    useEffect(() => {
        fetchChildren();
    }, []);

    useEffect(() => {
        if (selectedChild) {
            fetchResults(selectedChild);
        }
    }, [selectedChild]);

    const fetchChildren = async () => {
        try {
            setLoading(true);
            const { data } = await parentAPI.getDashboard();
            setChildren(data.children || []);
            if (data.children?.length > 0) {
                setSelectedChild(data.children[0]._id);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchResults = async (childId: string) => {
        try {
            setResultsLoading(true);
            const { data } = await parentAPI.getChildGrades(childId);
            setResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setResultsLoading(false);
        }
    };

    const getGradeColor = (grade: string) => {
        if (['A', 'A+'].includes(grade)) return "bg-green-100 text-green-700";
        if (['B', 'B+', 'C'].includes(grade)) return "bg-blue-100 text-blue-700";
        if (['D', 'E'].includes(grade)) return "bg-yellow-100 text-yellow-700";
        return "bg-red-100 text-red-700";
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Academic Results</h1>
                    <p className="text-muted-foreground">Monitor performance and term reports.</p>
                </div>

                {children.length > 0 && (
                    <div className="w-[200px]">
                        <Select value={selectedChild} onValueChange={setSelectedChild}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Child" />
                            </SelectTrigger>
                            <SelectContent>
                                {children.map(child => (
                                    <SelectItem key={child._id} value={child._id}>{child.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8" /></div>
            ) : resultsLoading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
            ) : (
                <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Overall Average</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {results.length > 0 ? (results.reduce((acc, curr) => acc + curr.score, 0) / results.length).toFixed(1) : '0'}%
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>First Term 2023/2024</CardTitle>
                            <CardDescription>Continuous Assessment and Exam Scores</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {results.length === 0 ? (
                                <div className="text-center p-8 text-muted-foreground">No results released yet for this term.</div>
                            ) : (
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-4 bg-muted p-4 font-medium text-sm">
                                        <div className="col-span-2">Subject</div>
                                        <div>Score</div>
                                        <div>Grade</div>
                                    </div>
                                    <div className="divide-y">
                                        {results.map((result, i) => (
                                            <div key={i} className="grid grid-cols-4 p-4 items-center gap-4 text-sm">
                                                <div className="col-span-2 font-medium">{result.subject?.title || result.subject}</div>
                                                <div>{result.score} / 100</div>
                                                <div>
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${getGradeColor(result.grade)}`}>
                                                        {result.grade}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
