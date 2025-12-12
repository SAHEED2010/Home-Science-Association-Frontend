"use client";

import { motion } from "framer-motion";
import { BookOpen, Calculator, FlaskConical, Languages, Music, Palette, Globe, Brain } from "lucide-react";

export default function AcademicsPage() {
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
                        <BookOpen className="mr-2 h-3 w-3" /> Academic Excellence
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">Our Curriculum</h1>
                    <p className="text-xl text-muted-foreground">
                        We offer a broad and balanced curriculum that blends the best of British and Nigerian educational standards.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold">Montessori Foundation</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Our Early Years Foundation Stage (EYFS) follows the Montessori method, emphasizing independence, freedom within limits, and respect for a child’s natural psychological, physical, and social development.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1">1</div>
                                <div>
                                    <h3 className="font-bold">Practical Life Exercises</h3>
                                    <p className="text-sm text-muted-foreground">Developing daily life skills and coordination.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1">2</div>
                                <div>
                                    <h3 className="font-bold">Sensorial Education</h3>
                                    <p className="text-sm text-muted-foreground">Refining the five senses to help children understand their environment.</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                    <motion.div
                        className="relative h-[400px] rounded-3xl overflow-hidden"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
                    </motion.div>
                </div>

                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Core Subjects</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "Mathematics", icon: Calculator, color: "text-blue-600", bg: "bg-blue-50" },
                            { name: "English Language", icon: Languages, color: "text-red-600", bg: "bg-red-50" },
                            { name: "Science", icon: FlaskConical, color: "text-green-600", bg: "bg-green-50" },
                            { name: "Social Studies", icon: Globe, color: "text-purple-600", bg: "bg-purple-50" },
                            { name: "Creative Arts", icon: Palette, color: "text-pink-600", bg: "bg-pink-50" },
                            { name: "Music", icon: Music, color: "text-orange-600", bg: "bg-orange-50" },
                            { name: "ICT", icon: Brain, color: "text-cyan-600", bg: "bg-cyan-50" },
                            { name: "French", icon: Languages, color: "text-indigo-600", bg: "bg-indigo-50" },
                        ].map((subject, i) => (
                            <motion.div
                                key={i}
                                className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all text-center group"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <div className={`h-12 w-12 mx-auto rounded-xl ${subject.bg} ${subject.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <subject.icon size={24} />
                                </div>
                                <h3 className="font-bold">{subject.name}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
