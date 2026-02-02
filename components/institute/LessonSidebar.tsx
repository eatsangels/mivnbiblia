"use client";

import { CheckCircle, PlayCircle, Circle, HelpCircle, Lock } from "lucide-react";

interface Lesson {
    id: string;
    title: string;
    order_index: number;
    module_name?: string;
}

interface LessonSidebarProps {
    lessons: Lesson[];
    progress: any[];
    activeLessonId: string;
    onSelectLesson: (id: string) => void;
    onCompleteLesson: (id: string) => void;
    isCompleting?: string | null;
}

export const LessonSidebar = ({
    lessons,
    progress,
    activeLessonId,
    onSelectLesson,
    onCompleteLesson,
    isCompleting
}: LessonSidebarProps) => {

    const isCompleted = (lessonId: string) => {
        return progress.find(p => p.lesson_id === lessonId)?.completed;
    };

    const completedCount = progress.filter(p => p.completed).length;
    const progressPercentage = lessons.length > 0
        ? Math.round((completedCount / lessons.length) * 100)
        : 0;

    return (
        <aside className="lg:col-span-4 border-l border-slate-200 dark:border-white/5 bg-[#f8fafb] dark:bg-[#0A0F1D]/50 flex flex-col h-full font-lexend">
            {/* Progress Tracker */}
            <div className="p-6 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#0A0F1D]">
                <div className="flex justify-between items-end mb-4">
                    <div className="space-y-1">
                        <h3 className="font-bold text-base text-slate-800 dark:text-white">Mi Progreso</h3>
                        <p className="text-xs text-slate-500">{completedCount} de {lessons.length} lecciones completadas</p>
                    </div>
                    <span className="text-xl font-black text-mivn-blue">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-white/5 h-2.5 rounded-full mb-6 relative overflow-hidden">
                    <div className="bg-mivn-blue h-full rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                </div>

                {activeLessonId && !isCompleted(activeLessonId) && (
                    <button
                        onClick={() => onCompleteLesson(activeLessonId)}
                        disabled={!!isCompleting}
                        className="w-full py-4 bg-mivn-gold text-white font-bold rounded-lg shadow-xl shadow-mivn-gold/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs disabled:opacity-50"
                    >
                        {isCompleting === activeLessonId ? (
                            <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <CheckCircle className="w-5 h-5" />
                        )}
                        Marcar como Completado
                    </button>
                )}
            </div>

            {/* Curriculum Navigation */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                <div className="space-y-1">
                    {lessons.map((lesson, i) => {
                        const active = activeLessonId === lesson.id;
                        const completed = isCompleted(lesson.id);

                        return (
                            <div
                                key={lesson.id}
                                onClick={() => onSelectLesson(lesson.id)}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer group ${active
                                        ? "bg-mivn-blue/10 border-l-4 border-mivn-blue shadow-sm"
                                        : "hover:bg-white dark:hover:bg-white/5"
                                    }`}
                            >
                                {completed ? (
                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                ) : active ? (
                                    <PlayCircle className="w-5 h-5 text-mivn-blue fill-current/20" />
                                ) : (
                                    <Circle className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                                )}
                                <span className={`text-sm transition-colors ${active
                                        ? "font-bold text-slate-900 dark:text-white"
                                        : "font-medium text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                                    }`}>
                                    {lesson.title}
                                </span>
                            </div>
                        );
                    })}
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
