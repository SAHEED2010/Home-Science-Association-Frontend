"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, BookOpen, Loader2, AlertCircle } from "lucide-react";
import { classesAPI, teachersAPI } from "@/services/api";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ClassesPage() {
    const [classes, setClasses] = useState<any[]>([]);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Create Mode State
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [newClass, setNewClass] = useState({
        name: "",
        gradeLevel: "",
        teacher: "",
        subjects: "" // comma separated for simplicity in this MVP
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [classesRes, teachersRes] = await Promise.all([
                classesAPI.getAll(),
                teachersAPI.getAll()
            ]);
            setClasses(classesRes.data);
            setTeachers(teachersRes.data);
        } catch (error: any) {
            console.error("Failed to fetch data:", error);
            setError(error.response?.data?.message || "Failed to load classes");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateClass = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateLoading(true);
        try {
            // Parse subjects
            const subjectsArray = newClass.subjects.split(',').map(s => s.trim()).filter(s => s);

            await classesAPI.create({
                ...newClass,
                subjects: subjectsArray,
                teacher: newClass.teacher || undefined
            });

            // Refresh
            await fetchData();
            setIsCreateOpen(false);
            setNewClass({ name: "", gradeLevel: "", teacher: "", subjects: "" });
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to create class");
        } finally {
            setCreateLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground">Loading classes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Card className="max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                            <h3 className="font-semibold">Error Loading Classes</h3>
                            <p className="text-sm text-muted-foreground">{error}</p>
                            <Button onClick={fetchData}>Try Again</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
                    <p className="text-muted-foreground">Manage classes and course assignments.</p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Class
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Class</DialogTitle>
                            <DialogDescription>Add a new class section to the system.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateClass} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Class Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. SS1 A"
                                    value={newClass.name}
                                    onChange={e => setNewClass({ ...newClass, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="grade">Grade Level</Label>
                                <Select
                                    value={newClass.gradeLevel}
                                    onValueChange={val => setNewClass({ ...newClass, gradeLevel: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Nursery 1">Nursery 1</SelectItem>
                                        <SelectItem value="Nursery 2">Nursery 2</SelectItem>
                                        <SelectItem value="Primary 1">Primary 1</SelectItem>
                                        <SelectItem value="Primary 2">Primary 2</SelectItem>
                                        <SelectItem value="Primary 3">Primary 3</SelectItem>
                                        <SelectItem value="Primary 4">Primary 4</SelectItem>
                                        <SelectItem value="Primary 5">Primary 5</SelectItem>
                                        <SelectItem value="Primary 6">Primary 6</SelectItem>
                                        <SelectItem value="JSS 1">JSS 1</SelectItem>
                                        <SelectItem value="JSS 2">JSS 2</SelectItem>
                                        <SelectItem value="JSS 3">JSS 3</SelectItem>
                                        <SelectItem value="SS 1">SS 1</SelectItem>
                                        <SelectItem value="SS 2">SS 2</SelectItem>
                                        <SelectItem value="SS 3">SS 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="teacher">Form Teacher (Optional)</Label>
                                <Select
                                    value={newClass.teacher}
                                    onValueChange={val => setNewClass({ ...newClass, teacher: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Teacher" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teachers.map((t: any) => (
                                            <SelectItem key={t._id} value={t._id}>{t.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subjects">Subjects (Comma separated)</Label>
                                <Input
                                    id="subjects"
                                    placeholder="Mathematics, English, basic Science"
                                    value={newClass.subjects}
                                    onChange={e => setNewClass({ ...newClass, subjects: e.target.value })}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={createLoading}>
                                    {createLoading ? "Creating..." : "Create Class"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {classes.map((classItem: any) => (
                    <Card key={classItem._id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl">{classItem.name}</CardTitle>
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <BookOpen className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>Grade: {classItem.gradeLevel}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>Teacher: {classItem.teacher ? (teachers.find(t => t._id === classItem.teacher)?.name || 'Unknown') : 'None'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium">Subjects:</span>
                                <span className="text-muted-foreground">
                                    {classItem.subjects?.length || 0} subjects
                                </span>
                            </div>
                            <div className="pt-2 border-t">
                                <Button variant="outline" className="w-full">
                                    View Details
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {classes.length === 0 && !loading && (
                    <Card className="col-span-full">
                        <CardContent className="p-8 text-center text-muted-foreground">
                            No classes found. Add your first class to get started.
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
