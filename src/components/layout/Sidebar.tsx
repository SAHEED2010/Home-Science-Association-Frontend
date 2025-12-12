"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    CalendarCheck,
    FileText,
    CreditCard,
    Megaphone,
    Settings,
    LogOut,
    Video,
    User,
    X
} from "lucide-react";

const adminNavItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Students", href: "/admin/students", icon: Users },
    { label: "Teachers", href: "/admin/teachers", icon: GraduationCap },
    { label: "Classes", href: "/admin/classes", icon: BookOpen },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Attendance", href: "/admin/attendance", icon: CalendarCheck },
    { label: "Assignments", href: "/admin/assignments", icon: FileText },
    { label: "Exams & Grades", href: "/admin/exams", icon: GraduationCap },
    { label: "Results", href: "/admin/results", icon: GraduationCap },
    { label: "Fees & Payments", href: "/admin/fees", icon: CreditCard },
    { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
    { label: "Settings", href: "/admin/settings", icon: Settings },
];

const teacherNavItems = [
    { label: "Dashboard", href: "/teacher", icon: LayoutDashboard },
    { label: "My Classes", href: "/teacher/classes", icon: Users },
    { label: "Resources", href: "/teacher/resources", icon: Video },
    { label: "Assignments", href: "/teacher/assignments", icon: FileText },
    { label: "Attendance", href: "/teacher/attendance", icon: CalendarCheck },
    { label: "Settings", href: "/teacher/settings", icon: Settings },
];

const studentNavItems = [
    { label: "Dashboard", href: "/student", icon: LayoutDashboard },
    { label: "My Courses", href: "/student/courses", icon: BookOpen },
    { label: "Assignments", href: "/student/assignments", icon: FileText },
    { label: "Results", href: "/student/results", icon: GraduationCap },
    { label: "Timetable", href: "/student/timetable", icon: CalendarCheck },
    { label: "Settings", href: "/student/settings", icon: Settings },
];

const parentNavItems = [
    { label: "Dashboard", href: "/parent", icon: LayoutDashboard },
    { label: "Children", href: "/parent/children", icon: User },
    { label: "Results", href: "/parent/results", icon: GraduationCap },
    { label: "Fees", href: "/parent/fees", icon: CreditCard },
    { label: "Settings", href: "/parent/settings", icon: Settings },
];

interface SidebarProps {
    mobileOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
    const pathname = usePathname();
    const [role, setRole] = useState("student");
    const [navItems, setNavItems] = useState(studentNavItems);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setRole(user.role);

                switch (user.role) {
                    case 'admin': setNavItems(adminNavItems); break;
                    case 'teacher': setNavItems(teacherNavItems); break;
                    case 'student': setNavItems(studentNavItems); break;
                    case 'parent': setNavItems(parentNavItems); break;
                    default: setNavItems(studentNavItems);
                }
            } catch (e) {
                console.error("Failed to parse user role");
            }
        }
    }, []);

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 flex-col border-r bg-card md:flex h-screen sticky top-0">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                        <div className="relative h-8 w-8">
                            <Image
                                src="/images/logo.png"
                                alt="HSA Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span>HSA Portal</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="grid gap-1 px-2">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="border-t p-4">
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            window.location.href = "/login";
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            {mobileOpen && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />
                    <aside className="fixed left-0 top-0 bottom-0 w-64 flex-col border-r bg-card z-50 md:hidden">
                        <div className="flex h-16 items-center justify-between border-b px-6">
                            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                                <div className="relative h-8 w-8">
                                    <Image src="/images/logo.png" alt="HSA Logo" fill className="object-contain" />
                                </div>
                                <span>HSA Portal</span>
                            </Link>
                            <button onClick={onClose} className="p-2 hover:bg-accent rounded-md">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto py-4">
                            <nav className="grid gap-1 px-2">
                                {navItems.map((item, index) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            onClick={onClose}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors",
                                                isActive
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            )}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                        <div className="border-t p-4">
                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("user");
                                    window.location.href = "/login";
                                }}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    </aside>
                </>
            )}
        </>
    );
}
