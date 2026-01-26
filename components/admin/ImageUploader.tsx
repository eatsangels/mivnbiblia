"use client";

import { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploaderProps {
    onUploadComplete: (url: string) => void;
    currentImage?: string;
    bucket?: string;
    folder?: string;
}

export function ImageUploader({
    onUploadComplete,
    currentImage,
    bucket = "public",
    folder = "uploads"
}: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const processFile = async (file: File) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Por favor selecciona una imagen válida');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('La imagen no puede ser mayor a 5MB');
            return;
        }

        setError(null);
        setUploading(true);

        try {
            const supabase = createClient();

            // Generate unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

            // Upload to Supabase Storage
            const { data, error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(fileName);

            setPreview(publicUrl);
            onUploadComplete(publicUrl);
        } catch (err: any) {
            console.error('Error uploading image:', err);
            setError(err.message || 'Error al subir la imagen');
        } finally {
            setUploading(false);
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
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) await processFile(file);
    };

    const removeImage = () => {
        setPreview(null);
        onUploadComplete('');
    };

    return (
        <div className="space-y-4">
            {preview ? (
                <div className="relative group rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-white/5 shadow-xl">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            type="button"
                            onClick={removeImage}
                            className="bg-white/20 backdrop-blur-md text-white p-3 rounded-xl hover:bg-red-500 transition-colors flex items-center gap-2 font-black uppercase tracking-widest text-[10px]"
                        >
                            <X className="w-4 h-4" /> Eliminar Imagen
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all duration-300 ${isDragging
                        ? "border-mivn-blue bg-mivn-blue/5 scale-[0.98] shadow-inner"
                        : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] hover:border-mivn-blue/50"
                        }`}
                >
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                        <div className="flex flex-col items-center justify-center pt-4 pb-4 px-8 text-center">
                            {uploading ? (
                                <div className="space-y-4">
                                    <div className="size-12 border-4 border-slate-100 border-t-mivn-blue rounded-full animate-spin mx-auto"></div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subiendo imagen...</p>
                                </div>
                            ) : (
                                <>
                                    <div className={`size-16 rounded-3xl flex items-center justify-center mb-4 transition-transform duration-300 ${isDragging ? 'bg-mivn-blue text-white scale-110 rotate-12' : 'bg-white dark:bg-white/5 text-slate-400 group-hover:scale-110'}`}>
                                        <Upload className="w-8 h-8" />
                                    </div>
                                    <p className="mb-1 text-sm text-slate-900 dark:text-white font-bold">
                                        {isDragging ? '¡Suéltala ahora!' : 'Arrastra y suelta tu imagen'}
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                        o haz clic para buscar (Máx 5MB)
                                    </p>
                                </>
                            )}
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                    </label>
                </div>
            )}

            {error && (
                <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 p-3 rounded-xl flex items-center gap-2 text-rose-500 animate-in fade-in slide-in-from-top-2 duration-300">
                    <X className="w-4 h-4 shrink-0" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">{error}</p>
                </div>
            )}
        </div>
    );
}
