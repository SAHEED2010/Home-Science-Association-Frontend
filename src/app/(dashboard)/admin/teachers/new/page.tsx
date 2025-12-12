"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function AddTeacherPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/teachers">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Add New Teacher</h1>
                    <p className="text-muted-foreground">Onboard a new staff member.</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Staff Details</CardTitle>
                        <CardDescription>Personal and contact information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" placeholder="Enter first name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" placeholder="Enter last name" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Official Email</Label>
                            <Input id="email" type="email" placeholder="teacher@hsa.edu.ng" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="080..." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="qualification">Qualification</Label>
                            <Input id="qualification" placeholder="e.g. B.Ed, MSc" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Teaching Assignment</CardTitle>
                        <CardDescription>Subjects and classes assigned.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="subject">Main Subject</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option value="">Select subject</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="English">English</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Biology">Biology</option>
                                <option value="Economics">Economics</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label>Assigned Classes (Multi-select)</Label>
                            <div className="grid grid-cols-2 gap-2 border rounded-md p-4">
                                {["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"].map((cls) => (
                                    <div key={cls} className="flex items-center space-x-2">
                                        <input type="checkbox" id={`class-${cls}`} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                        <label htmlFor={`class-${cls}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            {cls}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option value="Teacher">Class Teacher</option>
                                <option value="HOD">Head of Department</option>
                                <option value="Admin">Admin Staff</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end gap-4">
                <Link href="/admin/teachers">
                    <Button variant="outline">Cancel</Button>
                </Link>
                <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Teacher
                </Button>
            </div>
        </div>
    );
}
