"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Building2, Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [branch, setBranch] = useState("Main");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data } = await api.post("/auth/login", { email, password, branch });
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));

            // Redirect based on role
            if (data.role === "admin") router.push("/admin");
            else if (data.role === "teacher") router.push("/teacher");
            else if (data.role === "student") router.push("/student");
            else if (data.role === "parent") router.push("/parent");
            else router.push("/");

        } catch (err: any) {
            if (err.code === "ERR_NETWORK" || !err.response) {
                setError("No internet connection. Please check your network and try again.");
            } else {
                setError(err.response?.data?.message || "Login failed. Please check your credentials.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
            {/* Left Side - Hero/Welcome */}
            <div className="hidden lg:flex flex-col justify-between bg-primary p-10 text-primary-foreground relative overflow-hidden">
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
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Welcome Back!</h1>
                    <p className="text-lg opacity-90 mb-8">
                        "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
                    </p>
                    <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-2xl">
                        <Image
                            src="/images/login-hero.jpg"
                            alt="Students learning together"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                <div className="relative z-10 text-sm opacity-70">
                    &copy; {new Date().getFullYear()} Home Science Association
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center py-8 px-4 sm:py-12 sm:px-6 lg:px-8 bg-background min-h-screen lg:min-h-0">
                <div className="mx-auto w-full max-w-md space-y-6 sm:space-y-8">
                    <div className="lg:hidden text-center mb-6 sm:mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl sm:text-2xl text-primary">
                            <span>HSA Portal</span>
                        </Link>
                    </div>

                    <div className="space-y-2 text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Sign in to your account</h2>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Enter your credentials below to access your dashboard
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="branch">Branch</Label>
                            <Select value={branch} onValueChange={setBranch}>
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
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    placeholder="m@example.com"
                                    type="email"
                                    className="pl-9"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    suppressHydrationWarning
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={passwordVisible ? "text" : "password"}
                                    className="pl-9 pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    suppressHydrationWarning
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute right-3 top-3 text-muted-foreground hover:text-primary focus:outline-none"
                                >
                                    {passwordVisible ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button className="w-full h-11 sm:h-12 text-base" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    <div className="text-center text-sm sm:text-base text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="font-semibold text-primary hover:underline">
                            Apply Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
