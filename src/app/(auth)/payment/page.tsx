"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { CreditCard, Calendar, Lock, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useEffect } from "react";

export default function PaymentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [registrationData, setRegistrationData] = useState<any>(null);
    const [cardData, setCardData] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardName: ""
    });

    useEffect(() => {
        // Get registration data from session storage
        const data = sessionStorage.getItem('registrationData');
        if (!data) {
            router.push('/register');
            return;
        }
        setRegistrationData(JSON.parse(data));
    }, [router]);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Mock payment verification
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Now register the user with payment confirmed
            const { data } = await api.post("/auth/register", {
                ...registrationData,
                paymentStatus: "completed"
            });

            // Clear session storage
            sessionStorage.removeItem('registrationData');

            // Redirect to success page
            router.push('/payment-success');

        } catch (err: any) {
            if (err.code === "ERR_NETWORK" || !err.response) {
                setError("No internet connection. Please check your network and try again.");
            } else {
                setError(err.response?.data?.message || "Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (!registrationData) {
        return null;
    }

    const getAmountByRole = (role: string) => {
        switch (role) {
            case "student": return "₦50,000";
            case "parent": return "₦5,000";
            case "teacher": return "₦10,000";
            default: return "₦50,000";
        }
    };

    return (
        <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
            {/* Left Side - Payment Info */}
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

                <div className="relative z-10 max-w-lg space-y-6">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Almost There!</h1>
                    <p className="text-lg opacity-90">
                        Complete your payment to finalize your registration. Your login credentials will be sent to your email.
                    </p>

                    <div className="bg-white/10 rounded-lg p-6 space-y-4">
                        <h3 className="font-semibold text-xl">Registration Summary</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="opacity-80">Name:</span>
                                <span className="font-medium">{registrationData?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-80">Email:</span>
                                <span className="font-medium">{registrationData?.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-80">Branch:</span>
                                <span className="font-medium">{registrationData?.branch}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-80">Role:</span>
                                <span className="font-medium capitalize">{registrationData?.role}</span>
                            </div>
                            <div className="border-t border-white/20 pt-2 mt-2">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Amount:</span>
                                    <span>{getAmountByRole(registrationData?.role)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm opacity-70">
                    &copy; {new Date().getFullYear()} Home Science Association
                </div>
            </div>

            {/* Right Side - Payment Form */}
            <div className="flex items-center justify-center py-8 px-4 sm:py-12 sm:px-6 lg:px-8 bg-background min-h-screen lg:min-h-0">
                <div className="mx-auto w-full max-w-md space-y-6 sm:space-y-8">
                    <div className="lg:hidden text-center mb-6 sm:mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl sm:text-2xl text-primary">
                            <span>HSA Portal</span>
                        </Link>
                    </div>

                    <div className="space-y-2 text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Payment</h2>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            This is a mock payment. Use any card details.
                        </p>
                    </div>

                    {/* Mobile Summary */}
                    <div className="lg:hidden bg-secondary/10 rounded-lg p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount to Pay:</span>
                            <span className="font-bold text-lg">{getAmountByRole(registrationData?.role)}</span>
                        </div>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="cardName">Cardholder Name</Label>
                            <div className="relative">
                                <Input
                                    id="cardName"
                                    placeholder="John Doe"
                                    value={cardData.cardName}
                                    onChange={(e) => setCardData({ ...cardData, cardName: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    className="pl-9"
                                    maxLength={19}
                                    value={cardData.cardNumber}
                                    onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="expiryDate"
                                        placeholder="MM/YY"
                                        className="pl-9"
                                        maxLength={5}
                                        value={cardData.expiryDate}
                                        onChange={(e) => setCardData({ ...cardData, expiryDate: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="cvv"
                                        placeholder="123"
                                        type="password"
                                        className="pl-9"
                                        maxLength={3}
                                        value={cardData.cvv}
                                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                <CheckCircle className="inline-block w-4 h-4 mr-2" />
                                This is a mock payment for testing. Any card details will work.
                            </p>
                        </div>

                        <Button className="w-full h-11 sm:h-12 text-base" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                                    Processing Payment...
                                </>
                            ) : (
                                `Pay ${getAmountByRole(registrationData?.role)}`
                            )}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-muted-foreground">
                        <Link href="/register" className="font-semibold text-primary hover:underline">
                            ← Back to Registration
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
