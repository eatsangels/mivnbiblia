"use client";

import {
    Search, Filter, UploadCloud, TrendingUp, Users, BookOpen,
    Award, ChevronRight, PlayCircle, MoreHorizontal, Download,
    GraduationCap, Clock, Plus, X, Save, Trash2, Edit, Check
} from "lucide-react";
import { useState } from "react";
import type { CourseWithStats, CourseCategory, Course } from "@/app/(estudio)/admin/courses/actions";
import { createCourse, updateCourse, deleteCourse, markAsCertified } from "@/app/(estudio)/admin/courses/actions";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { CourseLessonsManager } from "./CourseLessonsManager";
import { CourseStudentsViewer } from "./CourseStudentsViewer";
import { ManualCertifier } from "./ManualCertifier";

interface CourseManagerProps {
    initialCourses: CourseWithStats[];
    initialStats: {
        activeStudents: number;
        totalCourses: number;
        totalDiplomas: number;
    };
    initialStudentsReady: any[];
    categories: CourseCategory[];
}

export function CourseManager({ initialCourses, initialStats, initialStudentsReady, categories }: CourseManagerProps) {
    const [courses, setCourses] = useState(initialCourses);
    const [stats] = useState(initialStats);
    const [studentsReady, setStudentsReady] = useState(initialStudentsReady);
    const [viewingLessonsFor, setViewingLessonsFor] = useState<string | null>(null);
    const [viewingStudentsFor, setViewingStudentsFor] = useState<string | null>(null);

    // Dialog states
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Partial<CourseWithStats> | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isApproving, setIsApproving] = useState<string | null>(null);

    const handleApproveCertification = async (enrollmentId: string) => {
        setIsApproving(enrollmentId);
        try {
            await markAsCertified(enrollmentId);
            setStudentsReady(prev => prev.filter(s => s.id !== enrollmentId));
        } catch (error) {
            console.error("Error approving certification:", error);
            alert("Error al aprobar la certificación");
        } finally {
            setIsApproving(null);
        }
    };

    // Helper function to get color based on level
    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Básico': return 'bg-mivn-blue';
            case 'Intermedio': return 'bg-emerald-500';
            case 'Avanzado': return 'bg-mivn-gold';
            default: return 'bg-slate-500';
        }
    };

    const handleOpenDialog = (course: Partial<CourseWithStats> | null = null) => {
        setEditingCourse(course || {
            title: '',
            description: '',
            level: 'Básico',
            instructor_name: '',
            category_id: categories[0]?.id || '',
            is_active: true,
            is_published: false,
            thumbnail_url: ''
        });
        setIsDialogOpen(true);
    };

    const handleSaveCourse = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCourse?.title) return;

        setIsSaving(true);
        try {
            if (editingCourse.id) {
                const updated = await updateCourse(editingCourse.id, editingCourse as Partial<Course>);
                setCourses(prev => prev.map(c => c.id === updated.id ? { ...c, ...updated } : c));
            } else {
                const created = await createCourse(editingCourse as Omit<Course, 'id' | 'created_at' | 'updated_at'>);
                setCourses(prev => [{ ...created, enrolled_count: 0, avg_progress: 0, category: categories.find(cat => cat.id === created.category_id) }, ...prev]);
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Error saving course:", error);
            alert("Error al guardar el curso");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este curso?")) return;
        try {
            await deleteCourse(id);
            setCourses(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Page Heading */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Gestión de <span className="text-mivn-blue italic">Cursos</span>
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-2xl">
                        Supervise el progreso académico y gestione el contenido del Instituto Bíblico.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-700 dark:text-white font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                        <Filter className="w-4 h-4" /> Filtrar
                    </button>
                    <button
                        onClick={() => handleOpenDialog()}
                        className="flex items-center gap-2 px-6 py-3 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-mivn-blue/20 hover:scale-105 transition-all"
                    >
                        <UploadCloud className="w-4 h-4" /> Crear Curso
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Estudiantes Activos", value: stats.activeStudents.toString(), change: "Total inscritos", icon: Users, color: "text-mivn-blue", bg: "bg-mivn-blue/10" },
                    { title: "Cursos Disponibles", value: stats.totalCourses.toString(), change: "Activos ahora", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { title: "Diplomas Generados", value: stats.totalDiplomas.toString(), change: "Completados", icon: Award, color: "text-mivn-gold", bg: "bg-mivn-gold/10" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl flex items-start justify-between">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.title}</p>
                            <p className="text-4xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                            <div className="flex items-center gap-2 pt-2">
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{stat.change}</span>
                            </div>
                        </div>
                        <div className={`size-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Courses Catalog */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white">Catálogo de Cursos</h2>
                    <button className="text-mivn-blue text-sm font-bold uppercase tracking-widest hover:underline">Ver todos</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {courses.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-400 text-lg">No hay cursos disponibles</p>
                            <button
                                onClick={() => handleOpenDialog()}
                                className="mt-4 px-6 py-3 bg-mivn-blue text-white rounded-2xl font-bold text-sm hover:bg-sky-600 transition-all flex items-center gap-2 mx-auto"
                            >
                                <Plus className="w-4 h-4" /> Crear Primer Curso
                            </button>
                        </div>
                    ) : (
                        courses.map((course) => (
                            <div key={course.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all group hover:-translate-y-1 relative">
                                <div className="absolute top-4 right-4 z-20 flex gap-2">
                                    <button
                                        onClick={() => handleOpenDialog(course)}
                                        className="size-10 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-white/40 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course.id)}
                                        className="size-10 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-rose-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="h-48 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 flex items-end p-6">
                                        <div className="flex flex-col gap-2">
                                            <span className={`${getLevelColor(course.level || '')} text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg w-fit`}>
                                                {course.level || 'S/N'}
                                            </span>
                                            {course.category && (
                                                <span className="bg-white/10 backdrop-blur-md text-white px-2 py-1 text-[8px] font-bold uppercase tracking-widest rounded-md border border-white/20 w-fit">
                                                    {course.category.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <img src={course.thumbnail_url || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=1000'} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <div className="p-8 space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-4">{course.title}</h3>
                                        <div className="flex flex-col gap-3">
                                            {course.instructor_name && (
                                                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                                                    <Users className="w-4 h-4 text-mivn-blue" /> {course.instructor_name}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                                    <Users className="w-4 h-4" /> {course.enrolled_count} Alumnos
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                                    <PlayCircle className="w-4 h-4" /> {course.total_lessons} Lecciones
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-slate-400">Progreso Global</span>
                                            <span className="text-mivn-blue">{course.avg_progress}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${getLevelColor(course.level || '')}`} style={{ width: `${course.avg_progress}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <button
                                            onClick={() => setViewingLessonsFor(course.id)}
                                            className="py-3 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                        >
                                            Lecciones
                                        </button>
                                        <button
                                            onClick={() => setViewingStudentsFor(course.id)}
                                            className="py-3 border-2 border-mivn-blue/10 text-mivn-blue text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-mivn-blue hover:text-white transition-colors"
                                        >
                                            Ver Alumnos
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Certification Module */}
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl mt-12">
                <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-playfair font-black text-slate-900 dark:text-white">Módulo de Certificación</h2>
                        <p className="text-sm text-slate-500 font-medium mt-1">Listado de alumnos listos para graduación.</p>
                    </div>
                    <button className="flex items-center gap-3 bg-mivn-gold text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-mivn-gold/20 hover:scale-105 transition-all">
                        <Award className="w-5 h-5" /> Generar Diplomas
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-white/5 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em]">
                            <tr>
                                <th className="px-10 py-6">Estudiante</th>
                                <th className="px-10 py-6">Curso Completado</th>
                                <th className="px-10 py-6">Fecha Finalización</th>
                                <th className="px-10 py-6">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {studentsReady.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-10 py-12 text-center">
                                        <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-400 text-sm">No hay estudiantes listos para certificación</p>
                                    </td>
                                </tr>
                            ) : (
                                studentsReady.map((enrollment: any) => (
                                    <tr key={enrollment.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/10 flex items-center justify-center font-bold text-slate-500">
                                                    {enrollment.profiles.full_name?.[0] || 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{enrollment.profiles.full_name || 'Usuario'}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold">{enrollment.profiles.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">{enrollment.courses.title}</span>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                                <Clock className="w-4 h-4" /> Completado
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <button
                                                onClick={() => handleApproveCertification(enrollment.id)}
                                                disabled={isApproving === enrollment.id}
                                                className="flex items-center gap-2 px-6 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50"
                                            >
                                                {isApproving === enrollment.id ? (
                                                    <div className="size-3 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                                                ) : (
                                                    <Check className="w-4 h-4" />
                                                )}
                                                Aprobar Certificación
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12">
                    <ManualCertifier />
                </div>
            </div>

            {/* Course Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500 overflow-y-auto">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[3rem] overflow-hidden flex flex-col shadow-2xl border border-white/10 my-auto">
                        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between sticky top-0 bg-inherit z-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-mivn-blue/10 rounded-2xl text-mivn-blue">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                                        {editingCourse?.id ? 'Editar Curso' : 'Nuevo Curso'}
                                    </h3>
                                    <p className="text-xs text-slate-500 font-medium italic">Complete los detalles académicos del curso.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveCourse} className="p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Left Side: Image */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Miniatura del Curso</label>
                                    <ImageUploader
                                        currentImage={editingCourse?.thumbnail_url || ''}
                                        onUploadComplete={(url) => setEditingCourse(prev => ({ ...prev, thumbnail_url: url }))}
                                        folder="courses"
                                    />
                                </div>

                                {/* Right Side: Details */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Título del Curso</label>
                                        <input
                                            type="text"
                                            value={editingCourse?.title || ''}
                                            onChange={(e) => setEditingCourse(prev => ({ ...prev, title: e.target.value }))}
                                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm focus:border-mivn-blue outline-none transition-all font-bold"
                                            placeholder="Ej: Fundamentos de la Fe"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Categoría</label>
                                            <select
                                                value={editingCourse?.category_id || ''}
                                                onChange={(e) => setEditingCourse(prev => ({ ...prev, category_id: e.target.value }))}
                                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm focus:border-mivn-blue outline-none transition-all font-bold appearance-none"
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nivel</label>
                                            <select
                                                value={editingCourse?.level || 'Básico'}
                                                onChange={(e) => setEditingCourse(prev => ({ ...prev, level: e.target.value }))}
                                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm focus:border-mivn-blue outline-none transition-all font-bold appearance-none"
                                            >
                                                <option value="Básico">Básico</option>
                                                <option value="Intermedio">Intermedio</option>
                                                <option value="Avanzado">Avanzado</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Instructor</label>
                                        <input
                                            type="text"
                                            value={editingCourse?.instructor_name || ''}
                                            onChange={(e) => setEditingCourse(prev => ({ ...prev, instructor_name: e.target.value }))}
                                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm focus:border-mivn-blue outline-none transition-all font-bold"
                                            placeholder="Nombre del instructor"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Descripción</label>
                                <textarea
                                    value={editingCourse?.description || ''}
                                    onChange={(e) => setEditingCourse(prev => ({ ...prev, description: e.target.value }))}
                                    rows={4}
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 text-sm focus:border-mivn-blue outline-none transition-all font-medium leading-relaxed"
                                    placeholder="Describa los objetivos del curso..."
                                />
                            </div>

                            <div className="flex items-center justify-between pt-6">
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={editingCourse?.is_published || false}
                                            onChange={(e) => setEditingCourse(prev => ({ ...prev, is_published: e.target.checked }))}
                                            className="hidden"
                                        />
                                        <div className={`size-6 rounded-lg border-2 flex items-center justify-center transition-all ${editingCourse?.is_published ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20' : 'border-slate-200 dark:border-white/10 group-hover:border-emerald-500/50'}`}>
                                            {editingCourse?.is_published && <span className="text-white text-xs font-black">✓</span>}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-500 transition-colors">Publicado</span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={editingCourse?.is_active || false}
                                            onChange={(e) => setEditingCourse(prev => ({ ...prev, is_active: e.target.checked }))}
                                            className="hidden"
                                        />
                                        <div className={`size-6 rounded-lg border-2 flex items-center justify-center transition-all ${editingCourse?.is_active ? 'bg-mivn-blue border-mivn-blue shadow-lg shadow-mivn-blue/20' : 'border-slate-200 dark:border-white/10 group-hover:border-mivn-blue/50'}`}>
                                            {editingCourse?.is_active && <span className="text-white text-xs font-black">✓</span>}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-mivn-blue transition-colors">Activo</span>
                                    </label>
                                </div>

                                <div className="flex items-center gap-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsDialogOpen(false)}
                                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    {editingCourse?.id && (
                                        <button
                                            type="button"
                                            onClick={() => { setIsDialogOpen(false); setViewingLessonsFor(editingCourse.id!); }}
                                            className="hidden md:block px-4 py-2 border-2 border-mivn-blue rounded-xl text-[10px] font-black uppercase tracking-widest text-mivn-blue hover:bg-mivn-blue hover:text-white transition-all"
                                        >
                                            Gestionar Lecciones (Videos)
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex items-center gap-4 px-10 py-5 bg-mivn-blue text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <>
                                                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                {editingCourse?.id ? 'Guardar Cambios' : 'Crear Curso'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Lessons Manager */}
            {viewingLessonsFor && (
                <CourseLessonsManager
                    courseId={viewingLessonsFor}
                    courseTitle={courses.find(c => c.id === viewingLessonsFor)?.title || 'Curso'}
                    onClose={() => setViewingLessonsFor(null)}
                />
            )}

            {/* Students Viewer */}
            {viewingStudentsFor && (
                <CourseStudentsViewer
                    courseId={viewingStudentsFor}
                    courseTitle={courses.find(c => c.id === viewingStudentsFor)?.title || 'Curso'}
                    onClose={() => setViewingStudentsFor(null)}
                />
            )}
        </div>
    );
}
