"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-muted/20">
            <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
            <div className="flex flex-1 flex-col">
                <Topbar onMenuClick={() => setMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
