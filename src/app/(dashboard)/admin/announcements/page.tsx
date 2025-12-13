"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { announcementsAPI } from "@/services/api";
import { Plus, Trash2, Megaphone, Users, Mail, MessageSquare } from "lucide-react";
import { format } from "date-fns";

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createOpen, setCreateOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        targetAudience: "all",
        sendViaEmail: false,
        sendViaSMS: false,
    });

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const { data } = await announcementsAPI.getAll();
            setAnnouncements(data);
        } catch (error) {
            console.error("Failed to fetch announcements:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await announcementsAPI.create(formData);
            setCreateOpen(false);
            setFormData({
                title: "",
                content: "",
                targetAudience: "all",
                sendViaEmail: false,
                sendViaSMS: false,
            });
            fetchAnnouncements();
            alert("Announcement created successfully!");
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to create announcement");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this announcement?")) return;
        try {
            await announcementsAPI.delete(id);
            setAnnouncements(announcements.filter((a: any) => a._id !== id));
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
                    <p className="text-muted-foreground">Manage and broadcast updates to the school community.</p>
                </div>
                <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> New Announcement
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                        <form onSubmit={handleCreate}>
                            <DialogHeader>
                                <DialogTitle>Create Announcement</DialogTitle>
                                <DialogDescription>
                                    Send a new update. You can choose to notify via Email or SMS.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        placeholder="e.g., Mid-Term Break Update"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="audience">Target Audience</Label>
                                    <Select
                                        value={formData.targetAudience}
                                        onValueChange={(val) => setFormData({ ...formData, targetAudience: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select audience" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Everyone</SelectItem>
                                            <SelectItem value="student">Students Only</SelectItem>
                                            <SelectItem value="parent">Parents Only</SelectItem>
                                            <SelectItem value="teacher">Teachers Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        required
                                        placeholder="Write your message here..."
                                        rows={5}
                                    />
                                </div>
                                <div className="flex flex-col gap-3 p-3 bg-muted/50 rounded-lg">
                                    <Label className="text-sm font-semibold mb-1">Notification Options</Label>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="email"
                                            checked={formData.sendViaEmail}
                                            onCheckedChange={(checked) => setFormData({ ...formData, sendViaEmail: checked as boolean })}
                                        />
                                        <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer font-normal">
                                            <Mail className="h-4 w-4" /> Send Email Notification
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="sms"
                                            checked={formData.sendViaSMS}
                                            onCheckedChange={(checked) => setFormData({ ...formData, sendViaSMS: checked as boolean })}
                                        />
                                        <Label htmlFor="sms" className="flex items-center gap-2 cursor-pointer font-normal">
                                            <MessageSquare className="h-4 w-4" /> Send SMS Notification (Termii)
                                        </Label>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? "Broadcasting..." : "Post Announcement"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading announcements...</div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {announcements.map((announcement: any) => (
                        <Card key={announcement._id} className="relative">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="line-clamp-1" title={announcement.title}>
                                            {announcement.title}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-2 text-xs">
                                            <span>{format(new Date(announcement.createdAt), "MMM d, yyyy")}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1 capitalize">
                                                <Users className="h-3 w-3" /> {announcement.targetAudience}
                                            </span>
                                        </CardDescription>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive hover:text-destructive/90 -mt-2 -mr-2"
                                        onClick={() => handleDelete(announcement._id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-foreground/80 line-clamp-3 whitespace-pre-wrap">
                                    {announcement.content}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                    {announcements.length === 0 && (
                        <div className="col-span-full text-center py-12 border-2 border-dashed rounded-lg">
                            <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium">No Announcements Yet</h3>
                            <p className="text-muted-foreground">create your first announcement to notify the school.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
