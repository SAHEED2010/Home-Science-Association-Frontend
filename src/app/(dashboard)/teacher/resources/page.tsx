"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Video, Trash2 } from "lucide-react";
import api from "@/lib/api";

export default function TeacherResourcesPage() {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [courseId, setCourseId] = useState("");
    const [uploading, setUploading] = useState(false);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('courseId', courseId);

        try {
            await api.post('/resources', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('File uploaded successfully!');
            setFile(null);
            setTitle("");
            fetchResources();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const fetchResources = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/resources');
            setResources(data);
        } catch (error) {
            console.error('Failed to fetch resources');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this resource?')) return;

        try {
            await api.delete(`/resources/${id}`);
            alert('Resource deleted');
            fetchResources();
        } catch (error) {
            alert('Delete failed');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight glow-text">Upload Resources</h1>
                <p className="text-muted-foreground">Upload PDF materials and video lectures for your students</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Upload Form */}
                <Card className="glow-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="h-5 w-5" />
                            Upload New Resource
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Resource Title</Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Mathematics Chapter 5"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="course">Course ID (Optional)</Label>
                                <Input
                                    id="course"
                                    value={courseId}
                                    onChange={(e) => setCourseId(e.target.value)}
                                    placeholder="Course ID"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="file">Select File (PDF or Video)</Label>
                                <Input
                                    id="file"
                                    type="file"
                                    accept=".pdf,video/*"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    required
                                />
                                {file && (
                                    <p className="text-sm text-muted-foreground">
                                        Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                    </p>
                                )}
                            </div>

                            <Button type="submit" disabled={uploading} className="w-full gradient-primary">
                                {uploading ? 'Uploading...' : 'Upload Resource'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Uploaded Resources */}
                <Card className="glow-card">
                    <CardHeader>
                        <CardTitle>Your Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={fetchResources} variant="outline" size="sm" className="mb-4">
                            Refresh List
                        </Button>

                        {loading ? (
                            <p>Loading...</p>
                        ) : resources.length === 0 ? (
                            <p className="text-muted-foreground text-sm">No resources uploaded yet</p>
                        ) : (
                            <div className="space-y-2">
                                {resources.map((resource: any) => (
                                    <div key={resource._id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            {resource.type === 'pdf' ? <FileText className="h-4 w-4 text-red-500" /> : <Video className="h-4 w-4 text-blue-500" />}
                                            <div>
                                                <p className="font-medium text-sm">{resource.title}</p>
                                                <p className="text-xs text-muted-foreground">{resource.type.toUpperCase()}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(resource._id)}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
