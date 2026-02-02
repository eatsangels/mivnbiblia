"use client";

import { useState, useEffect } from "react";
import { X, Users, CheckCircle, Clock, Search } from "lucide-react";
import { getCourseStudents } from "@/app/(estudio)/admin/courses/actions";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface CourseStudentsViewerProps {
    courseId: string;
    courseTitle: string;
    onClose: () => void;
}

export function CourseStudentsViewer({ courseId, courseTitle, onClose }: CourseStudentsViewerProps) {
    const [students, setStudents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadStudents();
    }, [courseId]);

    const loadStudents = async () => {
        try {
            const data = await getCourseStudents(courseId);
            setStudents(data || []);
        } catch (error) {
            console.error("Error loading students:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredStudents = students.filter(student =>
        student.profiles.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.profiles.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[85vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl border border-white/10">

                {/* Header */}
                <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-white dark:bg-slate-900 z-10 shrink-0">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-mivn-blue/10 text-mivn-blue text-[10px] font-black uppercase tracking-widest rounded-lg">
                                Estudiantes Inscritos
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                                {courseTitle}
                            </h3>
                        </div>
                        <p className="text-xs text-slate-500 font-medium italic mt-1 ml-1">
                            {students.length} {students.length === 1 ? 'Alumno' : 'Alumnos'} en total
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-400 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="px-8 py-4 border-b border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900 shrink-0">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar alumno por nombre o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-mivn-blue transition-colors"
                        />
                    </div>
                </div>

                {/* Students List */}
                <div className="flex-1 overflow-y-auto p-0">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 dark:bg-white/5 sticky top-0 z-10 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em]">
                            <tr>
                                <th className="px-8 py-4">Estudiante</th>
                                <th className="px-8 py-4">Fecha Inscripción</th>
                                <th className="px-8 py-4 text-center">Progreso</th>
                                <th className="px-8 py-4 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-12 text-center text-slate-400 text-xs">
                                        Cargando estudiantes...
                                    </td>
                                </tr>
                            ) : filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-12 text-center">
                                        <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-400 text-sm font-medium">No se encontraron estudiantes.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredStudents.map((enrollment) => (
                                    <tr key={enrollment.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center overflow-hidden font-bold text-slate-500 shrink-0">
                                                    {enrollment.profiles?.avatar_url ? (
                                                        <img src={enrollment.profiles.avatar_url} alt={enrollment.profiles.full_name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        (enrollment.profiles.full_name?.[0] || 'U')
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1">
                                                        {enrollment.profiles.full_name || 'Usuario'}
                                                    </p>
                                                    <p className="text-[10px] text-slate-400 font-medium font-mono">
                                                        {enrollment.profiles.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-xs font-medium text-slate-500">
                                            {format(new Date(enrollment.enrolled_at), "dd MMM yyyy", { locale: es })}
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-xs font-black text-slate-700 dark:text-white">
                                                    {enrollment.progress_percentage}%
                                                </span>
                                                <div className="w-20 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${enrollment.progress_percentage === 100 ? 'bg-emerald-500' : 'bg-mivn-blue'}`}
                                                        style={{ width: `${enrollment.progress_percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            {enrollment.completed_at ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                                    <CheckCircle className="w-3 h-3" /> Completado
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-sky-500/10 text-sky-500 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                                    <Clock className="w-3 h-3" /> En curso
                                                </span>
                                            )}
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
