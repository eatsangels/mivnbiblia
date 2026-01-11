'use client';

import { LogOut, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-red-400 transition-colors uppercase tracking-widest disabled:opacity-50"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            <span>Cerrar Sesión</span>
        </button>
    );
}
