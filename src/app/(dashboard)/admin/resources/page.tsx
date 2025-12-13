"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Plus, FileText, Video, Image as ImageIcon, Link as LinkIcon,
    Download, Trash2, Search, Filter, Loader2, File
} from "lucide-react";
import { resourcesAPI } from "@/services/api";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Helper to get full URL
const getFileUrl = (path: string) => {
    if (path.startsWith('http')) return path;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}${path}`;
};

export default function ResourcesPage() {
    const [resources, setResources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClass, setSelectedClass] = useState("All");

    // Create State
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [newResource, setNewResource] = useState({
        title: "",
        subject: "",
        class: "",
        type: "PDF",
        url: "" // for external links
    });
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetchResources();
    }, [selectedClass]);

    const fetchResources = async () => {
        try {
            setLoading(true);
            const params: any = {};
            if (selectedClass !== "All") params.class = selectedClass;

            const { data } = await resourcesAPI.getAll(params);
            setResources(data);
        } catch (error) {
            console.error("Failed to fetch resources", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', newResource.title);
            formData.append('subject', newResource.subject);
            formData.append('class', newResource.class);
            formData.append('type', newResource.type);

            if (newResource.type === 'Link') {
                formData.append('url', newResource.url);
            } else if (file) {
                formData.append('file', file);
            } else {
                alert("Please select a file or enter a URL");
                setCreateLoading(false);
                return;
            }

            await resourcesAPI.create(formData);
            await fetchResources();
            setIsCreateOpen(false);
            setNewResource({ title: "", subject: "", class: "", type: "PDF", url: "" });
            setFile(null);
        } catch (error: any) {
            alert("Failed to upload: " + (error.response?.data?.message || error.message));
        } finally {
            setCreateLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this resource?")) return;
        try {
            await resourcesAPI.delete(id);
            setResources(resources.filter(r => r._id !== id));
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'PDF': return <FileText className="h-6 w-6 text-red-500" />;
            case 'Video': return <Video className="h-6 w-6 text-blue-500" />;
            case 'Image': return <ImageIcon className="h-6 w-6 text-purple-500" />;
            case 'Link': return <LinkIcon className="h-6 w-6 text-green-500" />;
            default: return <File className="h-6 w-6 text-gray-500" />;
        }
    };

    const filteredResources = resources.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">E-Library & Resources</h1>
                    <p className="text-muted-foreground">Manage study materials, assignments, and digital assets.</p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Upload Resource
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Resource</DialogTitle>
                            <DialogDescription>Upload a file or add an external link for students.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreate} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    value={newResource.title}
                                    onChange={e => setNewResource({ ...newResource, title: e.target.value })}
                                    placeholder="e.g. Algebra Chapter 1 Notes"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Subject</Label>
                                    <Input
                                        value={newResource.subject}
                                        onChange={e => setNewResource({ ...newResource, subject: e.target.value })}
                                        placeholder="Mathematics"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Class</Label>
                                    <Select
                                        value={newResource.class}
                                        onValueChange={val => setNewResource({ ...newResource, class: val })}
                                    >
                                        <SelectTrigger><SelectValue placeholder="Select Class" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="SS 1">SS 1</SelectItem>
                                            <SelectItem value="SS 2">SS 2</SelectItem>
                                            <SelectItem value="SS 3">SS 3</SelectItem>
                                            <SelectItem value="JSS 1">JSS 1</SelectItem>
                                            <SelectItem value="JSS 2">JSS 2</SelectItem>
                                            <SelectItem value="JSS 3">JSS 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select
                                    value={newResource.type}
                                    onValueChange={val => setNewResource({ ...newResource, type: val })}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PDF">PDF Document</SelectItem>
                                        <SelectItem value="Video">Video</SelectItem>
                                        <SelectItem value="Image">Image</SelectItem>
                                        <SelectItem value="Link">External Link</SelectItem>
                                        <SelectItem value="Other">Other File</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {newResource.type === 'Link' ? (
                                <div className="space-y-2">
                                    <Label>URL</Label>
                                    <Input
                                        value={newResource.url}
                                        onChange={e => setNewResource({ ...newResource, url: e.target.value })}
                                        placeholder="https://..."
                                        required
                                    />
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Label>File Upload</Label>
                                    <Input
                                        type="file"
                                        onChange={e => setFile(e.target.files?.[0] || null)}
                                        required={newResource.type !== 'Link'}
                                    />
                                </div>
                            )}

                            <DialogFooter>
                                <Button type="submit" disabled={createLoading}>
                                    {createLoading ? "Uploading..." : "Upload Resource"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search resources..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="All Classes" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Classes</SelectItem>
                        <SelectItem value="SS 1">SS 1</SelectItem>
                        <SelectItem value="SS 2">SS 2</SelectItem>
                        <SelectItem value="SS 3">SS 3</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredResources.map((resource) => (
                    <Card key={resource._id} className="group hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                                    {getIcon(resource.type)}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10 -mr-2"
                                    onClick={() => handleDelete(resource._id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <h3 className="font-semibold truncate mb-1" title={resource.title}>{resource.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                <Badge variant="secondary" className="text-xs">{resource.subject}</Badge>
                                <span className="text-xs">• {resource.class}</span>
                            </div>

                            <a
                                href={getFileUrl(resource.fileUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <Button variant="outline" className="w-full gap-2 group-hover:border-primary group-hover:text-primary">
                                    <Download className="h-4 w-4" />
                                    {resource.type === 'Link' ? 'Open Link' : 'Download'}
                                </Button>
                            </a>

                            <div className="mt-3 text-xs text-muted-foreground text-center">
                                Added by {resource.uploadedBy?.name || 'Admin'} • {new Date(resource.createdAt).toLocaleDateString()}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {!loading && filteredResources.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <File className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No resources found</h3>
                    <p className="text-muted-foreground">Upload your first study material to get started.</p>
                </div>
            )}
        </div>
    );
}
