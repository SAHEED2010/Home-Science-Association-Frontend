"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PAYMENTS } from "@/lib/data";
import { Plus, CreditCard, Download, Filter, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function FeesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Fees & Payments</h1>
                    <p className="text-muted-foreground">Manage student fees, invoices, and payment history.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Generate Invoice
                    </Button>
                </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue (Term)</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦45,250,000</div>
                        <p className="text-xs text-muted-foreground">+12% from last term</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦3,450,000</div>
                        <p className="text-xs text-muted-foreground">25 invoices pending</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overdue Payments</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦850,000</div>
                        <p className="text-xs text-muted-foreground">8 invoices overdue</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Recent Transactions</CardTitle>
                            <CardDescription>Latest fee payments and invoices generated.</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground">
                                <tr>
                                    <th className="h-12 px-4 font-medium">Invoice ID</th>
                                    <th className="h-12 px-4 font-medium">Student</th>
                                    <th className="h-12 px-4 font-medium">Type</th>
                                    <th className="h-12 px-4 font-medium">Date</th>
                                    <th className="h-12 px-4 font-medium">Amount</th>
                                    <th className="h-12 px-4 font-medium">Status</th>
                                    <th className="h-12 px-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PAYMENTS.map((payment, i) => (
                                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                        <td className="p-4 font-medium">{payment.id}</td>
                                        <td className="p-4">{payment.student}</td>
                                        <td className="p-4">{payment.type}</td>
                                        <td className="p-4 text-muted-foreground">{payment.date}</td>
                                        <td className="p-4 font-medium">{payment.amount}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${payment.status === "Paid" ? "bg-green-100 text-green-800" :
                                                    payment.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                                        "bg-red-100 text-red-800"
                                                }`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button variant="ghost" size="sm">View</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
