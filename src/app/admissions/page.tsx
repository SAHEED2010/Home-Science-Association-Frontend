"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FileText, UserCheck, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdmissionsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background py-20">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-primary/10 text-primary mb-4">
                        Join Our Family
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">Admission Process</h1>
                    <p className="text-xl text-muted-foreground">
                        We are delighted that you are considering HSA Primary for your child. Here is a simple guide to our admission procedure.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
                    <div className="space-y-12">
                        {[
                            {
                                step: 1,
                                title: "Purchase Application Form",
                                desc: "Forms can be purchased from the school administrative office or downloaded online.",
                                icon: FileText
                            },
                            {
                                step: 2,
                                title: "Submit Documents",
                                desc: "Submit completed form with 2 passport photographs, birth certificate, and last school report.",
                                icon: UserCheck
                            },
                            {
                                step: 3,
                                title: "Entrance Assessment",
                                desc: "Child will be scheduled for an age-appropriate assessment to determine placement.",
                                icon: CheckCircle2
                            },
                            {
                                step: 4,
                                title: "Admission Offer",
                                desc: "Successful candidates will receive a provisional letter of admission.",
                                icon: CreditCard
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex gap-6"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="flex flex-col items-center">
                                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/20">
                                        {item.step}
                                    </div>
                                    {i !== 3 && <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 my-2"></div>}
                                </div>
                                <div className="pb-8">
                                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground text-lg">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="bg-card p-8 rounded-3xl border shadow-xl sticky top-24"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold mb-6">Ready to Apply?</h3>
                        <p className="text-muted-foreground mb-8">
                            Start your application process today. Our admissions team is available to answer any questions you may have.
                        </p>
                        <div className="space-y-4">
                            <Link href="/register" className="block">
                                <Button size="lg" className="w-full h-12 text-lg rounded-xl">
                                    Apply Online <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="w-full h-12 text-lg rounded-xl">
                                Download Form (PDF)
                            </Button>
                        </div>
                        <div className="mt-8 pt-8 border-t">
                            <p className="font-bold mb-2">Admissions Office</p>
                            <p className="text-sm text-muted-foreground">Mon - Fri: 8:00 AM - 4:00 PM</p>
                            <p className="text-sm text-muted-foreground">+234 800 123 4567</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
