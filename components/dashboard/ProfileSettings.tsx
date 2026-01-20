'use client';

import { useState, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Camera, User, Mail, AtSign, Save, Loader2, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface ProfileData {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    email: string | null;
}

export default function ProfileSettings({ profile }: { profile: ProfileData }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(profile.avatar_url);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        username: profile.username || '',
        full_name: profile.full_name || '',
    });

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const filePath = `${profile.id}-${Math.random()}.${fileExt}`;

        setIsLoading(true);
        setMessage(null);

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) {
            setMessage({ type: 'error', text: 'Error al subir imagen.' });
            setIsLoading(false);
            return;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        // Update profile immediately with new avatar
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ avatar_url: publicUrl })
            .eq('id', profile.id);

        if (updateError) {
            setMessage({ type: 'error', text: 'Error al actualizar perfil.' });
        } else {
            setAvatarUrl(publicUrl);
            setMessage({ type: 'success', text: 'Foto de perfil actualizada.' });
            router.refresh();
        }
        setIsLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        // Basic validation
        if (formData.username.length > 0 && formData.username.length < 3) {
            setMessage({ type: 'error', text: 'El usuario debe tener al menos 3 caracteres.' });
            setIsLoading(false);
            return;
        }

        // Check uniqueness if username changed
        if (formData.username !== profile.username) {
            const { data: existingUser } = await supabase
                .from('profiles')
                .select('id')
                .eq('username', formData.username)
                .neq('id', profile.id) // Exclude self
                .maybeSingle();

            if (existingUser) {
                setMessage({ type: 'error', text: 'Este nombre de usuario ya está en uso.' });
                setIsLoading(false);
                return;
            }
        }

        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: formData.full_name,
                username: formData.username
            })
            .eq('id', profile.id);

        if (error) {
            setMessage({ type: 'error', text: 'Error al guardar cambios.' });
        } else {
            setMessage({ type: 'success', text: 'Perfil actualizado correctamente.' });
            router.refresh();
        }
        setIsLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8 glass-panel rounded-3xl animate-fade-in">
            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-black">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-white/5 text-gray-500">
                                    <User className="w-12 h-12" />
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 p-2 rounded-full bg-gold-500 text-black shadow-lg hover:scale-110 transition-transform"
                        >
                            <Camera className="w-4 h-4" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarUpload}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Foto de Perfil</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSave} className="flex-1 w-full space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block flex items-center gap-2">
                                <User className="w-3 h-3" /> Nombre Completo
                            </label>
                            <input
                                type="text"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-gold-500/50 transition-colors"
                                placeholder="Tu nombre"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block flex items-center gap-2">
                                <AtSign className="w-3 h-3" /> Alias (Usuario)
                            </label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-gold-500/50 transition-colors"
                                placeholder="@usuario"
                            />
                            <p className="text-[10px] text-gray-600 mt-1">Este es tu identificador único en la comunidad.</p>
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block flex items-center gap-2">
                                <Mail className="w-3 h-3" /> Correo Electrónico
                            </label>
                            <input
                                type="email"
                                value={profile.email || ''}
                                disabled
                                className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-gray-500 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {message && (
                        <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {message.type === 'success' ? <Check className="w-4 h-4" /> : null}
                            {message.text}
                        </div>
                    )}

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gold-500 hover:bg-gold-400 text-black font-bold py-2 px-6 rounded-full transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
