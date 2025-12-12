"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, Bell, Eye, EyeOff, Shield, Mail, Phone, MapPin, Calendar } from "lucide-react";

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    // Mock user data - replace with real data from context/API
    const [profile, setProfile] = useState({
        name: "Dr. Adewale Johnson",
        email: "admin@hsa.edu.ng",
        phone: "+234 801 234 5678",
        role: "Principal",
        branch: "Main Branch",
        address: "123 Education Road, Lagos",
        joinDate: "January 2020",
    });

    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // TODO: Implement API call to update profile
        setTimeout(() => {
            setLoading(false);
            alert("Profile updated successfully!");
        }, 1000);
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert("New passwords don't match!");
            return;
        }
        setLoading(true);
        // TODO: Implement API call to change password
        setTimeout(() => {
            setLoading(false);
            setPasswords({ current: "", new: "", confirm: "" });
            alert("Password changed successfully!");
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="security">
                        <Lock className="mr-2 h-4 w-4" />
                        Security
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleProfileUpdate} className="space-y-4">
                                <div className="flex items-center gap-4 mb-6">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src="" />
                                        <AvatarFallback className="text-2xl">
                                            {profile.name.split(" ").map(n => n[0]).join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <Button type="button" variant="outline" size="sm">
                                            Change Photo
                                        </Button>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            JPG, PNG or GIF. Max size 2MB.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                type="email"
                                                className="pl-9"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="phone"
                                                className="pl-9"
                                                value={profile.phone}
                                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="role">Role</Label>
                                        <Input id="role" value={profile.role} disabled />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="branch">Branch</Label>
                                        <Input id="branch" value={profile.branch} disabled />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="joinDate">Join Date</Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input id="joinDate" className="pl-9" value={profile.joinDate} disabled />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="address"
                                            className="pl-9"
                                            value={profile.address}
                                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={loading}>
                                        {loading ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Update your password to keep your account secure.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current">Current Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="current"
                                            type={passwordVisibility.current ? "text" : "password"}
                                            value={passwords.current}
                                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                            className="pr-10"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setPasswordVisibility((prev) => ({
                                                    ...prev,
                                                    current: !prev.current,
                                                }))
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary focus:outline-none"
                                        >
                                            {passwordVisibility.current ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new">New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="new"
                                            type={passwordVisibility.new ? "text" : "password"}
                                            value={passwords.new}
                                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                            className="pr-10"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setPasswordVisibility((prev) => ({
                                                    ...prev,
                                                    new: !prev.new,
                                                }))
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary focus:outline-none"
                                        >
                                            {passwordVisibility.new ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Must be at least 8 characters with letters and numbers
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirm">Confirm New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirm"
                                            type={passwordVisibility.confirm ? "text" : "password"}
                                            value={passwords.confirm}
                                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                            className="pr-10"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setPasswordVisibility((prev) => ({
                                                    ...prev,
                                                    confirm: !prev.confirm,
                                                }))
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary focus:outline-none"
                                        >
                                            {passwordVisibility.confirm ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={loading}>
                                        {loading ? "Changing..." : "Change Password"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Two-Factor Authentication</CardTitle>
                            <CardDescription>Add an extra layer of security to your account.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Enable 2FA</p>
                                    <p className="text-sm text-muted-foreground">
                                        Protect your account with an additional verification step
                                    </p>
                                </div>
                                <Button variant="outline">Setup</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>Configure when and how you receive email notifications.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">New Enrollments</p>
                                    <p className="text-sm text-muted-foreground">Get notified when new students enroll</p>
                                </div>
                                <input type="checkbox" defaultChecked className="h-4 w-4" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Attendance Reports</p>
                                    <p className="text-sm text-muted-foreground">Daily attendance summary emails</p>
                                </div>
                                <input type="checkbox" defaultChecked className="h-4 w-4" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Payment Alerts</p>
                                    <p className="text-sm text-muted-foreground">Notifications for fee payments</p>
                                </div>
                                <input type="checkbox" defaultChecked className="h-4 w-4" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">System Updates</p>
                                    <p className="text-sm text-muted-foreground">Important platform updates and announcements</p>
                                </div>
                                <input type="checkbox" className="h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
