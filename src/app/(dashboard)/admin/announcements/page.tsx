"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ANNOUNCEMENTS } from "@/lib/data";
import { Plus, Megaphone, Calendar, User, Users, Trash2, Edit } from "lucide-react";
import Link from "next/link";

export default function AnnouncementsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
                    <p className="text-muted-foreground">Broadcast messages to the school community.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Announcement
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {ANNOUNCEMENTS.map((item) => (
                    <Card key={item.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <Megaphone className="h-5 w-5 text-primary" />
                                        {item.title}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-2">
                                        <Calendar className="h-3 w-3" /> {item.date}
                                    </CardDescription>
                                </div>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.audience === "All" ? "bg-blue-100 text-blue-800" :
                                        item.audience === "Parents" ? "bg-purple-100 text-purple-800" :
                                            item.audience === "Students" ? "bg-green-100 text-green-800" :
                                                "bg-orange-100 text-orange-800"
                                    }`}>
                                    {item.audience}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-muted-foreground leading-relaxed">
                                {item.content}
                            </p>
                        </CardContent>
                        <CardFooter className="border-t pt-4 flex justify-between items-center text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>Posted by {item.author}</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
