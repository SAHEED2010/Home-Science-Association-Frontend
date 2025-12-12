"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MapPin, Phone, Mail, Send } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/register";
    const isDashboardPage = pathname?.startsWith("/admin") || pathname?.startsWith("/teacher") || pathname?.startsWith("/student") || pathname?.startsWith("/parent");

    // Hide footer on auth and dashboard pages
    if (isAuthPage || isDashboardPage) return null;

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            await axios.post("http://localhost:5000/api/subscribers", { email });
            setStatus("success");
            setMessage("Subscribed successfully!");
            setEmail("");
        } catch (error: any) {
            setStatus("error");
            setMessage(error.response?.data?.message || "Subscription failed. Please try again.");
        }
    };

    return (
        <footer className="bg-slate-950 text-slate-300 py-20 border-t border-slate-800">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid md:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 font-bold text-2xl text-white">
                            <span>HSA Primary</span>
                        </div>
                        <p className="text-sm leading-relaxed opacity-70">
                            Home Science Association Primary School. Dedicated to breeding total children who are academically sound and morally upright.
                        </p>

                        {/* Subscription Form */}
                        <div className="space-y-2">
                            <h4 className="font-semibold text-white text-sm">Subscribe to our Newsletter</h4>
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-slate-900 border-slate-800 text-white h-10 text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === "loading" || status === "success"}
                                />
                                <Button size="sm" type="submit" disabled={status === "loading" || status === "success"}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                            {message && (
                                <p className={`text-xs ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                                    {message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-6 text-lg">Quick Links</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14} /> About Us</Link></li>
                            <li><Link href="/admissions" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14} /> Admissions</Link></li>
                            <li><Link href="/academics" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14} /> Academics</Link></li>
                            <li><Link href="/portal" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14} /> Student Portal</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-6 text-lg">Contact Info</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <span>123 Education Street, Lagos, Nigeria</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span>+234 800 123 4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span>admissions@hsa.edu.ng</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-6 text-lg">Scan to Apply</h3>
                        <div className="bg-white p-2 rounded-xl w-fit mb-4">
                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://hsa-primary.edu.ng/register"
                                alt="Scan to Apply"
                                className="h-32 w-32"
                            />
                        </div>
                        <p className="text-sm opacity-70 max-w-[200px]">
                            Scan this QR code to access the admission form directly on your mobile device.
                        </p>
                    </div>
                </div>
                <div className="border-t border-slate-800 mt-16 pt-8 text-center text-sm opacity-60">
                    &copy; {new Date().getFullYear()} Home Science Association Primary School. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
