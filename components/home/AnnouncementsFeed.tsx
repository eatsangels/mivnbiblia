"use client";

import { Bell, Calendar, Pin } from "lucide-react";
import type { Announcement } from "@/lib/queries/announcements";

interface AnnouncementsFeedProps {
    announcements: Announcement[];
}

export function AnnouncementsFeed({ announcements }: AnnouncementsFeedProps) {
    if (!announcements.length) return null;

    // Helper to format date relative (e.g., "Hace 2 horas")
    const getRelativeDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return "Hace un momento";
        if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`;
        if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;
        if (diffInSeconds < 172800) return "Ayer";
        return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
    };

    // Helper to format role
    const getRoleLabel = (role: string | null) => {
        if (!role) return "Miembro";
        if (role === 'admin' || role === 'super_admin') return "Administrador";
        if (role === 'pastor') return "Pastor";
        if (role === 'lider') return "Líder";
        return "Miembro";
    };

    return (
        <section className="bg-mivn-yellow/5 dark:bg-yellow-900/10">
            <div className="max-w-[1400px] mx-auto px-6 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <div className="size-10 rounded-full bg-mivn-yellow/20 flex items-center justify-center text-mivn-yellow animate-pulse">
                        <Bell className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white">
                        Avisos Importantes
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {announcements.map((announcement) => (
                        <div
                            key={announcement.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4">
                                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-mivn-yellow bg-mivn-yellow/10 px-2 py-1 rounded-full">
                                    <Pin className="w-3 h-3" />
                                    Fijado
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                {announcement.profiles?.avatar_url ? (
                                    <div className="relative size-12 flex-shrink-0">
                                        <img
                                            src={announcement.profiles.avatar_url}
                                            alt={`${announcement.profiles.first_name || ''} ${announcement.profiles.last_name || ''}`.trim() || "Author"}
                                            className="size-12 rounded-xl object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="size-12 rounded-xl bg-mivn-blue/10 flex items-center justify-center text-mivn-blue flex-shrink-0">
                                        <span className="font-bold text-lg">
                                            {announcement.profiles?.first_name ? announcement.profiles.first_name[0].toUpperCase() :
                                                announcement.profiles?.last_name ? announcement.profiles.last_name[0].toUpperCase() : "M"}
                                        </span>
                                    </div>
                                )}
                                <div className="space-y-3 flex-1">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-slate-900 dark:text-white">
                                                {announcement.profiles?.first_name || announcement.profiles?.last_name
                                                    ? `${announcement.profiles.first_name || ''} ${announcement.profiles.last_name || ''}`.trim()
                                                    : "Ministerio"}
                                            </h3>
                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded">
                                                {getRoleLabel(announcement.profiles?.roles?.[0] || null)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                            {getRelativeDate(announcement.created_at)}
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-300 italic border-l-2 border-mivn-blue">
                                        "{announcement.message}"
                                    </div>

                                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/50">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(announcement.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
