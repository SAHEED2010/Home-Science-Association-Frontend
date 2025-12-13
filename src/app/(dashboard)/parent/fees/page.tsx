"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { parentAPI } from "@/services/api";
import { Loader2, CreditCard, History, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ParentFeesPage() {
    const [children, setChildren] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedChildFee, setSelectedChildFee] = useState<any>(null);

    // Payment State
    const [payOpen, setPayOpen] = useState(false);
    const [payLoading, setPayLoading] = useState(false);
    const [amount, setAmount] = useState("");

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

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault();
        setPayLoading(true);
        // Simulate API call
        setTimeout(() => {
            setPayLoading(false);
            setPayOpen(false);
            alert("Payment successful! Receipt sent to email.");
            // Ideally refresh data here
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Fees & Payments</h1>
                <p className="text-muted-foreground">Manage school fees for your children.</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8" /></div>
            ) : children.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">No students linked to this account.</div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {children.map((child) => (
                        <Card key={child._id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>{child.name}</CardTitle>
                                        <CardDescription>{child.class} • {child.studentId}</CardDescription>
                                    </div>
                                    <Badge variant={child.stats.feeBalance === 0 ? "default" : "destructive"}>
                                        {child.stats.feeBalance === 0 ? "Paid" : "Outstanding"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <div className="p-4 bg-muted rounded-lg space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Total Fees:</span>
                                        <span className="font-medium">₦{child.stats.feeTotal?.toLocaleString() || '0'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Paid:</span>
                                        <span>₦{child.stats.feePaid?.toLocaleString() || '0'}</span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                                        <span>Balance:</span>
                                        <span className={child.stats.feeBalance > 0 ? "text-red-600" : "text-green-600"}>
                                            ₦{child.stats.feeBalance?.toLocaleString() || '0'}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Dialog open={payOpen} onOpenChange={setPayOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="w-full" disabled={child.stats.feeBalance === 0} onClick={() => setAmount(child.stats.feeBalance.toString())}>
                                            <CreditCard className="mr-2 h-4 w-4" />
                                            {child.stats.feeBalance === 0 ? "No Due Fees" : "Pay Balance"}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Make Payment</DialogTitle>
                                            <DialogDescription>Pay fees for {child.name}</DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handlePay} className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label>Amount (₦)</Label>
                                                <Input
                                                    value={amount}
                                                    onChange={e => setAmount(e.target.value)}
                                                    type="number"
                                                    required
                                                />
                                            </div>
                                            <div className="p-4 bg-blue-50 text-blue-800 text-sm rounded-md flex gap-2">
                                                <AlertCircle className="h-5 w-5 shrink-0" />
                                                This is a secure mock payment gateway. No real money will be deducted.
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" disabled={payLoading}>
                                                    {payLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Process Payment"}
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
