"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
    User, Mail, Phone, Calendar, MapPin, Church,
    Heart, Shield, Bell, LogOut, Save, Camera,
    Check, Loader2, Star, Users, Home, BookOpen,
    ArrowLeft, BellRing, UserCheck, ShieldCheck, Info, Scissors, X
} from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/image-utils";
import { signCloudinaryParameters } from "@/app/actions/cloudinary";

export interface ProfileData {
    id: string;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    email: string | null;
    phone?: string | null;
    birth_date?: string | null;
    address?: string | null;
    small_group?: string | null;
    ministry?: string | null;
    baptism_date?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    is_location_public?: boolean | null;
    role?: string | null;
}

export default function ProfileSettings({ profile }: { profile: ProfileData }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(profile.avatar_url);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeSection, setActiveSection] = useState("personal");

    // Cropping states
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const [formData, setFormData] = useState({
        username: profile.username || '',
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
        birth_date: profile.birth_date || '',
        address: profile.address || '',
        latitude: profile.latitude || 0,
        longitude: profile.longitude || 0,
        is_location_public: profile.is_location_public || false,
        ministry: profile.ministry || '',
        notifications_email: true,
        notifications_push: false,
    });

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleUploadToCloudinary = async (fileBlob: Blob | File) => {
        setIsLoading(true);
        setMessage(null);

        try {
            const { timestamp, signature } = await signCloudinaryParameters({ folder: "avatars" });

            const formDataToCloudinary = new FormData();
            formDataToCloudinary.append("file", fileBlob);
            formDataToCloudinary.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
            formDataToCloudinary.append("timestamp", timestamp.toString());
            formDataToCloudinary.append("signature", signature);
            formDataToCloudinary.append("folder", "avatars");

            const uploadResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formDataToCloudinary,
                }
            );

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                throw new Error(errorData.error?.message || "Error al subir archivo a Cloudinary");
            }

            const uploadData = await uploadResponse.json();
            const publicUrl = uploadData.secure_url;

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('id', profile.id);

            if (updateError) throw updateError;

            setAvatarUrl(publicUrl);
            setMessage({ type: 'success', text: 'Foto de perfil actualizada.' });
            setImageToCrop(null);
            router.refresh();
        } catch (error: any) {
            console.error('Avatar upload error:', error);
            setMessage({ type: 'error', text: error.message || 'Error al subir imagen.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImageToCrop(reader.result?.toString() || null);
        });
        reader.readAsDataURL(file);
    };

    const confirmCrop = async () => {
        if (!imageToCrop || !croppedAreaPixels) return;

        try {
            const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
            if (croppedImage) {
                await handleUploadToCloudinary(croppedImage);
            }
        } catch (e) {
            console.error(e);
            setMessage({ type: 'error', text: "Error al procesar el recorte de la imagen" });
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const { error } = await supabase
            .from('profiles')
            .update({
                first_name: formData.first_name,
                last_name: formData.last_name,
                username: formData.username,
                phone: formData.phone,
                birth_date: formData.birth_date || null,
                address: formData.address || null,
                latitude: formData.latitude || null,
                longitude: formData.longitude || null,
                is_location_public: formData.is_location_public,
                ministry: formData.ministry || null
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

    const navItems = [
        { id: "personal", label: "Información Personal", icon: User },
        { id: "spiritual", label: "Historial Espiritual", icon: Church },
        { id: "donations", label: "Mis Donaciones", icon: Heart },
        { id: "security", label: "Seguridad", icon: ShieldCheck },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 font-lexend">

            {/* 1. Sidebar Navigation */}
            <aside className="w-full lg:w-80 flex flex-col gap-6 lg:gap-8">
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl space-y-6 md:space-y-8">

                    {/* User Mini Profile */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="relative group">
                            <div className="w-28 h-28 rounded-[2.5rem] overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800 transition-transform duration-500 group-hover:scale-105">
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                        onError={() => setAvatarUrl(null)} // Fallback on error
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        <User className="w-12 h-12" />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute -bottom-2 -right-2 p-3 rounded-2xl bg-mivn-blue text-white shadow-lg hover:scale-110 transition-transform border-4 border-white dark:border-slate-900"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                            <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} className="hidden" accept="image/*" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                {formData.first_name} {formData.last_name}
                            </h3>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <span className="bg-mivn-blue/10 text-mivn-blue px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-mivn-blue/20">
                                    {(profile.role === 'admin' && 'Administrador') ||
                                        (profile.role === 'super_admin' && 'Súper Admin') ||
                                        (profile.role === 'member' && 'Miembro') ||
                                        (profile.role === 'pastor' && 'Pastor') ||
                                        (profile.role === 'leader' && 'Líder') ||
                                        (profile.role === 'treasurer' && 'Tesorero') ||
                                        (profile.role === 'content_editor' && 'Editor de Contenido') ||
                                        profile.role || "Miembro"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Nav Menu */}
                    <nav className="space-y-2">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    if (item.id === 'donations') {
                                        router.push('/dashboard/donations');
                                    } else {
                                        setActiveSection(item.id);
                                    }
                                }}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeSection === item.id
                                    ? "bg-mivn-blue text-white shadow-xl shadow-mivn-blue/20"
                                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5"}`}
                            >
                                <item.icon className={`w-5 h-5 ${activeSection === item.id ? "text-white" : "text-mivn-blue"}`} />
                                <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="pt-6 border-t border-slate-50 dark:border-white/5">
                        <button
                            onClick={() => supabase.auth.signOut().then(() => router.push('/login'))}
                            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all"
                        >
                            <LogOut className="w-4 h-4" /> Cerrar Sesión
                        </button>
                    </div>
                </div>
            </aside>

            {/* 2. Main Content Area */}
            <div className="flex-1 space-y-8">

                {/* Header Profile */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 transition-transform">
                        <UserCheck className="w-48 h-48 text-mivn-blue" />
                    </div>
                    <div className="relative z-10 space-y-4">
                        <h2 className="text-4xl font-playfair font-bold text-slate-900 dark:text-white uppercase tracking-tight">Perfil de Usuario</h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 font-light italic max-w-2xl leading-relaxed">
                            "Gestiona tu información personal y compromiso ministerial con nuestra familia MIVN."
                        </p>
                    </div>
                </div>

                {/* Body Form */}
                <form onSubmit={handleSave} className="space-y-8 pb-20">

                    {/* Information Section */}
                    {activeSection === "personal" && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="px-10 py-8 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 flex items-center gap-4">
                                <div className="w-10 h-10 bg-mivn-blue/10 rounded-xl flex items-center justify-center text-mivn-blue">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Información Personal</h3>
                            </div>

                            <div className="p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Nombre(s)</label>
                                    <input
                                        type="text"
                                        value={formData.first_name}
                                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none font-medium"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Apellido(s)</label>
                                    <input
                                        type="text"
                                        value={formData.last_name}
                                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none font-medium"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        value={profile.email || ''}
                                        disabled
                                        className="w-full bg-slate-100 dark:bg-white/5 border border-transparent rounded-2xl py-5 px-8 text-slate-400 cursor-not-allowed italic"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Teléfono</label>
                                    <input
                                        type="tel"
                                        value={formData.phone || ''}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Fecha de Nacimiento</label>
                                    <input
                                        type="date"
                                        value={formData.birth_date || ''}
                                        onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Dirección</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={formData.address || ''}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="grow bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none"
                                            placeholder="Ingresa tu dirección para aparecer en el mapa"
                                        />
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                if (!formData.address) {
                                                    setMessage({ type: 'error', text: 'Ingresa una dirección primero.' });
                                                    return;
                                                }
                                                setIsLoading(true);
                                                try {
                                                    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.address)}`);
                                                    const data = await res.json();
                                                    if (data && data.length > 0) {
                                                        const { lat, lon } = data[0];
                                                        setFormData({ ...formData, latitude: parseFloat(lat), longitude: parseFloat(lon) });
                                                        setMessage({ type: 'success', text: 'Ubicación encontrada correctamente.' });
                                                    } else {
                                                        setMessage({ type: 'error', text: 'No se encontraron coordenadas.' });
                                                    }
                                                } catch (e) {
                                                    setMessage({ type: 'error', text: 'Error al buscar ubicación.' });
                                                }
                                                setIsLoading(false);
                                            }}
                                            className="bg-mivn-blue text-white px-6 rounded-2xl hover:scale-105 transition-transform"
                                            title="Buscar coordenadas"
                                        >
                                            <MapPin className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Ministerio Principal</label>
                                    <select
                                        value={formData.ministry}
                                        onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none font-medium"
                                    >
                                        <option value="">Sin Asignar</option>
                                        <option value="Ministerio Juvenil">Ministerio Juvenil</option>
                                        <option value="Alabanza">Alabanza</option>
                                        <option value="Niños">Niños</option>
                                        <option value="Intercesión">Intercesión</option>
                                        <option value="Diaconado">Diaconado</option>
                                        <option value="Evangelismo">Evangelismo</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Latitud</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={formData.latitude || ''}
                                        onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Longitud</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={formData.longitude || ''}
                                        onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2 p-6 bg-mivn-blue/5 rounded-3xl border border-mivn-blue/10 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Compartir en Mapa Comunitario</p>
                                        <p className="text-xs text-slate-500 italic font-light">Muestra tu ubicación general a otros miembros para contactar contigo.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_location_public}
                                            onChange={(e) => setFormData({ ...formData, is_location_public: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-14 h-7 bg-slate-200 dark:bg-white/10 rounded-full peer peer-checked:bg-mivn-blue after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-7 after:transition-all peer-checked:after:translate-x-full" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Ministerial Section */}
                    {activeSection === "spiritual" && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="px-10 py-8 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 flex items-center gap-4">
                                <div className="w-10 h-10 bg-mivn-gold/10 rounded-xl flex items-center justify-center text-mivn-gold">
                                    <Users className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Vida Ministerial</h3>
                            </div>
                            <div className="p-10 md:p-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {[
                                    { label: "Grupo Pequeño", val: profile.small_group || "Sin Asignar", icon: Home },
                                    { label: "Ministerio", val: formData.ministry || "Sin Asignar", icon: Star, featured: true },
                                    { label: "Bautismo", val: profile.baptism_date || "No registrado", icon: Calendar }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-slate-50 dark:bg-white/5 p-8 rounded-3xl border border-slate-100 dark:border-white/10 space-y-3 group/stat hover:border-mivn-blue/30 transition-all">
                                        <div className="flex justify-between items-start">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                            <stat.icon className={`w-4 h-4 ${stat.featured ? "text-mivn-gold" : "text-mivn-blue"}`} />
                                        </div>
                                        <p className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-tight">{stat.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Notifications Section */}
                    {activeSection === "security" && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="px-10 py-8 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 flex items-center gap-4">
                                <div className="w-10 h-10 bg-mivn-blue/10 rounded-xl flex items-center justify-center text-mivn-blue">
                                    <BellRing className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Privacidad y Notificaciones</h3>
                            </div>
                            <div className="p-6 md:p-12 space-y-8 md:space-y-10">
                                {[
                                    { title: "Alertas por Correo", desc: "Recibe noticias sobre sermones y devocionales directamente en tu inbox.", checked: formData.notifications_email },
                                    { title: "Notificaciones Push", desc: "Alertas inmediatas de eventos especiales y peticiones de oración urgentes.", checked: formData.notifications_push }
                                ].map((notif, i) => (
                                    <div key={i} className="flex items-center justify-between gap-8 group/notif">
                                        <div className="space-y-1">
                                            <p className="text-lg font-bold text-slate-800 dark:text-white">{notif.title}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-light italic">{notif.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked={notif.checked} className="sr-only peer" />
                                            <div className="w-16 h-8 bg-slate-200 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-8 after:transition-all dark:border-slate-600 peer-checked:bg-mivn-blue shadow-inner" />
                                        </label>
                                    </div>
                                ))}
                            </div>


                            {/* Password Change Section */}
                            <div className="px-10 py-8 bg-slate-50 dark:bg-white/5 border-y border-slate-100 dark:border-white/5 flex items-center gap-4 mt-8">
                                <div className="w-10 h-10 bg-mivn-gold/10 rounded-xl flex items-center justify-center text-mivn-gold">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Contraseña</h3>
                            </div>
                            <div className="p-6 md:p-12 space-y-6">

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Confirmar Contraseña</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={async (e) => {
                                        const btn = e.currentTarget;
                                        const form = btn.closest('div.p-10.md\\:p-12.space-y-6') as HTMLDivElement;
                                        const newPassInput = form.querySelector('input[name="newPassword"]') as HTMLInputElement;
                                        const confirmPassInput = form.querySelector('input[name="confirmPassword"]') as HTMLInputElement;
                                        const newPass = newPassInput?.value;
                                        const confirmPass = confirmPassInput?.value;

                                        const messageContainer = document.getElementById('pass-message');

                                        if (!newPass) return;
                                        if (newPass !== confirmPass) {
                                            if (messageContainer) {
                                                messageContainer.textContent = "Las contraseñas no coinciden";
                                                messageContainer.className = "text-rose-500 text-xs font-bold uppercase tracking-widest mt-2";
                                            }
                                            return;
                                        }

                                        setIsLoading(true);
                                        const { error } = await supabase.auth.updateUser({ password: newPass });

                                        if (messageContainer) {
                                            if (error) {
                                                messageContainer.textContent = "Error: " + error.message;
                                                messageContainer.className = "text-rose-500 text-xs font-bold uppercase tracking-widest mt-2";
                                            } else {
                                                messageContainer.textContent = "Contraseña actualizada correctamente";
                                                messageContainer.className = "text-emerald-500 text-xs font-bold uppercase tracking-widest mt-2";
                                                newPassInput.value = "";
                                                confirmPassInput.value = "";
                                            }
                                        }
                                        setIsLoading(false);
                                    }}
                                    disabled={isLoading}
                                    className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all w-full md:w-auto mt-4"
                                >
                                    {isLoading ? 'Actualizando...' : 'Cambiar Contraseña'}
                                </button>
                                <div id="pass-message"></div>

                            </div>
                        </div>
                    )}

                    {/* Messages & Actions */}
                    {message && (
                        <div className={`p-8 rounded-3xl text-sm flex items-center gap-4 animate-in slide-in-from-bottom-4 duration-500 ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                            {message.type === 'success' ? <Check className="w-6 h-6" /> : <Info className="w-6 h-6" />}
                            <span className="font-bold uppercase tracking-widest text-[10px]">{message.text}</span>
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-6 pt-10">
                        <button type="button" onClick={() => router.push('/dashboard')} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-mivn-blue transition-colors">Descartar</button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-4 px-12 py-6 bg-mivn-gold text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-mivn-gold/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            Guardar Cambios
                        </button>
                    </div>

                </form>

                {/* Modal de Recorte de Avatar */}
                {imageToCrop && (
                    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border border-white/10">
                            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-mivn-blue/10 rounded-xl text-mivn-blue">
                                        <Scissors className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Recortar Foto</h3>
                                </div>
                                <button onClick={() => setImageToCrop(null)} className="text-slate-400 hover:text-rose-500 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="relative h-[350px] bg-slate-100 dark:bg-black/40">
                                <Cropper
                                    image={imageToCrop}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    cropShape="round"
                                    showGrid={false}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                            </div>

                            <div className="p-8 space-y-6 bg-slate-50 dark:bg-white/5">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400">
                                        <span>Zoom</span>
                                        <span>{Math.round(zoom * 100)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        value={zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        onChange={(e) => setZoom(Number(e.target.value))}
                                        className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-mivn-blue"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-6 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setImageToCrop(null)}
                                        className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        disabled={isLoading}
                                        onClick={confirmCrop}
                                        className="flex items-center gap-3 px-8 py-4 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-[9px] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-mivn-blue/20 disabled:opacity-50"
                                    >
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                        Finalizar Recorte
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </div >
    );
}
