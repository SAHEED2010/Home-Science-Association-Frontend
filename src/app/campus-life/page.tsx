"use client";

import { motion } from "framer-motion";
import { Camera, Music, BookOpen, Users } from "lucide-react";

export default function CampusLifePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-background py-20">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 mb-4">
                        <Camera className="mr-2 h-3 w-3" /> Campus Gallery
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">Life at HSA</h1>
                    <p className="text-xl text-muted-foreground">
                        Experience the vibrant community and diverse activities that make our school a home away from home.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="md:col-span-2 space-y-8">
                        <motion.div
                            className="relative h-[400px] rounded-3xl overflow-hidden group"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 text-white">
                                <h3 className="text-3xl font-bold mb-2">Interactive Learning</h3>
                                <p className="text-lg opacity-90">Modern classrooms equipped for digital age education.</p>
                            </div>
                        </motion.div>
                        <div className="grid grid-cols-2 gap-8">
                            <motion.div
                                className="relative h-[300px] rounded-3xl overflow-hidden group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-xl font-bold">Music & Arts</h3>
                                </div>
                            </motion.div>
                            <motion.div
                                className="relative h-[300px] rounded-3xl overflow-hidden group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-xl font-bold">Sports Academy</h3>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <motion.div
                            className="relative h-[300px] rounded-3xl overflow-hidden group"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-xl font-bold">Field Trips</h3>
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative h-[400px] rounded-3xl overflow-hidden group"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529390003868-6c01d73923f8?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">Community Service</h3>
                                <p className="opacity-90">Building character through giving back.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">A Day in the Life</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            From the morning assembly to the final bell, every moment at HSA Primary is designed to be engaging and enriching.
                            Our schedule balances rigorous academic sessions with ample time for play, creative expression, and social interaction.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Morning Assembly & Moral Instruction",
                                "Interactive Core Subject Lessons",
                                "Creative Arts & Music Workshops",
                                "Sports & Physical Education",
                                "Club Activities (Coding, Chess, Drama)"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4 mt-8">
                            <div className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-800 bg-[url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                            <div className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-800 bg-[url('https://images.unsplash.com/photo-1427504746696-ea5abd7dfe8b?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                        </div>
                        <div className="space-y-4">
                            <div className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-800 bg-[url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                            <div className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-800 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
