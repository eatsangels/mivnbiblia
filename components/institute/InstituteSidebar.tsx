"use client";

import { School, UserPlus, Users, BookOpen, Construction, Award } from "lucide-react";

export const InstituteSidebar = () => {
    const categories = [
        { icon: School, label: "Todos los Cursos", href: "#", active: true },
        { icon: UserPlus, label: "Nuevos Creyentes", href: "#" },
        { icon: Users, label: "Liderazgo", href: "#" },
        { icon: BookOpen, label: "Escuela Dominical", href: "#" },
        { icon: Construction, label: "Talleres", href: "#" },
    ];

    const achievements = [
        {
            title: "Primer Paso",
            desc: "Curso Iniciación completado",
            icon: Award,
            color: "text-mivn-gold",
            bg: "bg-mivn-gold/20"
        },
        {
            title: "Siervo Fiel",
            desc: "30 días de estudio constante",
            icon: Award,
            color: "text-mivn-blue",
            bg: "bg-mivn-blue/20"
        }
    ];

    return (
        <aside className="w-full lg:w-64 flex flex-col gap-8 font-lexend">
            <div className="bg-white dark:bg-[#0A0F1D] p-6 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Categorías</h3>
                <nav className="flex flex-col gap-1">
                    {categories.map((cat, i) => (
                        <a
                            key={i}
                            href={cat.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${cat.active
                                    ? "bg-mivn-blue/10 text-mivn-blue font-semibold"
                                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                                }`}
                        >
                            <cat.icon className="w-5 h-5" />
                            <span>{cat.label}</span>
                        </a>
                    ))}
                </nav>
            </div>

            <div className="bg-white dark:bg-[#0A0F1D] p-6 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Logros Recientes</h3>
                <div className="flex flex-col gap-4">
                    {achievements.map((ach, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`${ach.bg} p-2 rounded-full`}>
                                <ach.icon className={`w-5 h-5 ${ach.color}`} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-800 dark:text-gray-200">{ach.title}</p>
                                <p className="text-[10px] text-slate-500">{ach.desc}</p>
                            </div>
                        </div>
                    ))}
                    <button className="text-mivn-blue text-xs font-bold mt-2 hover:underline text-left">
                        Ver todas mis insignias
                    </button>
                </div>
            </div>
        </aside>
    );
};
