"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Medal, Award, Palette } from "lucide-react";

export default function AchievementsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background py-20">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 mb-4">
                        <Trophy className="mr-2 h-3 w-3" /> Hall of Fame
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">Celebrating Excellence</h1>
                    <p className="text-xl text-muted-foreground">
                        At HSA Primary, we take pride in the outstanding achievements of our pupils in academics, sports, and creative arts.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "National Spelling Bee 2023",
                            desc: "Our team secured 1st place in the regional finals and 2nd place nationally.",
                            image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80",
                            category: "Academics",
                            icon: Star
                        },
                        {
                            title: "Inter-School Sports Meet",
                            desc: "Gold medalists in 4x100m relay and Long Jump categories.",
                            image: "https://images.unsplash.com/photo-1561912774-79769a0a0a7a?auto=format&fit=crop&q=80",
                            category: "Sports",
                            icon: Medal
                        },
                        {
                            title: "Junior Science Fair",
                            desc: "Awarded 'Best Innovation' for the solar-powered irrigation project.",
                            image: "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80",
                            category: "Science",
                            icon: Award
                        },
                        {
                            title: "Art & Culture Exhibition",
                            desc: "Three students received distinction for their oil painting submissions.",
                            image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80",
                            category: "Arts",
                            icon: Palette
                        },
                        {
                            title: "Mathematics Olympiad",
                            desc: "Top 5% placement in the state-wide mathematics competition.",
                            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80",
                            category: "Academics",
                            icon: Star
                        },
                        {
                            title: "Debate Club Championship",
                            desc: "Winners of the annual inter-school debate on environmental sustainability.",
                            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80",
                            category: "Literary",
                            icon: Trophy
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="group relative overflow-hidden rounded-3xl shadow-lg aspect-[4/5] cursor-pointer"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${item.image})` }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <span className="inline-flex items-center px-3 py-1 bg-primary text-xs font-bold rounded-full mb-3 gap-1">
                                    <item.icon size={12} /> {item.category}
                                </span>
                                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                <p className="opacity-90 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}


