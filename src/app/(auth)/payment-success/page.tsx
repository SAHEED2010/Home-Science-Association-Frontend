"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push('/login');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-4">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="relative">
                    <div className="mx-auto h-24 w-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-bounce">
                        <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        Payment Successful! 🎉
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Your registration has been completed successfully.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border space-y-4">
                    <div className="flex items-start gap-3 text-left">
                        <Mail className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div className="space-y-1">
                            <h3 className="font-semibold">Check Your Email</h3>
                            <p className="text-sm text-muted-foreground">
                                We've sent your login credentials to your email address.
                                Please check your inbox (and spam folder) for your password.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 text-left">
                        <Lock className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                        <div className="space-y-1">
                            <h3 className="font-semibold">Login Instructions</h3>
                            <p className="text-sm text-muted-foreground">
                                Use your email and the password sent to you to log in to your account.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground">
                        Redirecting to login page in <span className="font-bold text-primary">{countdown}</span> seconds...
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            className="w-full sm:flex-1"
                            onClick={() => router.push('/login')}
                        >
                            Go to Login Now
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full sm:flex-1"
                            onClick={() => router.push('/')}
                        >
                            Back to Home
                        </Button>
                    </div>
                </div>

                <div className="pt-8 text-xs text-muted-foreground">
                    <p>
                        Need help? Contact us at{" "}
                        <a href="mailto:support@hsa.edu" className="text-primary hover:underline">
                            support@hsa.edu
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
