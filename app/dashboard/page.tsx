import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import { Calendar, TrendingUp, Book, Sparkles, Church, Compass, MessageSquare, ArrowRight, PenTool, Heart, Cross } from 'lucide-react';
import Link from 'next/link';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch real profile data
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single() as any;

    const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single() as any;

    // Fetch a random verse for "Verse of the Day"
    // Using a simpler approach for now: fetch 1 from a random offset (though random is hard in pure SQL without custom functions)
    // We'll use a semi-random approach by fetching a verse based on the day of the year
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    // There are ~31,102 verses in the table
    // Fetch verse of the day (mock logic for now, random or specific)
    const { data: verseOfTheDay } = await supabase
        .from("scriptures")
        .select("*")
        .eq("book_name", "Salmos")
        .eq("chapter", 119)
        .eq("verse_number", 105)
        .eq("verse_number", 105)
        .maybeSingle() as any;

    const { data: recentSermon } = await supabase
        .from('sermons')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle() as any;

    return (
        <div className="min-h-screen bg-[#05070a] text-white p-6 md:p-12 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

            <DashboardHeader user={user} profile={profile} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 relative z-10">
                {/* Verse of the Day - Large Card */}
                <div className="lg:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden group border-gold-500/10 hover:border-gold-500/30 transition-all duration-500 shadow-2xl shadow-black/50">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Book className="w-32 h-32 text-gold-500 rotate-12" />
                    </div>

                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <span className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-6">
                                Versículo del Día
                            </span>
                            <blockquote className="font-libre italic text-2xl md:text-3xl text-gray-100 leading-relaxed mb-6">
                                "{verseOfTheDay?.content || "Lámpara es a mis pies tu palabra, Y lumbrera a mi camino."}"
                            </blockquote>
                            <cite className="not-italic text-gold-500 font-bold tracking-widest uppercase text-sm">
                                — {verseOfTheDay ? `${verseOfTheDay.book_name} ${verseOfTheDay.chapter}:${verseOfTheDay.verse_number}` : 'Salmos 119:105'}
                            </cite>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
                            <Link href="/read" className="text-xs font-bold text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-2 group/link">
                                SEGUIR LEYENDO <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="glass-panel p-6 rounded-2xl border-white/5 flex items-center gap-5 hover:bg-white/10 transition-all cursor-default overflow-hidden group">
                        <div className="p-3 bg-gold-500/10 rounded-xl text-gold-500 group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Racha Actual</p>
                            <p className="text-2xl font-bold text-white leading-none">
                                {progress?.current_streak || 0} <span className="text-xs font-normal text-gray-500 ml-1">días</span>
                            </p>
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border-white/5 flex items-center gap-5 hover:bg-white/10 transition-all cursor-default overflow-hidden group">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform">
                            <Book className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Capítulos Leídos</p>
                            <p className="text-2xl font-bold text-white leading-none">
                                {progress?.total_chapters_read || 0}
                            </p>
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border-white/5 flex items-center gap-5 hover:bg-white/10 transition-all cursor-default overflow-hidden group">
                        <div className="p-3 bg-green-500/10 rounded-xl text-green-500 group-hover:scale-110 transition-transform">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Última Actividad</p>
                            <p className="text-sm font-bold text-white mt-1">
                                {progress?.last_read_at
                                    ? new Date(progress.last_read_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
                                    : 'Sin actividad'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.4em] mb-6 px-2 relative z-10">Accesos Rápidos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 relative z-10">
                <Link href="/temple" className="group relative glass-panel p-6 rounded-2xl border-gold-500/5 hover:border-gold-500/30 transition-all text-center">
                    <div className="mx-auto w-12 h-12 bg-gold-950/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-gold-900/20">
                        <Church className="w-6 h-6 text-gold-500" />
                    </div>
                    <span className="text-sm font-bold text-gray-300 group-hover:text-gold-400 transition-colors">Santuario 3D</span>
                    <p className="text-[10px] text-gray-600 mt-1">Meditación inmersiva</p>
                </Link>

                <Link href="/read" className="group relative glass-panel p-6 rounded-2xl border-white/5 hover:border-white/20 transition-all text-center">
                    <div className="mx-auto w-12 h-12 bg-blue-950/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/20">
                        <Compass className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className="text-sm font-bold text-gray-300 group-hover:text-blue-400 transition-colors">Mi Biblia</span>
                    <p className="text-[10px] text-gray-600 mt-1">Lector inteligente</p>
                </Link>

                <Link href="/read" className="group relative glass-panel p-6 rounded-2xl border-white/5 hover:border-white/20 transition-all text-center">
                    <div className="mx-auto w-12 h-12 bg-purple-950/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-purple-900/20">
                        <MessageSquare className="w-6 h-6 text-purple-400" />
                    </div>
                    <span className="text-sm font-bold text-gray-300 group-hover:text-purple-400 transition-colors">Mis Notas</span>
                    <p className="text-[10px] text-gray-600 mt-1">Diario espiritual</p>
                </Link>

                <Link href={recentSermon ? `/read/${recentSermon.reference_book}/${recentSermon.reference_chapter}?workshop=true` : `/read/Juan/1?workshop=true`} className="group relative glass-panel p-6 rounded-2xl border-white/5 hover:border-gold-500/20 transition-all text-center">
                    <div className="mx-auto w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-gold-900/10">
                        <PenTool className="w-6 h-6 text-gold-500" />
                    </div>
                    <span className="text-sm font-bold text-gray-300 group-hover:text-gold-400 transition-colors">Taller</span>
                    <p className="text-[10px] text-gray-600 mt-1 line-clamp-1">{recentSermon ? recentSermon.title : 'Nueva Prédica'}</p>
                </Link>
            </div>

            {/* Continue Reading Section */}
            <div className="relative z-10 glass-panel rounded-3xl p-8 border-white/5">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-gray-200">Continuar Lectura</h3>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">PROGRESO PERSONAL</div>
                </div>

                <Link href={`/read/${progress?.last_book || 'Génesis'}/${progress?.last_chapter || 1}`} className="block group">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-center justify-between hover:bg-white/10 transition-all shadow-xl">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-900 to-gold-700 flex items-center justify-center text-gold-100 font-serif text-2xl font-bold shadow-lg shadow-gold-900/40 group-hover:scale-105 transition-transform">
                                {(progress?.last_book || 'Gn').substring(0, 2)}
                            </div>
                            <div>
                                <p className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">{progress?.last_book || 'Génesis'}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-xs text-gray-400">Capítulo {progress?.last_chapter || 1}</span>
                                    <div className="w-1 h-1 bg-gray-600 rounded-full" />
                                    <span className="text-xs text-gold-500/80">Continúa tu viaje espiritual</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex flex-col items-end gap-2 text-right">
                            <div className="text-xs text-gray-500 font-medium">
                                {progress?.last_read_at ? `Leído el ${new Date(progress.last_read_at).toLocaleDateString()}` : 'Comienza hoy'}
                            </div>
                            <span className="bg-gold-500 hover:bg-gold-400 text-gold-950 font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-gold-500/20 active:scale-95">
                                REANUDAR
                            </span>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Global Credit Footer */}
            <footer className="mt-24 pt-12 border-t border-white/5 text-center relative z-10">
                <div className="max-w-xl mx-auto space-y-6">
                    <Cross className="w-6 h-6 text-gold-500/20 mx-auto" />
                    <div className="space-y-4">
                        <p className="text-[10px] text-gray-600 font-medium italic">
                            Esta plataforma fue desarrollada por <Link href="https://etrinidad.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-400 transition-colors underline decoration-gold-500/20 underline-offset-4">Edward Trinidad</Link>
                        </p>
                        <div className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.3em] text-gray-700 font-black">
                            Hecho con <Heart className="w-2.5 h-2.5 text-red-500/40 fill-red-500/40 animate-pulse" /> Soli Deo Gloria
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}


