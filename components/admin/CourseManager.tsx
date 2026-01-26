"use client";

import {
    Search, Filter, UploadCloud, TrendingUp, Users, BookOpen,
    Award, ChevronRight, PlayCircle, MoreHorizontal, Download,
    GraduationCap, Clock, Plus
} from "lucide-react";
import { useState } from "react";
import type { CourseWithStats } from "@/app/(estudio)/admin/courses/actions";

interface CourseManagerProps {
    initialCourses: CourseWithStats[];
    initialStats: {
        activeStudents: number;
        totalCourses: number;
        totalDiplomas: number;
    };
    initialStudentsReady: any[];
}

export function CourseManager({ initialCourses, initialStats, initialStudentsReady }: CourseManagerProps) {
    const [courses] = useState(initialCourses);
    const [stats] = useState(initialStats);
    const [studentsReady] = useState(initialStudentsReady);

    // Helper function to get color based on level
    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Básico': return 'bg-mivn-blue';
            case 'Intermedio': return 'bg-emerald-500';
            case 'Avanzado': return 'bg-mivn-gold';
            default: return 'bg-slate-500';
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
                    <button className="flex items-center gap-2 px-6 py-3 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-mivn-blue/20 hover:scale-105 transition-all">
                        <UploadCloud className="w-4 h-4" /> Subir Lección
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
                            <button className="mt-4 px-6 py-3 bg-mivn-blue text-white rounded-2xl font-bold text-sm hover:bg-sky-600 transition-all flex items-center gap-2 mx-auto">
                                <Plus className="w-4 h-4" /> Crear Primer Curso
                            </button>
                        </div>
                    ) : (
                        courses.map((course) => (
                            <div key={course.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all group hover:-translate-y-1">
                                <div className="h-48 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 flex items-end p-6">
                                        <span className={`${getLevelColor(course.level)} text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg`}>
                                            {course.level}
                                        </span>
                                    </div>
                                    <img src={course.thumbnail_url || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=1000'} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <div className="p-8 space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-4">{course.title}</h3>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                                                <Users className="w-4 h-4" /> {course.enrolled_count} Alumnos
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                                                <PlayCircle className="w-4 h-4" /> {course.total_lessons} Lecciones
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-slate-400">Progreso Global</span>
                                            <span className="text-mivn-blue">{course.avg_progress}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${getLevelColor(course.level)}`} style={{ width: `${course.avg_progress}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <button className="py-3 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                                            Gestionar
                                        </button>
                                        <button className="py-3 border-2 border-mivn-blue/10 text-mivn-blue text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-mivn-blue hover:text-white transition-colors">
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
                                            <button className="flex items-center gap-2 text-mivn-blue text-[10px] font-black uppercase tracking-widest hover:underline group-hover:scale-105 transition-transform">
                                                <Download className="w-4 h-4" /> Descargar PDF
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
