"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, UserPlus, Mail, Phone, MapPin, Calendar, Users } from "lucide-react";
import Link from "next/link";
import { studentsAPI, classesAPI } from "@/services/api";

export default function AddStudentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState<any[]>([]);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        studentId: "",
        classId: "",
        dob: "",
        gender: "",
        address: "",
        phone: "",
        guardianName: "",
        guardianEmail: "",
        guardianPhone: "",
        branch: "Main",
    });

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await classesAPI.getAll();
            setClasses(response.data);
        } catch (err) {
            console.error("Error fetching classes:", err);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await studentsAPI.create(formData);

            alert(response.data.message || "Student and parent accounts created successfully!");
            router.push("/admin/students");
        } catch (err: any) {
            console.error("Error creating student:", err);
            setError(err.response?.data?.message || "Failed to create student. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/students">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Add New Student</h1>
                    <p className="text-muted-foreground">
                        Student and parent accounts will be created automatically
                    </p>
                </div>
            </div>

            {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Student Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserPlus className="h-5 w-5" />
                                Student Information
                            </CardTitle>
                            <CardDescription>Basic details about the student</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Full Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="e.g., Chinedu Okafor"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        className="pl-9"
                                        placeholder="student@email.com"
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        required
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Login credentials will be sent to this email
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="studentId">
                                    Student ID <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="studentId"
                                    placeholder="e.g., STU-2024-001"
                                    value={formData.studentId}
                                    onChange={(e) => handleChange("studentId", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="dob"
                                            type="date"
                                            className="pl-9"
                                            value={formData.dob}
                                            onChange={(e) => handleChange("dob", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="classId">Assign to Class</Label>
                                <Select value={formData.classId} onValueChange={(value) => handleChange("classId", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select class (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classes.map((cls) => (
                                            <SelectItem key={cls._id} value={cls._id}>
                                                {cls.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        className="pl-9"
                                        placeholder="+234 801 234 5678"
                                        value={formData.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="address"
                                        className="pl-9"
                                        placeholder="123 Street, City, State"
                                        value={formData.address}
                                        onChange={(e) => handleChange("address", e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Parent/Guardian Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Parent/Guardian Information
                            </CardTitle>
                            <CardDescription>
                                Parent account will be created automatically
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="guardianName">
                                    Parent/Guardian Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="guardianName"
                                    placeholder="e.g., Mr. Emmanuel Okafor"
                                    value={formData.guardianName}
                                    onChange={(e) => handleChange("guardianName", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="guardianEmail">
                                    Parent Email <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="guardianEmail"
                                        type="email"
                                        className="pl-9"
                                        placeholder="parent@email.com"
                                        value={formData.guardianEmail}
                                        onChange={(e) => handleChange("guardianEmail", e.target.value)}
                                        required
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Login credentials will be sent to this email
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="guardianPhone">Parent Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="guardianPhone"
                                        type="tel"
                                        className="pl-9"
                                        placeholder="+234 802 345 6789"
                                        value={formData.guardianPhone}
                                        onChange={(e) => handleChange("guardianPhone", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="branch">Branch</Label>
                                <Select value={formData.branch} onValueChange={(value) => handleChange("branch", value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Main">Main Branch</SelectItem>
                                        <SelectItem value="Lekki">Lekki Branch</SelectItem>
                                        <SelectItem value="Abuja">Abuja Branch</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="bg-primary/10 p-4 rounded-lg space-y-2">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    Automatic Account Creation
                                </h4>
                                <ul className="text-xs text-muted-foreground space-y-1">
                                    <li>✓ Parent account created automatically</li>
                                    <li>✓ Login credentials sent via email</li>
                                    <li>✓ Parent can monitor student progress</li>
                                    <li>✓ Secure password auto-generated</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <Link href="/admin/students">
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </Link>
                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Accounts...
                            </>
                        ) : (
                            <>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Create Student & Parent
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
