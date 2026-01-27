"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
    user: any;
}

export const Navbar = ({ user }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Inicio", href: "/" },
        { name: "Estudio", href: "/read" },
        { name: "Donar", href: "/donaciones" },
        { name: "En Vivo", href: "/en-vivo" },
        { name: "Grupos", href: "/grupos" },
        { name: "Ministerios", href: "/ministerios" },
        { name: "Devocional", href: "/devocionales" },
        { name: "Nosotros", href: "/sobre-nosotros" },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0f1d]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-20">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

                {/* Logo - Official MIVN Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo_mivn.png"
                        alt="MIVN Logo"
                        width={56}
                        height={56}
                        className="h-14 w-auto drop-shadow-sm"
                    />
                    <span className="font-playfair text-xl font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block uppercase">MIVN</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-slate-600 dark:text-slate-300 hover:text-mivn-blue transition-colors font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <button
                        onClick={() => {
                            const isDark = document.documentElement.classList.toggle('dark');
                            localStorage.setItem('theme', isDark ? 'dark' : 'light');
                        }}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                    >
                        <Moon className="w-5 h-5 block dark:hidden" />
                        <Sun className="w-5 h-5 hidden dark:block text-yellow-400" />
                    </button>



                    {user ? (
                        <Link href="/dashboard" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-mivn-blue hover:bg-mivn-blue hover:text-white transition-all">
                            <User className="w-5 h-5" />
                        </Link>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="text-slate-900 dark:text-white font-bold text-sm hover:underline"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/register"
                                className="bg-mivn-blue text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-mivn-blue/20 hover:scale-105 transition-all"
                            >
                                Registrarse
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-slate-600 dark:text-slate-300" onClick={() => setIsOpen(!isOpen)}>
                    <Menu className="w-8 h-8" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#0a0f1d] border-b border-slate-200 dark:border-slate-800 p-6 space-y-4 animate-in slide-in-from-top duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="block text-lg font-medium text-slate-600 dark:text-slate-300"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/donaciones"
                        className="block text-lg font-bold text-mivn-blue"
                        onClick={() => setIsOpen(false)}
                    >
                        Donar
                    </Link>

                    {!user && (
                        <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <Link
                                href="/login"
                                className="block text-lg font-bold text-slate-900 dark:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/register"
                                className="block text-lg font-bold text-mivn-blue"
                                onClick={() => setIsOpen(false)}
                            >
                                Registrarse
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};
