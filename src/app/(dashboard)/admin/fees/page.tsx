"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { paymentsAPI, studentsAPI } from "@/services/api";
import { Plus, Search, CreditCard, Banknote, Download, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function FeesPage() {
    const [payments, setPayments] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createOpen, setCreateOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        studentId: "",
        type: "Tuition Fee",
        amount: "",
        status: "Paid",
        paymentMethod: "Cash",
        date: new Date().toISOString().split('T')[0],
        term: "First Term",
        academicYear: "2023/2024"
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [paymentsRes, studentsRes] = await Promise.all([
                paymentsAPI.getAll(),
                studentsAPI.getAll()
            ]);
            setPayments(paymentsRes.data);
            setStudents(studentsRes.data);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateWrapper = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // Convert amount to number
            const payload = {
                ...formData,
                amount: parseFloat(formData.amount)
            };
            await paymentsAPI.create(payload);
            setCreateOpen(false);
            setFormData({
                studentId: "",
                type: "Tuition Fee",
                amount: "",
                status: "Paid",
                paymentMethod: "Cash",
                date: new Date().toISOString().split('T')[0],
                term: "First Term",
                academicYear: "2023/2024"
            });
            fetchData();
            alert("Payment recorded successfully & Receipt sent!");
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to record payment");
        } finally {
            setSubmitting(false);
        }
    };

    // Calculate Stats
    const totalCollected = payments.reduce((acc: number, curr: any) => acc + (curr.amountNumber || 0), 0);
    const recentTransactions = payments.slice(0, 10); // Show last 10

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Fees & Payments</h2>
                    <p className="text-muted-foreground">Track revenue and manage student fees.</p>
                </div>
                <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Record Payment
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleCreateWrapper}>
                            <DialogHeader>
                                <DialogTitle>Record New Transaction</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label>Student</Label>
                                    <Select onValueChange={val => setFormData({ ...formData, studentId: val })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Search student..." />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px]">
                                            {students.map((s: any) => (
                                                <SelectItem key={s._id} value={s._id}>
                                                    {s.name} ({s.admissionNumber})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Fee Type</Label>
                                        <Select onValueChange={val => setFormData({ ...formData, type: val })} defaultValue="Tuition Fee">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
                                                <SelectItem value="Uniform Fee">Uniform Fee</SelectItem>
                                                <SelectItem value="Transport Fee">Transport Fee</SelectItem>
                                                <SelectItem value="Books">Books/Materials</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Amount (₦)</Label>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            value={formData.amount}
                                            onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Status</Label>
                                        <Select onValueChange={val => setFormData({ ...formData, status: val })} defaultValue="Paid">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Paid">Paid</SelectItem>
                                                <SelectItem value="Partial">Partial Deposit</SelectItem>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Method</Label>
                                        <Select onValueChange={val => setFormData({ ...formData, paymentMethod: val })} defaultValue="Cash">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Cash">Cash</SelectItem>
                                                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                                <SelectItem value="Card">Card / POS</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input
                                        type="date"
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" disabled={submitting}>
                                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Transaction
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <Banknote className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalCollected)}</div>
                        <p className="text-xs text-muted-foreground">All time collected</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{payments.length}</div>
                        <p className="text-xs text-muted-foreground">Total records found</p>
                    </CardContent>
                </Card>
            </div>

            {/* Transactions Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>A list of recent fee payments.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-4">Loading transactions...</div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Invoice ID</TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentTransactions.map((payment: any) => (
                                        <TableRow key={payment._id}>
                                            <TableCell className="font-medium">{payment.invoiceId}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span>{payment.student?.name || 'Unknown'}</span>
                                                    <span className="text-xs text-muted-foreground">{payment.student?.admissionNumber}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{payment.type}</TableCell>
                                            <TableCell>{format(new Date(payment.date), "MMM d, yyyy")}</TableCell>
                                            <TableCell>
                                                <Badge variant={payment.status === 'Paid' ? 'default' : 'secondary'}>
                                                    {payment.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-medium">
                                                {formatCurrency(payment.amountNumber)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {recentTransactions.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                No transactions found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
