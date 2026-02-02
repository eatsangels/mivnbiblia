"use client";

import { useState, useEffect } from "react";
import { Plus, X, Save, Trash2, Edit, PlayCircle, GripVertical, Clock, Film } from "lucide-react";
import { createLesson, updateLesson, deleteLesson, getCourseLessons } from "@/app/(estudio)/admin/courses/actions";
import type { CourseLesson } from "@/app/(estudio)/admin/courses/actions";

interface CourseLessonsManagerProps {
    courseId: string;
    courseTitle: string;
    onClose: () => void;
}

export function CourseLessonsManager({ courseId, courseTitle, onClose }: CourseLessonsManagerProps) {
    const [lessons, setLessons] = useState<CourseLesson[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingLesson, setEditingLesson] = useState<Partial<CourseLesson> | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadLessons();
    }, [courseId]);

    const loadLessons = async () => {
        try {
            const data = await getCourseLessons(courseId);
            setLessons(data);
            if (data.length === 0) {
                setEditingLesson({ title: '', description: '', video_url: '', duration_minutes: 0 });
            }
        } catch (error) {
            console.error("Error loading lessons:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveLesson = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingLesson?.title) return;

        setIsSaving(true);
        try {
            if (editingLesson.id) {
                const updated = await updateLesson(editingLesson.id, editingLesson);
                setLessons(prev => prev.map(l => l.id === updated.id ? updated : l));
            } else {
                const created = await createLesson({
                    ...editingLesson,
                    course_id: courseId,
                    order_index: lessons.length + 1,
                    title: editingLesson.title!,
                    content: editingLesson.content || ''
                } as any);
                setLessons(prev => [...prev, created]);
            }
            setEditingLesson(null);
        } catch (error) {
            console.error("Error saving lesson:", error);
            alert("Error al guardar la lección");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de que deseas eliminar esta lección?")) return;
        try {
            await deleteLesson(id, courseId);
            setLessons(prev => prev.filter(l => l.id !== id));
        } catch (error) {
            console.error("Error deleting lesson:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 w-full max-w-5xl h-[85vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl border border-white/10">

                {/* Header */}
                <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-white dark:bg-slate-900 z-10">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-mivn-blue/10 text-mivn-blue text-[10px] font-black uppercase tracking-widest rounded-lg">
                                Editor de Contenido
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                                {courseTitle}
                            </h3>
                        </div>
                        <p className="text-xs text-slate-500 font-medium italic mt-1 ml-1">
                            {lessons.length} {lessons.length === 1 ? 'Lección' : 'Lecciones'} creadas
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-400 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Lessons List - Left Side */}
                    <div className="w-1/3 border-r border-slate-100 dark:border-white/5 overflow-y-auto bg-slate-50/50 dark:bg-slate-900">
                        <div className="p-6 space-y-4">
                            <button
                                onClick={() => setEditingLesson({ title: '', description: '', video_url: '', duration_minutes: 0 })}
                                className="w-full py-4 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-mivn-blue/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Nueva Lección
                            </button>

                            <div className="space-y-3">
                                {isLoading ? (
                                    <p className="text-center text-slate-400 py-10 text-xs">Cargando lecciones...</p>
                                ) : lessons.length === 0 ? (
                                    <div className="text-center py-10 opacity-50">
                                        <PlayCircle className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sin lecciones</p>
                                    </div>
                                ) : (
                                    lessons.map((lesson, index) => (
                                        <div
                                            key={lesson.id}
                                            onClick={() => setEditingLesson(lesson)}
                                            className={`p-4 rounded-2xl border transition-all cursor-pointer group ${editingLesson?.id === lesson.id
                                                ? 'bg-white dark:bg-white/5 border-mivn-blue/50 shadow-md ring-2 ring-mivn-blue/10'
                                                : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-mivn-blue/30'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/10 text-[10px] font-bold text-slate-500">
                                                        {index + 1}
                                                    </span>
                                                    <div>
                                                        <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-tight line-clamp-1">
                                                            {lesson.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            {lesson.video_url && (
                                                                <span className="flex items-center gap-1 text-[9px] font-bold text-mivn-blue bg-mivn-blue/10 px-1.5 py-0.5 rounded">
                                                                    <Film className="w-2.5 h-2.5" /> Video
                                                                </span>
                                                            )}
                                                            {lesson.duration_minutes && (
                                                                <span className="flex items-center gap-1 text-[9px] font-medium text-slate-400">
                                                                    <Clock className="w-2.5 h-2.5" /> {lesson.duration_minutes}m
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setEditingLesson(lesson); }}
                                                        className="p-1.5 hover:bg-mivn-blue/10 text-slate-400 hover:text-mivn-blue rounded-lg transition-colors"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDelete(lesson.id); }}
                                                        className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Editor - Right Side */}
                    <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 p-8">
                        {editingLesson ? (
                            <form onSubmit={handleSaveLesson} className="space-y-8 max-w-2xl mx-auto animate-in slide-in-from-right-4 duration-300">
                                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-white/5">
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                                        {editingLesson.id ? 'Editar Lección' : 'Nueva Lección'}
                                    </h4>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setEditingLesson(null)}
                                            className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="px-6 py-2 bg-mivn-blue text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-mivn-blue/20 hover:scale-105 transition-all flex items-center gap-2"
                                        >
                                            <Save className="w-3.5 h-3.5" />
                                            {isSaving ? 'Guardando...' : 'Guardar'}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Título de la Lección</label>
                                        <input
                                            type="text"
                                            value={editingLesson.title || ''}
                                            onChange={(e) => setEditingLesson(prev => ({ ...prev!, title: e.target.value }))}
                                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm focus:border-mivn-blue outline-none transition-all font-bold"
                                            placeholder="Ej: Introducción a la Teología"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Duración (minutos)</label>
                                            <input
                                                type="number"
                                                value={editingLesson.duration_minutes || ''}
                                                onChange={(e) => setEditingLesson(prev => ({ ...prev!, duration_minutes: parseInt(e.target.value) || 0 }))}
                                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm focus:border-mivn-blue outline-none transition-all font-bold"
                                                placeholder="Ej: 45"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Orden</label>
                                            <input
                                                type="number"
                                                value={editingLesson.order_index || lessons.length + 1}
                                                onChange={(e) => setEditingLesson(prev => ({ ...prev!, order_index: parseInt(e.target.value) || 0 }))}
                                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm focus:border-mivn-blue outline-none transition-all font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Enlace de Video (YouTube)</label>
                                        <div className="relative">
                                            <Film className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="url"
                                                value={editingLesson.video_url || ''}
                                                onChange={(e) => setEditingLesson(prev => ({ ...prev!, video_url: e.target.value }))}
                                                className="w-full pl-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm focus:border-mivn-blue outline-none transition-all font-medium font-mono text-mivn-blue"
                                                placeholder="https://youtube.com/watch?v=..."
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-medium ml-2">Pegue el enlace directo del video de YouTube.</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Descripción / Notas</label>
                                        <textarea
                                            value={editingLesson.description || ''}
                                            onChange={(e) => setEditingLesson(prev => ({ ...prev!, description: e.target.value }))}
                                            rows={6}
                                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-5 text-sm focus:border-mivn-blue outline-none transition-all font-medium leading-relaxed"
                                            placeholder="Resumen del contenido de la lección..."
                                        />
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-300 opacity-60">
                                <Film className="w-16 h-16 mb-4" />
                                <p className="text-sm font-bold uppercase tracking-widest">Seleccione o cree una lección</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
