"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPIS, RECENT_ACTIVITIES } from "@/lib/data";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from "recharts";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { announcementsAPI } from "@/services/api";

const data = [
    { name: "Jan", students: 400, attendance: 240 },
    { name: "Feb", students: 300, attendance: 139 },
    { name: "Mar", students: 200, attendance: 980 },
    { name: "Apr", students: 278, attendance: 390 },
    { name: "May", students: 189, attendance: 480 },
    { name: "Jun", students: 239, attendance: 380 },
    { name: "Jul", students: 349, attendance: 430 },
];

export default function AdminDashboard() {
    const [announcementOpen, setAnnouncementOpen] = useState(false);
    const [announcement, setAnnouncement] = useState({
        title: "",
        content: "",
        audience: "All",
        author: "Admin"
    });
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("Admin");

    useState(() => {
        // Hydrate user name safely
        if (typeof window !== 'undefined') {
            try {
                const userStr = localStorage.getItem("user");
                if (userStr) {
                    const user = JSON.parse(userStr);
                    if (user.name) {
                        setUserName(user.name.split(" ")[0]); // First name
                    }
                }
            } catch (e) {
                console.error("Failed to parse user");
            }
        }
    });

    const handleCreateAnnouncement = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await announcementsAPI.create(announcement);
            setAnnouncementOpen(false);
            setAnnouncement({ title: "", content: "", audience: "All", author: "Admin" });
            alert("Announcement created successfully!");
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to create announcement");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadReport = () => {
        // Create a simple CSV report
        const csvContent = `HSA Portal - Dashboard Report\nGenerated: ${new Date().toLocaleDateString()}\n\n` +
            `Total Students,${KPIS[0].value}\n` +
            `Total Teachers,${KPIS[1].value}\n` +
            `Attendance Today,${KPIS[2].value}\n` +
            `Revenue (Term),${KPIS[3].value}\n`;

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hsa-report-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}!</h1>
                    <p className="text-muted-foreground">Dashboard Overview</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleDownloadReport}>Download Report</Button>

                    <Dialog open={announcementOpen} onOpenChange={setAnnouncementOpen}>
                        <DialogTrigger asChild>
                            <Button>Create Announcement</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Create New Announcement</DialogTitle>
                                <DialogDescription>
                                    Send an announcement to students, teachers, or parents.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateAnnouncement}>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="Announcement title"
                                            value={announcement.title}
                                            onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="content">Message</Label>
                                        <textarea
                                            id="content"
                                            className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            placeholder="Type your announcement here..."
                                            value={announcement.content}
                                            onChange={(e) => setAnnouncement({ ...announcement, content: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="audience">Audience</Label>
                                        <Select
                                            value={announcement.audience}
                                            onValueChange={(value) => setAnnouncement({ ...announcement, audience: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select audience" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All</SelectItem>
                                                <SelectItem value="Students">Students Only</SelectItem>
                                                <SelectItem value="Teachers">Teachers Only</SelectItem>
                                                <SelectItem value="Parents">Parents Only</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setAnnouncementOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            "Create Announcement"
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {KPIS.map((kpi, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {kpi.label}
                            </CardTitle>
                            {/* We would render the icon dynamically here if needed, keeping it simple for now */}
                            <div className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                                {kpi.change.startsWith("+") ? (
                                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                                ) : (
                                    <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                                )}
                                <span className={kpi.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                                    {kpi.change}
                                </span>
                                <span className="ml-1">from last month</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Main Chart */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Attendance & Enrollment Trends</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis dataKey="name" className="text-xs" />
                                    <YAxis className="text-xs" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                    />
                                    <Bar dataKey="students" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="attendance" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {RECENT_ACTIVITIES.map((activity) => (
                                <div key={activity.id} className="flex items-center">
                                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                        {activity.user[0]}
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {activity.user === "Chinedu Okafor" ? "Student" : activity.user}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.action} <span className="text-primary">{activity.target}</span>
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs text-muted-foreground">
                                        {activity.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
