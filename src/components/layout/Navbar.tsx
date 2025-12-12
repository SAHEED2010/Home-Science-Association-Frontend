"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Hide navbar on auth and dashboard pages
    const isAuthPage = pathname === "/login" || pathname === "/register";
    const isDashboardPage = pathname?.startsWith("/admin") || pathname?.startsWith("/teacher") || pathname?.startsWith("/student") || pathname?.startsWith("/parent");

    if (isAuthPage || isDashboardPage) return null;

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-background">
                <div className="container mx-auto flex h-16 items-center justify-between px-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <div className="relative h-10 w-10">
                            <Image src="/images/logo.png" alt="HSA Logo" fill className="object-contain" />
                        </div>
                        <span className="hidden sm:inline">HSA Primary</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex gap-6 text-sm font-medium">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <Link href="/about" className="hover:text-primary">About</Link>
                        <Link href="/academics" className="hover:text-primary">Academics</Link>
                        <Link href="/admissions" className="hover:text-primary">Admissions</Link>
                        <Link href="/achievements" className="hover:text-primary">Achievements</Link>
                        <Link href="/campus-life" className="hover:text-primary">Campus Life</Link>
                        <Link href="/news" className="hover:text-primary">News</Link>
                        <Link href="/contact" className="hover:text-primary">Contact</Link>
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block"><ModeToggle /></div>
                        <Link href="/login" className="hidden md:inline">
                            <Button variant="ghost" size="sm">Login</Button>
                        </Link>
                        <Link href="/register" className="hidden md:inline">
                            <Button size="sm" className="rounded-full">Apply Now</Button>
                        </Link>

                        {/* HAMBURGER BUTTON */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden flex flex-col gap-1.5 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Menu"
                        >
                            <span className={`block h-0.5 w-6 bg-current transition ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`block h-0.5 w-6 bg-current transition ${isOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block h-0.5 w-6 bg-current transition ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {isOpen && (
                    <div className="lg:hidden border-t bg-background">
                        <nav className="container mx-auto px-6 py-4 space-y-2">
                            <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary">Home</Link>
                            <Link href="/about" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary">About</Link>
                            <Link href="/academics" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary">Academics</Link>
                            <Link href="/admissions" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary">Admissions</Link>
                            <Link href="/achievements" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary">Achievements</Link>
                            <Link href="/campus-life" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary">Campus Life</Link>
                            <Link href="/news" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary">News</Link>
                            <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary">Contact</Link>

                            <div className="pt-4 border-t space-y-2">
                                <Link href="/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="outline" className="w-full">Login</Button>
                                </Link>
                                <Link href="/register" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full">Apply Now</Button>
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}
