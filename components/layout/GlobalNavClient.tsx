"use client";

import Image from "next/image";
import Link from "next/link";
import { User as UserIcon, Menu, Moon, Sun, X } from "lucide-react";
import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";

interface GlobalNavClientProps {
    user: User | null;
}

export const GlobalNavClient = ({ user }: GlobalNavClientProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check initial theme
        const theme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = theme === 'dark' || (!theme && prefersDark);

        setIsDark(shouldBeDark);
        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);

        if (newIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const navLinks = [
        { name: "Estudio", href: "/read" },
        { name: "Cultos", href: "/cultos" },
        { name: "Recursos", href: "/recursos" },
        { name: "Oración", href: "/oracion" },
        { name: "Ministerios", href: "/ministerios" },
        { name: "Eventos", href: "/eventos" },
        { name: "Boletín", href: "/boletin" },
        { name: "Devocional", href: "/devocionales" },
        { name: "Nosotros", href: "/sobre-nosotros" },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                        <Image
                            src="/logo_mivn.png"
                            alt="MIVN Logo"
                            width={48}
                            height={48}
                            className="h-12 w-auto"
                        />
                        <span className="font-playfair text-xl font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block uppercase">
                            MIVN
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-slate-700 dark:text-slate-300 hover:text-mivn-blue dark:hover:text-mivn-blue transition-colors font-medium text-[15px]"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>

                        {/* Donate - Only for authenticated users */}
                        {user && (
                            <Link
                                href="/donaciones"
                                className="hidden md:block text-slate-700 dark:text-slate-300 hover:text-mivn-blue dark:hover:text-mivn-blue font-medium text-[15px] transition-colors"
                            >
                                Donar
                            </Link>
                        )}

                        {/* Auth Actions */}
                        {user ? (
                            <Link
                                href="/dashboard"
                                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-mivn-blue hover:bg-mivn-blue hover:text-white transition-all"
                            >
                                <UserIcon className="w-5 h-5" />
                            </Link>
                        ) : (
                            <div className="hidden md:flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="text-slate-900 dark:text-white font-semibold text-sm hover:text-mivn-blue transition-colors"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link href="/register">
                                    <button className="bg-mivn-blue text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-mivn-blue/90 transition-all shadow-lg shadow-mivn-blue/20 hover:shadow-xl hover:shadow-mivn-blue/30">
                                        Registrarse
                                    </button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 text-slate-600 dark:text-slate-300"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 py-4 animate-in slide-in-from-top duration-200">
                        <div className="flex flex-col space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-700 dark:text-slate-300 hover:text-mivn-blue font-medium py-2 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {user && (
                                <Link
                                    href="/donaciones"
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-700 dark:text-slate-300 hover:text-mivn-blue font-medium py-2 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                >
                                    Donar
                                </Link>
                            )}

                            {!user && (
                                <div className="flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 mt-2">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="text-slate-900 dark:text-white font-semibold py-2 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link href="/register" onClick={() => setIsOpen(false)}>
                                        <button className="w-full bg-mivn-blue text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-mivn-blue/90 transition-all shadow-lg shadow-mivn-blue/20">
                                            Registrarse
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
