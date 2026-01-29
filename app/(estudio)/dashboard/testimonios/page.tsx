import { getUserTestimonies } from "./actions";
import { TestimonyForm } from "@/components/dashboard/TestimonyForm";
import { MessageSquareHeart, Clock, CheckCircle2, Star, Edit, Trash2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";

export default async function TestimoniosPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    const testimonies = await getUserTestimonies();

    return (
        <div className="min-h-screen bg-[#F8FAFB] dark:bg-[#05070a] transition-colors duration-500">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#05070a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 h-20">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 relative transition-transform group-hover:scale-110">
                            <Image src="/logo_mivn.png" alt="MIVN" fill className="object-contain" />
                        </div>
                        <h2 className="text-xl font-bold font-playfair tracking-tighter text-mivn-blue dark:text-white uppercase">MIVN</h2>
                    </Link>

                    <div className="flex items-center gap-8">
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-mivn-blue transition-colors">Dashboard</Link>
                            <Link href="/eventos" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-mivn-blue transition-colors">Eventos</Link>
                            <Link href="/cultos" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-mivn-blue transition-colors">Sermones</Link>
                        </nav>

                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 hidden md:block" />

                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-mivn-blue transition-all">
                                <Home className="w-5 h-5" />
                            </Link>
                            <div className="w-10 h-10 rounded-full bg-mivn-blue/20 border-2 border-mivn-blue flex items-center justify-center overflow-hidden">
                                {profile?.avatar_url ? (
                                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="font-bold text-mivn-blue">{profile?.full_name?.[0] || 'U'}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-16 space-y-8">
                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-mivn-blue to-purple-500 mb-4">
                        <MessageSquareHeart className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                        Mis Testimonios
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Comparte cómo Dios ha transformado tu vida. Tu testimonio puede ser la luz que alguien necesita hoy.
                    </p>
                </div>

                {/* Submission Form */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl">
                    <TestimonyForm />
                </div>

                {/* User's Testimonies */}
                {testimonies.length > 0 && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
                                Tus Testimonios Enviados
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
                        </div>

                        <div className="grid gap-4">
                            {testimonies.map((testimony: any) => (
                                <TestimonyCard key={testimony.id} testimony={testimony} />
                            ))}
                        </div>
                    </div>
                )}

                {testimonies.length === 0 && (
                    <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                            <MessageSquareHeart className="w-10 h-10 text-slate-400" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400">
                            Aún no has enviado ningún testimonio
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}

function TestimonyCard({ testimony }: { testimony: any }) {
    const getStatusBadge = () => {
        if (testimony.is_featured) {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold">
                    <Star className="w-3 h-3" />
                    Destacado
                </span>
            );
        }
        if (testimony.is_approved) {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    Aprobado
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
                <Clock className="w-3 h-3" />
                Pendiente
            </span>
        );
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:border-mivn-blue/20 transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                    {testimony.author_role && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-mivn-blue">
                            {testimony.author_role}
                        </span>
                    )}
                    {getStatusBadge()}
                </div>
                {!testimony.is_approved && (
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            <Edit className="w-4 h-4 text-slate-500" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {testimony.content}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400">
                    Enviado el {new Date(testimony.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>
        </div>
    );
}
