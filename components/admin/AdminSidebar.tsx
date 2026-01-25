"use client";

import {
    LayoutDashboard, Users, Calendar, Banknote,
    Settings, Database, Menu, X, LucideIcon, Megaphone, GraduationCap, Radio, MessageSquareQuote, LayoutTemplate, Home, BarChart3, Package
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
    name: string;
    icon: LucideIcon;
    href: string;
    description?: string;
}

const navItems: NavItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin", description: "Vista general" },
    { name: "Miembros", icon: Users, href: "/admin/members", description: "Base de datos" },
    { name: "Eventos", icon: Calendar, href: "/admin/events", description: "Gestión de calendario" },
    { name: "Finanzas", icon: Banknote, href: "/admin/finances", description: "Módulo administrativo" },
    { name: "Inventario", icon: Package, href: "/admin/inventory", description: "Activos y Recursos" },
    { name: "Cursos", icon: GraduationCap, href: "/admin/courses", description: "Instituto Bíblico" },

    { name: "Analíticas", icon: BarChart3, href: "/admin/analytics", description: "Crecimiento Espiritual" },
    { name: "Media", icon: Radio, href: "/admin/media", description: "Transmisiones" },
    { name: "Testimonios", icon: MessageSquareQuote, href: "/admin/testimonials", description: "Moderación" },
    { name: "Gestión Web", icon: LayoutTemplate, href: "/admin/gestion-web", description: "Portada y Contenido" },
    { name: "Anuncios", icon: Megaphone, href: "/admin/announcements", description: "Gestión de noticias" },
    { name: "Configuración", icon: Settings, href: "/admin/settings", description: "Ajustes del sistema" },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:flex w-72 flex-col justify-between bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 h-[calc(100vh-80px)] sticky top-20">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col px-3 mb-4">
                    <h1 className="text-slate-900 dark:text-white text-base font-bold leading-normal">Ministerio Vida Nueva</h1>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Administración General</p>
                </div>

                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive
                                    ? "bg-mivn-blue/10 text-mivn-blue"
                                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-mivn-blue"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "fill-mivn-blue/20" : ""}`} />
                                <p className={`text-sm ${isActive ? "font-bold" : "font-semibold"}`}>{item.name}</p>
                            </Link>
                        );
                    })}
                </nav>
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all group"
                    >
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                            <Home className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-bold">Volver al Inicio</p>
                            <p className="text-[10px] font-medium opacity-60">Salir del Panel</p>
                        </div>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
