"use client";

import Link from "next/link";
import { Bell, Search, User } from "lucide-react";
import Image from "next/image";
export const InstituteHeader = () => {
    return (
        <header className="sticky top-20 z-40 w-full border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#0A0F1D] px-6 py-3 font-lexend">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 text-mivn-blue hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 relative">
                            <Image src="/logo_mivn.png" alt="MIVN" fill className="object-contain" />
                        </div>
                        <h2 className="text-[#0f161a] dark:text-white text-xl font-bold leading-tight tracking-tight">MIVN Instituto</h2>
                    </Link>
                    <div className="hidden md:flex items-center gap-6">
                        <a className="text-mivn-blue text-sm font-semibold border-b-2 border-mivn-blue pb-1" href="#">Cursos</a>
                        <a className="text-slate-500 dark:text-slate-400 hover:text-mivn-blue text-sm font-medium transition-colors" href="#">Mis Avances</a>
                        <a className="text-slate-500 dark:text-slate-400 hover:text-mivn-blue text-sm font-medium transition-colors" href="#">Certificados</a>
                        <a className="text-slate-500 dark:text-slate-400 hover:text-mivn-blue text-sm font-medium transition-colors" href="#">Biblioteca</a>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center bg-slate-100 dark:bg-white/5 rounded-lg px-3 py-1.5 gap-2 w-64">
                        <Search className="text-slate-400 w-4 h-4" />
                        <input className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-500 outline-none text-slate-800 dark:text-slate-200" placeholder="Buscar cursos..." />
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-mivn-blue/20 transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="h-10 w-10 rounded-full border-2 border-mivn-blue overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                            <User className="w-6 h-6 text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
