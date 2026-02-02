"use client";

import { useState } from "react";
import { InstituteHeader } from "./InstituteHeader";
import { LessonSidebar } from "./LessonSidebar";
import { VideoPlayer } from "./VideoPlayer";
import { ArrowLeft, Menu, FileText, Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import { completeLesson } from "@/app/instituto/actions";

interface LessonManagerProps {
    course: any;
    lessons: any[];
    initialProgress: any[];
    courseId: string;
    userProfile?: any;
}

export const LessonManager = ({ course, lessons, initialProgress, courseId, userProfile }: LessonManagerProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeLessonId, setActiveLessonId] = useState(lessons[0]?.id || "");
    const [progress, setProgress] = useState(initialProgress);
    const [isCompleting, setIsCompleting] = useState<string | null>(null);

    const activeLesson = lessons.find(l => l.id === activeLessonId);

    const handleSelectLesson = (id: string) => {
        setActiveLessonId(id);
        setSidebarOpen(false);
    };

    const handleCompleteLesson = async (id: string) => {
        setIsCompleting(id);
        try {
            const result = await completeLesson(id, courseId);
            if (result.success) {
                // Update local progress state
                if (!progress.find(p => p.lesson_id === id)) {
                    setProgress([...progress, { lesson_id: id, completed: true }]);
                } else {
                    setProgress(progress.map(p => p.lesson_id === id ? { ...p, completed: true } : p));
                }
            }
        } catch (error) {
            console.error("Error completing lesson:", error);
            alert("Error al marcar la lección como completada");
        } finally {
            setIsCompleting(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#060a10] font-lexend transition-colors duration-300">
            <InstituteHeader userProfile={userProfile} />

            <main className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:h-[calc(100vh-130px)]">
                {/* Main Content (Video & Details) */}
                <div className="lg:col-span-8 overflow-y-auto bg-white dark:bg-[#0A0F1D] p-6 lg:p-8 space-y-6 scrollbar-hide">
                    {/* Breadcrumbs & Heading */}
                    <div className="flex flex-col gap-4 pt-24 lg:pt-20">
                        <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
                            <Link href="/instituto" className="hover:text-mivn-blue hover:underline">Cursos</Link>
                            <span>/</span>
                            <span className="text-slate-400">{course.title}</span>
                        </nav>

                        <div className="flex flex-wrap justify-between items-end gap-4">
                            <div className="space-y-1">
                                <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                                    {(activeLesson?.order_index || 0)}. {activeLesson?.title || "Cargando..."}
                                </h1>
                                <p className="text-slate-500 font-medium">Instructor: {course.instructor_name || "MIVN"}</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors"
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                >
                                    <Menu className="w-5 h-5" />
                                    Temario
                                </button>
                                <Link
                                    href="/instituto"
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-slate-200"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Volver al curso
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Video Player */}
                    <VideoPlayer
                        videoUrl={activeLesson?.video_url}
                        thumbnailUrl={course.thumbnail_url}
                        onEnded={() => handleCompleteLesson(activeLessonId)}
                    />

                    {/* Tabs Section */}
                    <div className="pt-4">
                        <div className="border-b border-slate-200 dark:border-white/5 flex gap-8">
                            <button className="pb-4 border-b-2 border-mivn-blue text-mivn-blue font-bold text-sm">
                                Recursos de la Lección
                            </button>
                            <button className="pb-4 border-b-2 border-transparent text-slate-500 font-medium text-sm hover:text-slate-800 dark:hover:text-white transition-all">
                                Notas y Preguntas
                            </button>
                        </div>

                        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Resource Cards */}
                            <div className="group border border-slate-200 dark:border-white/5 p-4 rounded-xl hover:shadow-md transition-all flex items-center justify-between bg-white dark:bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-mivn-blue/10 rounded-lg flex items-center justify-center text-mivn-blue">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">Guía de Estudio PDF</h4>
                                        <p className="text-xs text-slate-500">Descargar resumen y ejercicios</p>
                                    </div>
                                </div>
                                <Download className="w-5 h-5 text-slate-400 group-hover:text-mivn-blue transition-colors cursor-pointer" />
                            </div>

                            <div className="group border border-slate-200 dark:border-white/5 p-4 rounded-xl hover:shadow-md transition-all flex items-center justify-between bg-white dark:bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-100 dark:bg-red-500/10 rounded-lg flex items-center justify-center text-red-600 dark:text-red-400">
                                        <ExternalLink className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">Referencias Bíblicas</h4>
                                        <p className="text-xs text-slate-500">Versículos mencionados en clase</p>
                                    </div>
                                </div>
                                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-mivn-blue transition-colors cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar (Desktop) */}
                <div className="hidden lg:block lg:col-span-4 h-full overflow-hidden">
                    <LessonSidebar
                        lessons={lessons}
                        progress={progress}
                        activeLessonId={activeLessonId}
                        onSelectLesson={handleSelectLesson}
                        onCompleteLesson={handleCompleteLesson}
                        isCompleting={isCompleting}
                    />
                </div>

                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-[60] lg:hidden">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                        <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-[#0A0F1D] shadow-2xl animate-in slide-in-from-right duration-200">
                            <LessonSidebar
                                lessons={lessons}
                                progress={progress}
                                activeLessonId={activeLessonId}
                                onSelectLesson={handleSelectLesson}
                                onCompleteLesson={handleCompleteLesson}
                                isCompleting={isCompleting}
                            />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
