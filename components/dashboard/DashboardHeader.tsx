'use client';

import { Sparkles } from 'lucide-react';
import { AvatarUpload } from '@/components/auth/AvatarUpload';
import { LogoutButton } from '@/components/auth/LogoutButton';

interface DashboardHeaderProps {
    user: any;
    profile: any;
}

export function DashboardHeader({ user, profile }: DashboardHeaderProps) {
    return (
        <header className="mb-12 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
                <AvatarUpload
                    userId={user.id}
                    initialUrl={profile?.avatar_url}
                />
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
                        <span className="text-xs font-bold text-gold-500/60 uppercase tracking-[0.3em]">Panel de Control</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Hola, <span className="text-premium-gold drop-shadow-sm">{profile?.full_name?.split(' ')[0] || 'Peregrino'}</span>
                    </h1>
                    <p className="text-gray-400 mt-3 text-lg font-light">
                        {new Date().getHours() < 12 ? 'Buenos días' : new Date().getHours() < 18 ? 'Buenas tardes' : 'Buenas noches'}. Tu santuario personal te espera.
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 text-left md:text-right">
                <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest leading-relaxed">
                    {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <div className="flex md:justify-end">
                    <LogoutButton />
                </div>
            </div>
        </header>
    );
}
