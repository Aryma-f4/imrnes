"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Home } from "lucide-react";

export default function TopBar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/90 backdrop-blur-md border-b border-brand-purple/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-16 gap-8 md:gap-16">
                    <Link
                        href="/"
                        className={`flex items-center space-x-2 transition-colors duration-300 ${isActive("/")
                            ? "text-brand-green drop-shadow-[0_0_5px_rgba(50,205,50,0.5)]"
                            : "text-brand-light hover:text-brand-green"
                            }`}
                    >
                        <Home className="w-5 h-5" />
                        <span className="font-press-start text-xs md:text-sm">IMRNES</span>
                    </Link>

                    <Link
                        href="/achievement"
                        className={`flex items-center space-x-2 transition-colors duration-300 group ${isActive("/achievement")
                            ? "text-brand-green drop-shadow-[0_0_5px_rgba(50,205,50,0.5)]"
                            : "text-brand-light/80 hover:text-brand-green"
                            }`}
                    >
                        <Trophy className={`w-5 h-5 ${isActive("/achievement") ? "animate-pulse" : "group-hover:animate-pulse"}`} />
                        <span className="font-press-start text-xs md:text-sm tracking-wide">Achievements</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
