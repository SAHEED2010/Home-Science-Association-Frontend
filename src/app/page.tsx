"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Calendar, MapPin, Info, Newspaper, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans overflow-x-hidden bg-slate-50 dark:bg-background">
      <main className="flex-1">

        {/* Hero Section */}
        <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors border-primary/20 bg-primary/10 text-primary">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Welcome to Home Science Association
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl text-foreground leading-[1.1]">
                A modern school where every student can <span className="text-primary">thrive.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Discover a caring community, strong academics, and a vibrant campus life. Start by exploring the sections below or begin your application.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link href="/register">
                  <Button size="lg" className="h-14 px-8 text-lg gap-2 rounded-full">
                    Start your application <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full">
                    Book a campus tour
                  </Button>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-12 border-t mt-8">
                <div>
                  <p className="text-3xl font-bold text-foreground">800+</p>
                  <p className="text-sm text-muted-foreground">Students across all grades</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">12:1</p>
                  <p className="text-sm text-muted-foreground">Student-teacher ratio</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">98%</p>
                  <p className="text-sm text-muted-foreground">Graduates to higher education</p>
                </div>
              </div>
            </div>

            <div className="flex-1 relative w-full aspect-[4/3] lg:aspect-square max-w-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-400/20 rounded-[2rem] rotate-3 blur-3xl" />
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 hover:scale-105"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                  <p className="font-medium">Real learning, real community.</p>
                  <p className="text-sm opacity-80">Photo from a recent school day</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shortcuts Section */}
        <section className="py-20 bg-white dark:bg-slate-900/50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="mb-12">
              <p className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">Explore the school</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Jump into the areas you care about.</h2>
              <p className="text-lg text-muted-foreground mt-2">Use these shortcuts to learn more about HSA Primary on dedicated pages.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "About HSA",
                  desc: "Read our mission, values, leadership team, and school history.",
                  icon: Info,
                  link: "/about",
                  linkText: "Go to About page"
                },
                {
                  title: "Academics",
                  desc: "Explore subjects, curriculum, and academic support programmes.",
                  icon: BookOpen,
                  link: "/academics",
                  linkText: "Go to Academics page"
                },
                {
                  title: "Admissions",
                  desc: "Review admission steps, key dates, fees, and required documents.",
                  icon: GraduationCap,
                  link: "/admissions",
                  linkText: "Go to Admissions page"
                },
                {
                  title: "Campus Life",
                  desc: "See sports, clubs, arts, and student leadership opportunities.",
                  icon: Users,
                  link: "/campus-life",
                  linkText: "Go to Campus Life page"
                },
                {
                  title: "News & Events",
                  desc: "Stay updated with recent announcements, events, and achievements.",
                  icon: Newspaper,
                  link: "/news",
                  linkText: "Go to News page"
                },
                {
                  title: "Contact & Visit",
                  desc: "Find our address, phone, email, and directions for campus visits.",
                  icon: MapPin,
                  link: "/contact",
                  linkText: "Go to Contact page"
                }
              ].map((item, i) => (
                <Link href={item.link} key={i} className="group">
                  <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border hover:border-primary/50 hover:shadow-lg transition-all h-full flex flex-col">
                    <div className="h-12 w-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm group-hover:scale-110 transition-transform">
                      <item.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-1">{item.desc}</p>
                    <div className="text-sm font-medium text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                      {item.linkText} <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* News & Events Split Section */}
        <section className="py-20 bg-slate-50 dark:bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">News & Events</h2>
                <p className="text-lg text-muted-foreground mt-2">Stay updated with recent announcements and upcoming activities.</p>
              </div>
              <Link href="/news">
                <Button variant="outline" className="hidden sm:flex">View all updates</Button>
              </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Featured Article (Left - 2 Cols) */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border shadow-sm group cursor-pointer h-full flex flex-col">
                  <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">Featured</div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="text-sm text-muted-foreground mb-3">12 March 2025 • Academic Office</div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">HSA Primary wins regional science & innovation challenge</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                      Our Grade 5 science teams took first place at the regional innovation fair with projects focused on renewable energy and sustainable cities. Students collaborated across disciplines and presented their work to industry judges.
                    </p>
                    <div className="flex items-center text-primary font-medium gap-2">
                      Read full story <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events List (Right - 1 Col) */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">Upcoming events</h3>
                    <Link href="/news" className="text-xs text-primary font-medium hover:underline">View calendar</Link>
                  </div>
                  <div className="space-y-6">
                    {[
                      { title: "Inter-school athletics meet", date: "5 Apr", loc: "City Stadium" },
                      { title: "Grade 4 subject choice evening", date: "10 Apr", loc: "School Hall" },
                      { title: "Autumn arts showcase", date: "22 Apr", loc: "Performing Arts Centre" }
                    ].map((event, i) => (
                      <div key={i} className="flex gap-4 items-start group cursor-pointer">
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 text-center min-w-[60px]">
                          <div className="text-xs text-muted-foreground uppercase font-bold">{event.date.split(' ')[1]}</div>
                          <div className="text-xl font-bold text-foreground">{event.date.split(' ')[0]}</div>
                        </div>
                        <div>
                          <h4 className="font-bold group-hover:text-primary transition-colors">{event.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{event.loc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                  <h3 className="font-bold text-lg mb-2">From the Principal</h3>
                  <p className="text-sm text-muted-foreground italic mb-4">
                    "We are proud of our students' achievements in and out of the classroom. Thank you to families and staff who make HSA a vibrant community."
                  </p>
                  <Link href="/about" className="text-xs font-bold text-primary hover:underline">Read more</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
