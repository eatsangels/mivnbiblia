"use client";

import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Loader2, Check } from "lucide-react";
import Image from "next/image";
import { uploadLogo } from "@/app/(estudio)/admin/gestion-web/actions";
import { toast } from "sonner";

interface LogoUploaderProps {
    label: string;
    currentUrl: string;
    type: 'main' | 'footer';
    onUploadComplete: (url: string) => void;
}

export function LogoUploader({ label, currentUrl, type, onUploadComplete }: LogoUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(currentUrl);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Por favor selecciona una imagen válida');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error('La imagen no debe superar 2MB');
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const result = await uploadLogo(formData, type);

            if (result.success) {
                toast.success('Logo actualizado correctamente');
                onUploadComplete(result.url);
                setPreviewUrl(result.url);
            }
        } catch (error) {
            console.error('Error uploading logo:', error);
            toast.error('Error al subir el logo');
            setPreviewUrl(currentUrl); // Revert preview
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                {label}
            </label>

            {/* Preview */}
            <div className="relative w-full aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center group">
                {previewUrl ? (
                    <div className="relative w-full h-full p-8">
                        <Image
                            src={previewUrl}
                            alt="Logo preview"
                            fill
                            className="object-contain"
                        />
                    </div>
                ) : (
                    <div className="text-center text-slate-400">
                        <ImageIcon className="w-16 h-16 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No hay logo configurado</p>
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Subiendo...
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4" />
                                Cambiar Logo
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Upload button (visible when no preview) */}
            {!previewUrl && (
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full px-6 py-4 bg-mivn-blue text-white rounded-xl font-bold hover:bg-sky-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {uploading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Subiendo...
                        </>
                    ) : (
                        <>
                            <Upload className="w-5 h-5" />
                            Subir Logo
                        </>
                    )}
                </button>
            )}

            <p className="text-xs text-slate-500 dark:text-slate-400">
                Formatos: PNG, JPG, SVG. Tamaño máximo: 2MB. Recomendado: fondo transparente.
            </p>
        </div>
    );
}
