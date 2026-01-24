"use client";

import { CheckCircle, PlayCircle, Circle, HelpCircle, Lock } from "lucide-react";

export const LessonSidebar = () => {
    return (
        <aside className="lg:col-span-4 border-l border-slate-200 dark:border-white/5 bg-[#f8fafb] dark:bg-[#0A0F1D]/50 flex flex-col h-full font-lexend">
            {/* Progress Tracker */}
            <div className="p-6 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#0A0F1D]">
                <div className="flex justify-between items-end mb-4">
                    <div className="space-y-1">
                        <h3 className="font-bold text-base text-slate-800 dark:text-white">Mi Progreso</h3>
                        <p className="text-xs text-slate-500">7 de 10 lecciones completadas</p>
                    </div>
                    <span className="text-xl font-black text-mivn-blue">70%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-white/5 h-2.5 rounded-full mb-6 relative overflow-hidden">
                    <div className="bg-mivn-blue h-full rounded-full" style={{ width: "70%" }}></div>
                </div>
                <button className="w-full py-4 bg-mivn-gold text-white font-bold rounded-lg shadow-xl shadow-mivn-gold/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs">
                    <CheckCircle className="w-5 h-5" />
                    Marcar como Completado
                </button>
            </div>

            {/* Curriculum Navigation */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                {/* Module 1 */}
                <div>
                    <div className="flex items-center justify-between px-2 mb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Módulo 1: Fundamentos</span>
                        <span className="text-[10px] bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-bold">100%</span>
                    </div>
                    <div className="space-y-1">
                        {[
                            { title: "1. Bienvenida a Vida Nueva", status: "completed" },
                            { title: "2. El Propósito de la Fe", status: "completed" }
                        ].map((lesson, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">{lesson.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Module 2 */}
                <div>
                    <div className="flex items-center justify-between px-2 mb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Módulo 2: Crecimiento</span>
                        <span className="text-[10px] bg-mivn-blue/10 text-mivn-blue px-2 py-0.5 rounded-full font-bold">30%</span>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-mivn-blue/10 border-l-4 border-mivn-blue shadow-sm cursor-default">
                            <PlayCircle className="w-5 h-5 text-mivn-blue fill-current/20" />
                            <span className="text-sm font-bold text-slate-900 dark:text-white">3. La Oración y el Ayuno</span>
                        </div>
                        {[
                            { title: "4. Sanidad Interior", status: "pending" },
                            { title: "5. El Poder de la Palabra", status: "pending" },
                        ].map((lesson, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                <Circle className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                                <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">{lesson.title}</span>
                            </div>
                        ))}
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-white/5 transition-colors cursor-not-allowed opacity-60">
                            <Lock className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                            <span className="text-sm font-medium text-slate-500">6. Ministerio Personal</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Footer Help */}
            <div className="p-6 bg-white dark:bg-[#0A0F1D] border-t border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-3 text-sm text-slate-500 cursor-pointer hover:text-mivn-blue transition-colors">
                    <HelpCircle className="w-5 h-5" />
                    <span>¿Tienes problemas con la lección?</span>
                </div>
            </div>
        </aside>
    );
};
