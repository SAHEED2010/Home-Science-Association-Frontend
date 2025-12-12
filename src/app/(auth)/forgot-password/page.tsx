"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="mb-8 flex flex-col items-center gap-2">
                <div className="relative h-16 w-16">
                    <Image
                        src="/images/logo.png"
                        alt="HSA Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <h1 className="text-2xl font-bold text-primary">HSA Portal</h1>
            </div>

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your email address and we'll send you a link to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full">Send Reset Link</Button>
                    <Link href="/login" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Login
                    </Link>
                </CardFooter>
            </Card>

            <footer className="mt-8 text-center text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Home Science Association. All rights reserved.
            </footer>
        </div>
    );
}
