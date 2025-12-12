import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <main className="flex-1">
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-6 lg:px-12 text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">Get in Touch</h1>
                        <p className="text-lg opacity-90 max-w-2xl mx-auto">
                            Have questions about admissions, academics, or anything else? We're here to help.
                        </p>
                    </div>
                </section>

                <section className="py-20 bg-background">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Contact Info */}
                            <div className="space-y-8">
                                <div className="bg-card p-8 rounded-2xl border shadow-sm space-y-6">
                                    <h2 className="text-2xl font-bold">Contact Information</h2>

                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">School Address</h3>
                                            <p className="text-muted-foreground">5, Ruxton Road, Ikoyi, Lagos, Nigeria.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Phone Number</h3>
                                            <p className="text-muted-foreground">+234 800 123 4567, +234 800 987 6543</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Email Address</h3>
                                            <p className="text-muted-foreground">info@hsa.edu.ng, admissions@hsa.edu.ng</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Office Hours</h3>
                                            <p className="text-muted-foreground">Mon - Fri: 8:00 AM - 4:00 PM</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Map Placeholder */}
                                <div className="h-64 bg-muted rounded-2xl border flex items-center justify-center text-muted-foreground">
                                    <p>Google Map Integration Placeholder</p>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="bg-card p-8 rounded-2xl border shadow-lg">
                                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="Doe" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                            <option>General Inquiry</option>
                                            <option>Admissions</option>
                                            <option>Fees & Payments</option>
                                            <option>Report an Issue</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <textarea
                                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="How can we help you?"
                                        ></textarea>
                                    </div>

                                    <Button className="w-full h-12 text-lg">
                                        <Send className="mr-2 h-4 w-4" /> Send Message
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
