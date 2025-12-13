"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Calendar, Trash2, Search, Loader2, FileText } from "lucide-react";
import { assignmentsAPI } from "@/services/api";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function TeacherAssignmentsPage() {
    const [assignments, setAssignments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Create State
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [newAssignment, setNewAssignment] = useState({
        title: "",
        subject: "",
        class: "",
        dueDate: "",
        description: "",
        totalMarks: 100
    });

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            const { data } = await assignmentsAPI.getAll();
            setAssignments(data);
        } catch (error) {
            console.error("Failed to fetch assignments", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateLoading(true);
        try {
            await assignmentsAPI.create(newAssignment);
            await fetchAssignments();
            setIsCreateOpen(false);
            setNewAssignment({
                title: "",
                subject: "",
                class: "",
                dueDate: "",
                description: "",
                totalMarks: 100
            });
        } catch (error: any) {
            alert("Failed to create: " + (error.response?.data?.message || error.message));
        } finally {
            setCreateLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await assignmentsAPI.delete(id);
            setAssignments(assignments.filter(a => a._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const filteredAssignments = assignments.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
                    <p className="text-muted-foreground">Create and manage student assignments.</p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Assignment
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Create New Assignment</DialogTitle>
                            <DialogDescription>Assign homework to a class.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreate} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    value={newAssignment.title}
                                    onChange={e => setNewAssignment({ ...newAssignment, title: e.target.value })}
                                    required placeholder="e.g. Algebra Homework"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Subject</Label>
                                    <Input
                                        value={newAssignment.subject}
                                        onChange={e => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                                        required placeholder="Maths"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Class</Label>
                                    <Select
                                        value={newAssignment.class}
                                        onValueChange={val => setNewAssignment({ ...newAssignment, class: val })}
                                    >
                                        <SelectTrigger><SelectValue placeholder="Select Class" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="SS 1">SS 1</SelectItem>
                                            <SelectItem value="SS 2">SS 2</SelectItem>
                                            <SelectItem value="JSS 1">JSS 1</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Due Date</Label>
                                    <Input
                                        type="date"
                                        value={newAssignment.dueDate}
                                        onChange={e => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Total Marks</Label>
                                    <Input
                                        type="number"
                                        value={newAssignment.totalMarks}
                                        onChange={e => setNewAssignment({ ...newAssignment, totalMarks: parseInt(e.target.value) })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={newAssignment.description}
                                    onChange={e => setNewAssignment({ ...newAssignment, description: e.target.value })}
                                    placeholder="Instructions..."
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={createLoading}>
                                    {createLoading ? "Creating..." : "Create Assignment"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search assignments..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredAssignments.map((assignment) => (
                        <Card key={assignment._id} className="hover:shadow-md transition-shadow relative group">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                                        <CardDescription>{assignment.subject} • {assignment.class}</CardDescription>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => handleDelete(assignment._id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Marks</span>
                                        <span className="font-medium">{assignment.totalMarks}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {filteredAssignments.length === 0 && (
                        <div className="col-span-full text-center p-8 text-muted-foreground">
                            No assignments found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
