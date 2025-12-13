"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { parentAPI } from "@/services/api";
import { Loader2, User, GraduationCap, Calendar, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ParentChildrenPage() {
    const [children, setChildren] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data } = await parentAPI.getDashboard();
            setChildren(data.children || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Children</h1>
                <p className="text-muted-foreground">View profiles and details for your children.</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary h-8 w-8" /></div>
            ) : children.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground border rounded-lg bg-muted/20">
                    No students linked to this parent account.
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {children.map((child) => (
                        <Card key={child._id} className="hover:shadow-lg transition-shadow overflow-hidden">
                            <div className="h-2 bg-primary w-full" />
                            <CardHeader className="flex flex-row gap-4 items-center">
                                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground border-2 border-background shadow-sm">
                                    {child.name.charAt(0)}
                                </div>
                                <div>
                                    <CardTitle className="text-lg">{child.name}</CardTitle>
                                    <CardDescription>{child.class} • {child.studentId}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex flex-col gap-1 p-2 rounded bg-muted/30">
                                        <span className="text-muted-foreground flex items-center gap-1">
                                            <GraduationCap className="h-3 w-3" /> Average
                                        </span>
                                        <span className="font-semibold">{child.stats.averageScore || 'N/A'}%</span>
                                    </div>
                                    <div className="flex flex-col gap-1 p-2 rounded bg-muted/30">
                                        <span className="text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-3 w-3" /> Attendance
                                        </span>
                                        <span className="font-semibold">{child.stats.attendanceRate || '0'}%</span>
                                    </div>
                                </div>
                                <div className="border-t pt-4 mt-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Fee Status</span>
                                        <Badge variant={child.stats.feeBalance === 0 ? "default" : "destructive"}>
                                            {child.stats.feeBalance === 0 ? "Cleared" : "Outstanding"}
                                        </Badge>
                                    </div>
                                    <div className="text-2xl font-bold">
                                        {child.stats.feeBalance === 0 ? "PAID" : `₦${child.stats.feeBalance?.toLocaleString()}`}
                                    </div>
                                </div>
                                <Button className="w-full" variant="outline">View Full Profile</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
