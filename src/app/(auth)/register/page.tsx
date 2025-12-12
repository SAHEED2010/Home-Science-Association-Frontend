"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { Mail, User, Phone, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "student",
        branch: "Main"
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Store registration data in session storage for payment page
            sessionStorage.setItem('registrationData', JSON.stringify(formData));

            // Redirect to payment page
            router.push('/payment');

        } catch (err: any) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
            {/* Left Side - Hero/Welcome */}
            <div className="hidden lg:flex flex-col justify-between bg-secondary p-10 text-secondary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
                        <div className="relative h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <span className="text-white">H</span>
                        </div>
                        <span>HSA Portal</span>
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Join Our Community</h1>
                    <p className="text-lg opacity-90">
                        "Start your journey towards academic excellence. Apply today and become part of the HSA family."
                    </p>
                </div>

                <div className="relative z-10 text-sm opacity-70">
                    &copy; {new Date().getFullYear()} Home Science Association
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="flex items-center justify-center py-8 px-4 sm:py-12 sm:px-6 lg:px-8 bg-background min-h-screen lg:min-h-0">
                <div className="mx-auto w-full max-w-md space-y-6 sm:space-y-8">
                    <div className="lg:hidden text-center mb-6 sm:mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl sm:text-2xl text-primary">
                            <span>HSA Portal</span>
                        </Link>
                    </div>

                    <div className="space-y-2 text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Create an account</h2>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Start your admission process. Your login password will be sent to your email.
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    className="pl-9"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    placeholder="m@example.com"
                                    type="email"
                                    className="pl-9"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="phone"
                                    placeholder="080..."
                                    type="tel"
                                    className="pl-9"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="branch">Branch</Label>
                            <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Branch" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Main">Main Branch</SelectItem>
                                    <SelectItem value="Lekki">Lekki Branch</SelectItem>
                                    <SelectItem value="Abuja">Abuja Branch</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">I am a...</Label>
                            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">Student (Admission)</SelectItem>
                                    <SelectItem value="parent">Parent / Guardian</SelectItem>
                                    <SelectItem value="teacher">Teacher (Staff)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button className="w-full h-11 sm:h-12 text-base" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Continue to Payment"
                            )}
                        </Button>
                    </form>

                    <div className="text-center text-sm sm:text-base text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-primary hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
