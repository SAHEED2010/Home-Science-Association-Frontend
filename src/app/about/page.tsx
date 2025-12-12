"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Eye, History, Users, Award, BookOpen, Heart, Shield } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans bg-slate-50 dark:bg-background">
            <main className="flex-1">

                {/* Hero Banner */}
                <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                    <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6"
                        >
                            About Home Science Association
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed"
                        >
                            Nurturing excellence, building character, and shaping the leaders of tomorrow since 1990.
                        </motion.p>
                    </div>
                </section>

                {/* Principal's Welcome */}
                <section className="py-24 bg-white dark:bg-background">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="flex-1 relative">
                                <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-100 dark:border-slate-800">
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border max-w-xs hidden md:block">
                                    <p className="font-caveat text-2xl text-primary mb-2">"Education is the most powerful weapon which you can use to change the world."</p>
                                    <p className="text-sm font-bold text-right">- Nelson Mandela</p>
                                </div>
                            </div>
                            <div className="flex-1 space-y-6">
                                <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-primary/10 text-primary">
                                    From the Principal's Desk
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome to a Community of Learners</h2>
                                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                                    <p>
                                        At HSA Primary School, we believe that every child is a unique individual with the potential to achieve greatness. Our mission goes beyond academic excellence; we strive to nurture the whole child—intellectually, socially, emotionally, and physically.
                                    </p>
                                    <p>
                                        For over three decades, we have maintained a tradition of educational excellence, blending modern teaching methodologies with strong moral values. Our dedicated staff works tirelessly to create a safe, inclusive, and stimulating environment where curiosity is encouraged and talents are discovered.
                                    </p>
                                    <p>
                                        I invite you to explore our website and learn more about what makes HSA Primary a special place for your child's educational journey.
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <p className="font-bold text-xl text-foreground">Mrs. A. Johnson</p>
                                    <p className="text-primary font-medium">Principal, HSA Primary School</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission, Vision & Values */}
                <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                                <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                    <Target className="h-7 w-7" />
                                </div>
                                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    To provide a conducive learning environment that fosters academic excellence, moral discipline, and skill acquisition, empowering students to become responsible global citizens.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                                <div className="h-14 w-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                                    <Eye className="h-7 w-7" />
                                </div>
                                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    To be a premier institution recognized globally for producing well-rounded individuals who excel in character and learning.
                                </p>
                            </div>
                        </div>

                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Core Values</h2>
                            <p className="text-muted-foreground">The principles that guide our daily interactions and educational approach.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { icon: Award, title: "Excellence", desc: "Striving for the highest standards in all we do." },
                                { icon: Heart, title: "Integrity", desc: "Being honest, ethical, and accountable." },
                                { icon: Users, title: "Community", desc: "Fostering collaboration and mutual respect." },
                                { icon: Shield, title: "Discipline", desc: "Instilling self-control and responsibility." },
                            ].map((value, i) => (
                                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border text-center hover:shadow-md transition-shadow">
                                    <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                        <value.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* History / Timeline */}
                <section className="py-24 bg-white dark:bg-background">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Journey</h2>
                            <p className="text-muted-foreground">From humble beginnings to a leading educational institution.</p>
                        </div>

                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                            {[
                                { year: "1990", title: "Establishment", desc: "HSA was founded with just 50 students and 5 teachers." },
                                { year: "2000", title: "Expansion", desc: "Moved to our permanent site with modern facilities and laboratories." },
                                { year: "2010", title: "Excellence Award", desc: "Recognized as the Best School in the district for academic performance." },
                                { year: "2024", title: "Digital Transformation", desc: "Launched the HSA Portal and smart classrooms initiative." },
                            ].map((item, i) => (
                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-950 bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <History className="w-5 h-5" />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border shadow-sm">
                                        <div className="flex items-center justify-between space-x-2 mb-2">
                                            <div className="font-bold text-lg">{item.title}</div>
                                            <time className="font-bold text-primary">{item.year}</time>
                                        </div>
                                        <div className="text-muted-foreground">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Leadership Team */}
                <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Meet Our Leadership</h2>
                            <p className="text-muted-foreground">The dedicated team behind our success.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { name: "Mrs. A. Johnson", role: "Principal", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" },
                                { name: "Mr. B. Okonkwo", role: "Vice Principal (Acad)", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" },
                                { name: "Mrs. C. Adeyemi", role: "Vice Principal (Admin)", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80" },
                            ].map((member, i) => (
                                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border group hover:shadow-lg transition-all">
                                    <div className="h-72 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${member.image})` }}></div>
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                                        <p className="text-primary font-medium text-sm">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
