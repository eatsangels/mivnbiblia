'use client';

import { useState } from 'react';
import { Heart, HandHeart, Send } from 'lucide-react';
import { createPrayerRequest, joinPrayerRequest } from '@/app/(website)/oracion/actions';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import Swal from 'sweetalert2';

interface PrayerRequest {
    id: string;
    requester_name: string;
    request: string;
    created_at: string;
    is_anonymous: boolean;
    is_answered: boolean;
    intersession_count?: number;
}

interface DashboardPrayerSectionProps {
    initialRequests: PrayerRequest[];
    userName: string;
}

export function DashboardPrayerSection({ initialRequests, userName }: DashboardPrayerSectionProps) {
    const [requests, setRequests] = useState(initialRequests);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleJoinPrayer = async (requestId: string) => {
        const result = await joinPrayerRequest(requestId);
        if (result.success) {
            // Optimistic update or just rely on revalidatePath
            // For immediate feedback in this simple component:
            setRequests(prev => prev.map(r =>
                r.id === requestId
                    ? { ...r, intersession_count: (r.intersession_count || 0) + 1 }
                    : r
            ));

            Swal.fire({
                title: '¡Amén!',
                text: 'Te has unido en oración por esta petición.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                title: 'Atención',
                text: result.message,
                icon: 'info',
            });
        }
    };

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);

        // Add name if not present (dashboard form doesn't have it)
        formData.append('name', userName);

        const result = await createPrayerRequest(null, formData);
        setIsSubmitting(false);

        if (result.success) {
            Swal.fire({
                title: '¡Petición Enviada!',
                text: 'Tu petición será revisada por nuestro equipo.',
                icon: 'success',
                confirmButtonColor: '#4AA3DF',
            });
            // Reset form logic would go here if we were using a ref
            (document.getElementById('dash-prayer-form') as HTMLFormElement)?.reset();
        } else {
            Swal.fire({
                title: 'Error',
                text: result.message,
                icon: 'error',
            });
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    return (
        <section className="space-y-8">
            <div className="flex items-center gap-4">
                <Heart className="w-6 h-6 text-rose-500" />
                <h3 className="text-2xl font-playfair font-bold text-slate-800 dark:text-white">Peticiones de Oración</h3>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
                <div className="p-6 md:p-10 border-b border-slate-50 dark:border-white/5">
                    <form id="dash-prayer-form" action={handleSubmit} className="space-y-6">
                        <textarea
                            name="request"
                            className="w-full p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-mivn-blue outline-none text-sm placeholder:text-slate-400 min-h-[140px] italic font-light transition-all"
                            placeholder={`¿Cómo podemos clamar por ti hoy, ${userName.split(' ')[0]}?`}
                            required
                        ></textarea>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="isAnonymous" className="sr-only peer" />
                                    <div className="w-12 h-6 bg-slate-200 dark:bg-white/10 rounded-full peer peer-checked:bg-mivn-blue transition-all" />
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6" />
                                </label>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Petición Privada</span>
                                <input type="hidden" name="visibility" value="public" />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-mivn-blue text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Petición'}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    <div className="divide-y divide-slate-50 dark:divide-white/5">
                        {requests.length === 0 ? (
                            <p className="p-10 text-center text-slate-400 italic text-sm">No hay peticiones públicas recientes.</p>
                        ) : (
                            requests.map((p) => (
                                <div key={p.id} className="p-6 md:p-10 flex gap-4 md:gap-8 items-start hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                    <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center font-bold text-lg bg-mivn-blue/10 text-mivn-blue border border-current shadow-sm`}>
                                        {p.is_anonymous ? "?" : getInitials(p.requester_name)}
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <p className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                                                {p.is_anonymous ? "Anónimo" : p.requester_name}
                                            </p>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                                                {formatDistanceToNow(new Date(p.created_at), { addSuffix: true, locale: es })}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 font-light italic leading-relaxed">"{p.request}"</p>
                                        <button
                                            onClick={() => handleJoinPrayer(p.id)}
                                            className="flex items-center gap-3 text-mivn-blue text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all bg-mivn-blue/5 px-6 py-2.5 rounded-full border border-mivn-blue/10"
                                        >
                                            <HandHeart className="w-4 h-4" /> Estoy Orando ({p.intersession_count || 0})
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
