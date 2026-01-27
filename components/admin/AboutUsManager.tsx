"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    Save,
    Loader2,
    Heart,
    Star,
    Users,
    HandHelping,
    Sparkles,
    Upload,
    ImageIcon,
    History
} from "lucide-react";
import Image from "next/image";
import { signCloudinaryParameters, deleteImage } from "@/app/actions/cloudinary";
import { updateAboutUsContent } from "@/app/actions/about-us";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const iconMap: Record<string, any> = {
    Heart,
    Star,
    Users,
    HandHelping,
    Sparkles
};

export default function AboutUsManager() {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        const { data, error } = await supabase
            .from("about_us_content")
            .select("*")
            .single();

        if (data) {
            setContent(data);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        const { error } = await updateAboutUsContent(content);

        if (error) {
            toast.error("Error al guardar: " + error.message);
        } else {
            toast.success("Cambios guardados correctamente");
            router.refresh();
        }
        setSaving(false);
    };

    const handleImageUploadSuccess = async (url: string, publicId: string, field: string) => {
        try {
            // Delete old image if it exists
            const publicIdField = `${field.replace('_url', '')}_public_id`;
            const oldPublicId = content[publicIdField as keyof typeof content];
            if (oldPublicId) {
                await deleteImage(oldPublicId as string);
            }

            setContent({
                ...content,
                [field]: url,
                [publicIdField]: publicId
            });
        } catch (error) {
            console.error("Upload error", error);
            toast.error("Error al subir la imagen");
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin w-10 h-10 text-mivn-blue" /></div>;

    return (
        <div className="space-y-12 pb-20 max-w-5xl mx-auto">
            <div className="flex justify-between items-center bg-white dark:bg-black/20 p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl sticky top-4 z-30 backdrop-blur-md">
                <div>
                    <h2 className="text-2xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">Sobre Nosotros</h2>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Gestión de Contenido</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-mivn-blue text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                    Guardar Cambios
                </button>
            </div>

            {/* Hero Section */}
            <Section title="Sección Hero" icon={<Sparkles className="w-5 h-5" />}>
                <div className="grid gap-6">
                    <Field label="Título (Principal)">
                        <input
                            value={content.hero_title}
                            onChange={e => setContent({ ...content, hero_title: e.target.value })}
                            className="bg-slate-50 dark:bg-black/20 w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 ring-mivn-blue/20"
                        />
                    </Field>
                    <Field label="Subtítulo (Dorado)">
                        <input
                            value={content.hero_subtitle}
                            onChange={e => setContent({ ...content, hero_subtitle: e.target.value })}
                            className="bg-slate-50 dark:bg-black/20 w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 ring-mivn-blue/20 text-mivn-gold font-bold"
                        />
                    </Field>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ImageUploadItem
                            label="Imagen Hero"
                            field="hero_image_url"
                            value={content.hero_image_url}
                            onUpload={(url, publicId) => handleImageUploadSuccess(url, publicId, "hero_image_url")}
                        />
                        <ImageUploadItem
                            label="Imagen Historia"
                            field="history_image_url"
                            value={content.history_image_url}
                            onUpload={(url, publicId) => handleImageUploadSuccess(url, publicId, "history_image_url")}
                        />
                    </div>
                </div>
            </Section>

            {/* History Section */}
            <Section title="Nuestra Historia" icon={<History className="w-5 h-5" />}>
                <div className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Field label="Año/Etiqueta Superior">
                            <input
                                value={content.history_since}
                                onChange={e => setContent({ ...content, history_since: e.target.value })}
                                className="bg-slate-50 dark:bg-black/20 w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 ring-mivn-blue/20"
                            />
                        </Field>
                        <Field label="Título de Historia">
                            <input
                                value={content.history_title}
                                onChange={e => setContent({ ...content, history_title: e.target.value })}
                                className="bg-slate-50 dark:bg-black/20 w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 ring-mivn-blue/20"
                            />
                        </Field>
                    </div>
                    <Field label="Contenido (Usa '||' para separar párrafos)">
                        <textarea
                            rows={6}
                            value={content.history_content}
                            onChange={e => setContent({ ...content, history_content: e.target.value })}
                            className="bg-slate-50 dark:bg-black/20 w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 ring-mivn-blue/20 text-sm leading-relaxed"
                        />
                    </Field>
                </div>
            </Section>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8">
                <Section title="Misión" icon={<Heart className="w-5 h-5 text-rose-500" />}>
                    <div className="space-y-4">
                        <Field label="Título">
                            <input
                                value={content.mission_title}
                                onChange={e => setContent({ ...content, mission_title: e.target.value })}
                                className="bg-slate-50 dark:bg-black/20 w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 ring-mivn-blue/20"
                            />
                        </Field>
                        <Field label="Texto">
                            <textarea
                                rows={4}
                                value={content.mission_content}
                                onChange={e => setContent({ ...content, mission_content: e.target.value })}
                                className="bg-slate-50 dark:bg-black/20 w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 ring-mivn-blue/20 text-sm"
                            />
                        </Field>
                    </div>
                </Section>
                <Section title="Visión" icon={<Star className="w-5 h-5 text-mivn-blue" />}>
                    <div className="space-y-4">
                        <Field label="Título">
                            <input
                                value={content.vision_title}
                                onChange={e => setContent({ ...content, vision_title: e.target.value })}
                                className="bg-slate-50 dark:bg-black/20 w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 ring-mivn-blue/20"
                            />
                        </Field>
                        <Field label="Texto">
                            <textarea
                                rows={4}
                                value={content.vision_content}
                                onChange={e => setContent({ ...content, vision_content: e.target.value })}
                                className="bg-slate-50 dark:bg-black/20 w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 ring-mivn-blue/20 text-sm"
                            />
                        </Field>
                    </div>
                </Section>
            </div>

            {/* Core Values */}
            <Section title="Valores Fundamentales" icon={<Users className="w-5 h-5" />}>
                <div className="grid sm:grid-cols-2 gap-6">
                    {content.values_json?.map((val: any, idx: number) => (
                        <div key={idx} className="p-6 bg-slate-50 dark:bg-black/40 rounded-[2rem] border border-slate-200 dark:border-white/5 space-y-4 relative">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${val.bg} rounded-xl flex items-center justify-center`}>
                                    {iconMap[val.icon] ? (
                                        (() => {
                                            const Icon = iconMap[val.icon];
                                            return <Icon className={`w-6 h-6 ${val.color}`} />;
                                        })()
                                    ) : <Star className="w-6 h-6" />}
                                </div>
                                <input
                                    value={val.label}
                                    onChange={e => {
                                        const newValues = [...content.values_json];
                                        newValues[idx].label = e.target.value;
                                        setContent({ ...content, values_json: newValues });
                                    }}
                                    className="bg-transparent border-none font-bold outline-none focus:text-mivn-blue"
                                    placeholder="Nombre del Valor"
                                />
                            </div>
                            <textarea
                                value={val.desc}
                                onChange={e => {
                                    const newValues = [...content.values_json];
                                    newValues[idx].desc = e.target.value;
                                    setContent({ ...content, values_json: newValues });
                                }}
                                className="bg-transparent w-full resize-none border-none text-xs italic outline-none text-slate-500 dark:text-gray-400"
                                placeholder="Descripción corta..."
                                rows={2}
                            />
                        </div>
                    ))}
                </div>
            </Section>

            {/* CTA */}
            <Section title="Llamado a la Acción (CTA)" icon={<ArrowRight className="w-5 h-5" />}>
                <div className="grid gap-6">
                    <Field label="Título CTA">
                        <input
                            value={content.cta_title}
                            onChange={e => setContent({ ...content, cta_title: e.target.value })}
                            className="bg-slate-50 dark:bg-black/20 w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 ring-mivn-blue/20"
                        />
                    </Field>
                    <Field label="Descripción CTA">
                        <textarea
                            value={content.cta_description}
                            onChange={e => setContent({ ...content, cta_description: e.target.value })}
                            className="bg-slate-50 dark:bg-black/20 w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none focus:ring-2 ring-mivn-blue/20 text-sm"
                        />
                    </Field>
                </div>
            </Section>
        </div>
    );
}

interface SectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const Section = ({ title, icon, children }: SectionProps) => (
    <div className="bg-white dark:bg-white/5 rounded-[3rem] p-10 border border-slate-200 dark:border-white/10 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center gap-4 text-mivn-blue">
            <div className="w-10 h-10 bg-mivn-blue/10 rounded-xl flex items-center justify-center">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">{title}</h3>
        </div>
        {children}
    </div>
);

interface FieldProps {
    label: string;
    children: React.ReactNode;
}

const Field = ({ label, children }: FieldProps) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 pl-2">{label}</label>
        {children}
    </div>
);

const ImageUploadItem = ({ label, field, value, onUpload }: { label: string, field: string, value: string, onUpload: (url: string, publicId: string) => void }) => (
    <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">{label}</label>
        <ImageUploader
            currentImage={value}
            onUploadComplete={onUpload}
            folder="about-us"
            aspectRatio={field === 'hero_image_url' ? 16 / 9 : 4 / 3}
        />
    </div>
);

const ArrowRight = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
);
