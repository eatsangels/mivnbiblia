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
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const processFile = async (file: File) => {
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
            setIsDragging(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) await processFile(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) await processFile(file);
        else setIsDragging(false);
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                {label}
            </label>

            {/* Preview & Drop Area */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative w-full aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border-2 border-dashed transition-all duration-300 flex items-center justify-center group ${isDragging
                    ? 'border-mivn-blue bg-mivn-blue/5 scale-[0.99]'
                    : 'border-slate-300 dark:border-slate-600'
                    }`}
            >
                {previewUrl ? (
                    <div className="relative w-full h-full p-8">
                        <Image
                            src={previewUrl}
                            alt="Logo preview"
                            fill
                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                ) : (
                    <div className="text-center text-slate-400">
                        {uploading ? (
                            <Loader2 className="w-16 h-16 mx-auto mb-2 animate-spin text-mivn-blue" />
                        ) : (
                            <ImageIcon className={`w-16 h-16 mx-auto mb-2 transition-all ${isDragging ? 'text-mivn-blue scale-110' : 'opacity-50'}`} />
                        )}
                        <p className="text-sm font-bold">{isDragging ? '¡Suéltalo aquí!' : 'No hay logo configurado'}</p>
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 shadow-xl"
                    >
                        {uploading ? (
                            <Loader2 className="w-4 h-4 animate-spin text-mivn-blue" />
                        ) : (
                            <Upload className="w-4 h-4" />
                        )}
                        {previewUrl ? 'Cambiar Logo' : 'Subir Logo'}
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

            <p className="text-xs text-slate-500 dark:text-slate-400 text-center italic">
                {isDragging ? '¡Listo para subir!' : 'Arrastra y suelta o usa el botón. PNG, JPG, SVG hasta 2MB.'}
            </p>
        </div>
    );
}
