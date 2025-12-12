"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background py-20">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 mb-4">
                        <Calendar className="mr-2 h-3 w-3" /> News & Events
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">Latest Updates</h1>
                    <p className="text-xl text-muted-foreground">
                        Keep up with the latest happenings, announcements, and upcoming events at HSA Primary.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            date: "Oct 15, 2024",
                            title: "Annual Science Exhibition 2024",
                            desc: "Join us as our young scientists showcase their innovative projects and experiments. Parents are welcome to visit from 10 AM.",
                            image: "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80",
                            author: "Science Dept"
                        },
                        {
                            date: "Oct 22, 2024",
                            title: "Cultural Day Celebration",
                            desc: "A colorful display of our rich heritage through dance, food, and fashion. Students are encouraged to wear traditional attire.",
                            image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80",
                            author: "Social Committee"
                        },
                        {
                            date: "Nov 01, 2024",
                            title: "Entrance Examination - Batch A",
                            desc: "The first batch of entrance exams for the 2024/2025 academic session will take place at the school main hall.",
                            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
                            author: "Admissions"
                        },
                        {
                            date: "Nov 15, 2024",
                            title: "Inter-House Sports Competition",
                            desc: "Get ready for a day of athletic excellence and team spirit. Which house will take home the trophy this year?",
                            image: "https://images.unsplash.com/photo-1561912774-79769a0a0a7a?auto=format&fit=crop&q=80",
                            author: "Sports Dept"
                        },
                        {
                            date: "Dec 10, 2024",
                            title: "Christmas Carol Service",
                            desc: "Celebrate the festive season with our annual carol service featuring the school choir and drama club.",
                            image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80",
                            author: "Music Dept"
                        },
                        {
                            date: "Jan 08, 2025",
                            title: "Resumption for 2nd Term",
                            desc: "School resumes for the second term of the 2024/2025 academic session. Boarders are expected to return on Jan 7th.",
                            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80",
                            author: "Admin"
                        }
                    ].map((news, i) => (
                        <motion.div
                            key={i}
                            className="bg-card rounded-3xl overflow-hidden border shadow-sm hover:shadow-md transition-all group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${news.image})` }}></div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {news.date}</span>
                                    <span className="flex items-center gap-1"><User size={12} /> {news.author}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{news.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    {news.desc}
                                </p>
                                <Button variant="link" className="p-0 h-auto text-primary gap-2">
                                    Read More <ArrowRight size={14} />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
