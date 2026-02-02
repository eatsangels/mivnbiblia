"use client";

import { useState } from "react";
import { Search, Award, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { searchStudentsToCertify, issueManualCertificate } from "@/app/(estudio)/admin/courses/actions";
// Actually, to be safe I'll just implement simple useEffect debounce or just onSearch button.

export function ManualCertifier() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isIssuing, setIsIssuing] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSearch = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (query.length < 3) return;

        setIsSearching(true);
        setMessage(null);
        try {
            const data = await searchStudentsToCertify(query);
            setResults(data);
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: "Error al buscar estudiantes." });
        } finally {
            setIsSearching(false);
        }
    };

    const handleIssue = async (userId: string, courseId: string) => {
        setIsIssuing(`${userId}-${courseId}`);
        setMessage(null);
        try {
            await issueManualCertificate(userId, courseId);
            setMessage({ type: 'success', text: "Diploma emitido correctamente." });
            // Refresh results to show status update? simpler to just remove from list or update local state
            setResults(prev => prev.map(u => {
                if (u.id === userId) {
                    return {
                        ...u,
                        enrollments: u.enrollments.map((e: any) =>
                            e.courseId === courseId ? { ...e, completedAt: new Date().toISOString(), progress: 100 } : e
                        )
                    };
                }
                return u;
            }));
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: "Error al emitir diploma." });
        } finally {
            setIsIssuing(null);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 dark:border-white/5 space-y-8">
            <div className="flex items-start gap-6">
                <div className="p-4 bg-mivn-gold/10 rounded-2xl text-mivn-gold shrink-0">
                    <Award className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Emisión Manual de Diplomas</h2>
                    <p className="text-sm text-slate-500 font-medium">Busca un estudiante para otorgarle un certificado manualmente, incluso si no ha completado el 100%.</p>
                </div>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar por nombre, correo o teléfono..."
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 pl-14 pr-32 text-slate-800 dark:text-white font-bold outline-none focus:border-mivn-gold transition-all"
                />
                <button
                    type="submit"
                    disabled={isSearching || query.length < 3}
                    className="absolute right-3 top-2 bottom-2 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                    {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'BUSCAR'}
                </button>
            </form>

            {/* Results */}
            <div className="space-y-4">
                {results.map((user) => (
                    <div key={user.id} className="bg-slate-50 dark:bg-white/5 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden shrink-0">
                                {user.avatar_url ? (
                                    <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">{user.full_name?.[0]}</div>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">{user.full_name}</h3>
                                <p className="text-xs text-slate-500 font-mono">{user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {user.enrollments.length === 0 ? (
                                <p className="text-xs text-slate-400 italic pl-16">Este usuario no está inscrito en ningún curso.</p>
                            ) : (
                                user.enrollments.map((enrollment: any) => (
                                    <div key={enrollment.courseId} className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-white/5 ml-0 md:ml-16">
                                        <div>
                                            <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{enrollment.courseTitle}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-24 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${enrollment.completedAt ? 'bg-emerald-500' : 'bg-mivn-gold'}`} style={{ width: `${enrollment.progress}%` }} />
                                                </div>
                                                <span className="text-[10px] font-mono text-slate-400">{enrollment.progress}%</span>
                                            </div>
                                        </div>

                                        {enrollment.completedAt ? (
                                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
                                                <CheckCircle className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Certificado</span>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleIssue(user.id, enrollment.courseId)}
                                                disabled={isIssuing === `${user.id}-${enrollment.courseId}`}
                                                className="flex items-center gap-2 px-6 py-3 bg-mivn-gold text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-mivn-gold/90 transition-all shadow-lg shadow-mivn-gold/20 disabled:opacity-50"
                                            >
                                                {isIssuing === `${user.id}-${enrollment.courseId}` ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Award className="w-4 h-4" />
                                                )}
                                                Emitir Diploma
                                            </button>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}

                {message && (
                    <div className={`p-4 rounded-xl flex items-center gap-2 text-sm font-bold ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                        {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
}
