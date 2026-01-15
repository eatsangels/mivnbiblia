'use client';

import { useState } from 'react';
import { Trash2, Loader2, RefreshCcw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function ResetProgressButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleReset = async () => {
        if (!confirm('¿Estás seguro de que quieres borrar todo tu historial de lectura? Esta acción no se puede deshacer.')) return;

        setLoading(true);
        try {
            const { error } = await supabase.rpc('reset_reading_progress');
            if (error) throw error;
            router.refresh();
        } catch (err) {
            console.error('Error resetting progress:', err);
            alert('Error al reiniciar el progreso.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleReset}
            disabled={loading}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-500/60 hover:text-red-400 text-xs font-bold uppercase tracking-widest transition-all mb-4 mx-auto"
        >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3 group-hover:rotate-12 transition-transform" />}
            {loading ? 'Borrando...' : 'Reiniciar Progreso'}
        </button>
    );
}
