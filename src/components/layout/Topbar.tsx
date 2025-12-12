"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { USERS } from "@/lib/data";
import { useState, useEffect } from "react";

interface TopbarProps {
    onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
    const [user, setUser] = useState(USERS.admin);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                const userData = JSON.parse(userStr);
                setUser(userData);
            } catch {
                // Use default
            }
        }
    }, []);

    return (
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={onMenuClick}
                >
                    <Menu className="h-5 w-5" />
                </Button>
                <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Dashboard</span>
                    <span>/</span>
                    <span>Overview</span>
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative hidden sm:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="h-9 w-40 sm:w-64 rounded-md border bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                </Button>

                <div className="flex items-center gap-3 border-l pl-3 sm:pl-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {user.name?.[0] || 'U'}
                    </div>
                </div>
            </div>
        </header>
    );
}
